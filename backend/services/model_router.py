import os

import anthropic
import cohere
import requests
from dotenv import load_dotenv
from groq import Groq
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from openai import OpenAI

load_dotenv()

MODEL_PRICES = {
    "gpt-3.5-turbo-0125": {
        "input": 0.5,
        "output": 1.5
    },
    "gpt-4-turbo-2024-04-09": {
        "input": 10,
        "output": 30
    },
    "llama-3-70b-instruct": {
        "input": 0.9,
        "output": 1
    },
    "mistral-large": {
        "input": 4, "output": 12,
    },
    "mistral-medium": {
        "input": 2.7, "output": 8.1,
    },
    "mistral-small": {
        "input": 1,
        "output": 3
    },
    "mixtral-8x7b-instruct": {
        "input": 0.7,
        "output": 0.7
    },
    "dbrx-instruct": {"input": 0.02, "output": 0.02},
    "command-r": {"input": 0.5, "output": 1.5},
    "command-r-plus": {"input": 3, "output": 15},
    "claude-3-haiku-20240307": {"input": 0.25, "output": 1.25},
    "claude-3-opus-20240229": {"input": 15, "output": 75},
    "claude-3-sonnet-20240229": {"input": 3, "output": 15}
}


class ModelRouter:
    def __init__(self, prompt):
        self.prompt = prompt

    def assess_complexity(self):
        """Assess the complexity of the prompt. This function can be improved with more sophisticated measures."""
        response = requests.post(
            "http://localhost:8888/",
            headers={"Content-Type": "application/json"},
            json={
                'query': self.prompt,
            }
        )
        data = response.json()
        scores = data["scores"]
        return scores

    def find_best_model(self, prompt, model_prices, model_scores):
        models = []
        for model_name, prices in model_prices.items():
            cost = prices['input'] + prices['output']
            # Default score is 0 if not found
            score = model_scores.get(model_name, 0)
            models.append({
                'name': model_name,
                'cost': cost,
                'score': score
            })

        # Find Pareto efficient models
        pareto_efficient = self.find_pareto_efficient_models(models)

        # Optionally, select the best from the Pareto efficient set
        # Highest score among Pareto efficient
        best_model = max(pareto_efficient, key=lambda m: m['score'])
        return best_model['name']

    def is_dominated(self, candidate, models):
        """Check if there's any model that dominates the candidate."""
        for model in models:
            if model['score'] >= candidate['score'] and model['cost'] <= candidate['cost']:
                if model['score'] > candidate['score'] or model['cost'] < candidate['cost']:
                    return True
        return False

    def find_pareto_efficient_models(self, models):
        pareto_efficient = []
        for candidate in models:
            if not self.is_dominated(candidate, models):
                pareto_efficient.append(candidate)

        return pareto_efficient

    def select_model(self, scores):
        model_scores = {}
        # Iterate through the input data
        for item in scores:
            target = item["target"]
            score = item["score"]
            model_scores[target] = score

        model = self.find_best_model(self.prompt, MODEL_PRICES, model_scores)
        return model

    def generate_response(self, model):
        """Generate a response based on the complexity of the prompt."""
        reply = ""

        input_tokens = 0
        output_tokens = 0

        models = list(MODEL_PRICES.keys())
        model = models[10]
        if model == "llama-3-70b-instruct":
            client = Groq(api_key=os.getenv('GROQ_API_KEY'))
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": self.prompt,
                    }
                ],
                model="llama3-70b-8192",
            )

            total_tokens = chat_completion.usage.total_tokens
            input_tokens = chat_completion.usage.prompt_tokens
            output_tokens = chat_completion.usage.completion_tokens

            reply = chat_completion.choices[0].message.content
        elif model[0:7] == "mistral" or model == "mixtral-8x7b-instruct":
            client = MistralClient(api_key=os.getenv('MISTRAL_API_KEY'))

            if model[0:3] != "mix":
                new_model = model + "-latest"
            else:
                new_model = "open-mixtral-8x7b"
            chat_response = client.chat(
                model=new_model,
                messages=[ChatMessage(role="user", content=self.prompt)]
            )

            total_tokens = chat_response.usage.total_tokens
            input_tokens = chat_response.usage.prompt_tokens
            output_tokens = chat_response.usage.completion_tokens

            reply = chat_response.choices[0].message.content
        elif model == "dbrx-instruct":
            client = OpenAI(
                api_key=os.getenv("OPENAI_API_KEY")
            )

            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "user", "content": self.prompt}
                ]
            )

            total_tokens = response.usage.total_tokens
            input_tokens = response.usage.prompt_tokens
            output_tokens = response.usage.completion_tokens

            reply = response.choices[0].message.content
        elif model[0:6] == "claude":
            client = anthropic.Anthropic(
                # defaults to os.environ.get("ANTHROPIC_API_KEY")
                api_key=os.environ.get("ANTHROPIC_API_KEY"),
            )
            message = client.messages.create(
                model=model,
                max_tokens=1024,
                messages=[
                    {"role": "user", "content": self.prompt}
                ]
            )

            total_tokens = message.usage.input_tokens + \
                message.usage.output_tokens
            input_tokens = message.usage.input_tokens
            output_tokens = message.usage.output_tokens

            reply = message.content[0].text
        elif model[0:7] == "command":
            co = cohere.Client(
                api_key=os.getenv('COHERE_API_KEY'),
            )

            chat = co.chat(
                message=self.prompt,
                model=model
            )

            total_tokens = chat.meta.billed_units.input_tokens + \
                chat.meta.billed_units.output_tokens

            input_tokens = chat.meta.billed_units.input_tokens
            output_tokens = chat.meta.billed_units.output_tokens

            reply = chat.text

        elif model[0:3] == "gpt":
            client = OpenAI(
                api_key=os.getenv("OPENAI_API_KEY")
            )

            response = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "user", "content": self.prompt}
                ]
            )

            total_tokens = response.usage.total_tokens
            input_tokens = response.usage.prompt_tokens
            output_tokens = response.usage.completion_tokens

            reply = response.choices[0].message.content

        cost = MODEL_PRICES[model]['input'] * input_tokens + \
            MODEL_PRICES[model]['output'] * output_tokens

        return {"response": reply, "model": model, "cost": cost, "input_tokens": input_tokens, "output_tokens": output_tokens}
