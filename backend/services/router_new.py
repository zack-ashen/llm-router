import os

import numpy as np
import torch
from dotenv import load_dotenv
from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from transformers import (AutoModelForCausalLM, AutoTokenizer, DistilBertModel,
                          DistilBertTokenizer)
import re

load_dotenv()


class Router:
    def __init__(self, prompt: str):
        self.prompt = prompt
        self.small_model_name = 'distilbert-base-uncased'
        self.models = ['mistral-large-latest',
                       'mistral-medium-latest', 'mistral-small-latest']
        self.hf_token = os.getenv('HF_TOKEN')



    def estimate_complexity(self):
        # Load pre-trained model and tokenizer
        # model = DistilBertModel.from_pretrained(
        #     self.small_model_name, token=self.hf_token)
        # tokenizer = DistilBertTokenizer.from_pretrained(
        #     self.small_model_name, token=self.hf_token)

        tokenizer = AutoTokenizer.from_pretrained(self.models[0])  
        tokens = tokenizer.tokenize(self.prompt)
        token_count = len(tokens)     
        # Tokenize input text
        inputs = tokenizer(self.prompt, return_tensors='pt')

        # Generate embeddings
        small_threshold = 20
        medium_threshold = 50
        if token_count <= small_threshold:
            model = self.model[0]
        elif token_count <= medium_threshold:
            model = self.model[1]
        else:
            model = self.model[2]   
        return model
        # with torch.no_grad():
        #     outputs = model(**inputs)
        #     embeddings = outputs.last_hidden_state.squeeze(
        #         0)  # (sequence_length, hidden_size)

        # Average the embeddings to get a fixed-size vector
        # mean_embedding = embeddings.mean(dim=0).numpy()

        # # Define features
        # embedding_mean = np.mean(mean_embedding)
        # embedding_std = np.std(mean_embedding)

        # # Example thresholds for heuristic rules (tune as needed)
        # mean_threshold = 0.08
        # std_threshold = 0.08

        # if embedding_std > std_threshold and embedding_mean > mean_threshold:
        #     return 'High Complexity'
        # elif embedding_std > std_threshold:
        #     return 'Medium Complexity'
        # else:
            # return 'Low Complexity'

    def generate_response(self):
        model = self.estimate_complexity()

        client = MistralClient(api_key=os.getenv('MISTRAL_API_KEY'))

        response = client.chat(
            model=model,
            messages=[ChatMessage(role="user", content=self.prompt)]
        )

        return [response.choices[0].message.content, model]
