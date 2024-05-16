from fastapi import FastAPI, Response, status
from pydantic import BaseModel
from services.router import Router

app = FastAPI()

router = Router("This is a simple prompt.")
complexity_estimate = router.generate_response()
print(f"Estimated Complexity: {complexity_estimate}")


class Prompt(BaseModel):
    prompt: str


@app.post("/")
def prompt(prompt: Prompt):

    return {"status": "ok"}
