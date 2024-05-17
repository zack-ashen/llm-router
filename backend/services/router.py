import os

import nltk
import spacy
from dotenv import load_dotenv
from nltk.tokenize import word_tokenize
from openai import OpenAI
from textstat import textstat

load_dotenv()


class ModelRouter:
    def __init__(self):
        self.headers = {"Accept": "application/json", "Content-Type": "application/json",
                        "Authorization": f"Bearer {os.getenv('HF_TOKEN')}"}
        self.models = [
            ['microsoft/Phi-3-mini-4k-instruct',
                'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-70B-Instruct/v1/'],  # phi 3
            ['mistralai/Mixtral-8x7B-Instruct-v0.1',
                'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-70B-Instruct/v1/'],  # mistral 7b
            ['meta-llama/Meta-Llama-3-8B-Instruct',
                'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-70B-Instruct/v1/'],  # 8b llama
            ['meta-llama/Meta-Llama-3-70B-Instruct',
                'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-70B-Instruct/v1/']
        ]

    def assess_complexity(self, prompt):
        """Assess the complexity of the prompt. This function can be improved with more sophisticated measures."""
        words = len(prompt.split())
        # Simple complexity measure based on word count
        if words < 5:
            return 0
        elif words < 15:
            return 1
        elif words < 25:
            return 2
        else:
            return 3
        # analyzer = TextComplexityAnalyzer()
        # complexity_metrics = analyzer.analyze_text(prompt)
        # overall_score = analyzer.compute_complexity_score(complexity_metrics)
        # print(f"Overall score: {overall_score}, metrics: {complexity_metrics}")
        # index = int(overall_score * len(self.models))
        # return index if index < len(self.models) else len(self.models) - 1

    def generate_response(self, prompt):
        """Generate a response based on the complexity of the prompt."""
        complexity_level = self.assess_complexity(prompt)

        client = OpenAI(
            base_url=self.models[complexity_level][1],
            api_key=os.getenv('HF_TOKEN')
        )

        response = client.chat.completions.create(
            model="tgi",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=256
        )

        return [response.choices[0].message.content, self.models[complexity_level][0]]


class TextComplexityAnalyzer:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")

    def syllable_count(self, word):
        return textstat.syllable_count(word)

    def syllable_count(self, word):
        return textstat.syllable_count(word)

    def normalize_metric(self, value, min_val, max_val):
        # Normalize the metric to a 0-1 scale
        return (value - min_val) / (max_val - min_val) if max_val > min_val else 0

    def compute_complexity_score(self, metrics):
        # Define the range for normalization based on typical values or empirical data
        ranges = {
            "Num Words": (0, 1000),
            "Num Sentences": (0, 50),
            "Num Nouns": (0, 300),
            "Num Verbs": (0, 200),
            "Num Adjectives": (0, 100),
            "Noun-Verb Ratio": (0, 3),
            "Num Named Entities": (0, 50),
            "Avg Sentence Length": (0, 50),
            "Num Complex Dependencies": (0, 100),
            # Higher is easier, so inverse for complexity
            "Flesch Reading Ease": (0, 100),
            "SMOG Index": (0, 20),
            "Lexical Diversity": (0, 1)
        }

        # Weights can be adjusted based on perceived importance
        weights = {
            "Num Words": 0.1,
            "Num Sentences": 0.1,
            "Num Nouns": 0.1,
            "Num Verbs": 0.1,
            "Num Adjectives": 0.05,
            "Noun-Verb Ratio": 0.05,
            "Num Named Entities": 0.1,
            "Avg Sentence Length": 0.1,
            "Num Complex Dependencies": 0.1,
            "Flesch Reading Ease": 0.1,  # Inverse this metric since higher means less complex
            "SMOG Index": 0.15,
            "Lexical Diversity": 0.2
        }

        # Compute the weighted sum of normalized metrics
        score = 0
        for key, value in metrics.items():
            normalized = self.normalize_metric(value, *ranges[key])
            if key == "Flesch Reading Ease":  # Inverting Flesch Reading Ease
                normalized = 1 - normalized
            score += weights[key] * normalized

        return score

    def analyze_text(self, text):
        # Tokenize text and analyze
        tokens = word_tokenize(text)
        num_words = len(tokens)
        num_sentences = len(nltk.sent_tokenize(text))
        pos_tags = nltk.pos_tag(tokens)

        # Syntactic complexity metrics
        num_nouns = len(
            [word for word, pos in pos_tags if pos.startswith('NN')])
        num_verbs = len(
            [word for word, pos in pos_tags if pos.startswith('VB')])
        num_adjectives = len(
            [word for word, pos in pos_tags if pos.startswith('JJ')])
        noun_verb_ratio = num_nouns / num_verbs if num_verbs > 0 else 0

        # Spacy for Dependency parsing and Named Entity Recognition
        doc = self.nlp(text)
        num_entities = len(doc.ents)
        avg_sentence_length = num_words / num_sentences if num_sentences > 0 else 0
        num_complex_deps = sum(
            1 for token in doc if token.dep_ in ['xcomp', 'ccomp'])

        # Readability and vocabulary richness
        flesch_reading_ease = textstat.flesch_reading_ease(text)
        smog_index = textstat.smog_index(text)
        lex_diversity = len(set(tokens)) / num_words if num_words > 0 else 0

        # Compile metrics
        metrics = {
            "Num Words": num_words,
            "Num Sentences": num_sentences,
            "Num Nouns": num_nouns,
            "Num Verbs": num_verbs,
            "Num Adjectives": num_adjectives,
            "Noun-Verb Ratio": noun_verb_ratio,
            "Num Named Entities": num_entities,
            "Avg Sentence Length": avg_sentence_length,
            "Num Complex Dependencies": num_complex_deps,
            "Flesch Reading Ease": flesch_reading_ease,
            "SMOG Index": smog_index,
            "Lexical Diversity": lex_diversity
        }
        return metrics
