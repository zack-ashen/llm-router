import json
import time

from db import database
from fastapi import APIRouter, Depends, HTTPException
from middleware.auth import JWTBearer
from pydantic import BaseModel
from services.model_router import ModelRouter
from sqlalchemy import text
from sqlalchemy.orm import Session

router = APIRouter()
jwt_bearer = JWTBearer()


class Inference(BaseModel):
    query: str


@router.post("/{router_id}/inference")
def prompt(router_id: str, inference: Inference, token: str = Depends(jwt_bearer), db: Session = Depends(database.get_db)):
    api_key = db.execute(text(
        "SELECT * FROM api_keys WHERE key = :jwt_token"), {"jwt_token": token}).fetchone()

    if str(api_key[2]) != router_id:
        raise HTTPException(
            status_code=403, detail="API key not authorized to access this router.")

    start_time = time.time()
    router = ModelRouter(inference.query)
    complexity = router.assess_complexity()
    model = router.select_model(complexity)
    response = router.generate_response(model)
    end_time = time.time()
    latency = end_time - start_time

    res = db.execute(text(
        "INSERT INTO prompts (router, prompt, response, model, latency, candidates, input_tokens, output_tokens, cost) VALUES (:router, :prompt, :response, :model, :latency, :candidates, :input_tokens, :output_tokens, :cost) RETURNING id"), {
            "router": router_id,
            "prompt": inference.query,
            "response": response["response"],
            "model": model,
            "latency": latency,
            "candidates": json.dumps(complexity),
            "input_tokens": response["input_tokens"],
            "output_tokens": response["output_tokens"],
            "cost": response["cost"]
    }).fetchone()

    db.commit()

    return {"response": response["response"], "model": model, "latency": latency, "scores": complexity, "input_tokens": response["input_tokens"], "output_tokens": response["output_tokens"], "cost": response["cost"], "id": str(res[0])}


# @router.post("/api/v1/routers/{router_id}/comparison")
# def comparison(inference: Inference):
#     response = requests.post(
#         "http://localhost:8888/",
#         headers={"Content-Type": "application/json"},
#         json={
#             'query': inference.query,
#         }
#     )
#     data = response.json()
#     scores = data["scores"]
#     sorted_scores = sorted(scores, key=lambda x: x["score"], reverse=True)

#     return sorted_scores
