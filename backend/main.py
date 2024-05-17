import os

from dotenv import load_dotenv
from fastapi import FastAPI, Response, status
from openai import OpenAI
from pydantic import BaseModel
from services.router import ModelRouter, TextComplexityAnalyzer

load_dotenv()


app = FastAPI()


class Prompt(BaseModel):
    prompt: str


@app.post("/")
def prompt(prompt: Prompt):
    client = OpenAI(
        api_key=os.getenv("OPENAI_API_KEY")
    )

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": prompt.prompt}
        ]
    )

    tokens_used = response.usage.total_tokens

    cost_per_token = 30 / 1000
    cost = tokens_used * cost_per_token

    router = ModelRouter()
    result = router.generate_response(prompt.prompt)

    return {
        "gpt4": {
            "response": response.choices[0].message.content,
            "cost": cost
        },
        "router": {
            "response": result[0],
            "cost": 0,
            "model": result[1]
        }
    }
