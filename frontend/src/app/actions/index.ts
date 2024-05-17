"use server";

export type Chat = {
  prompt: string;
  response: string;
  model?: string;
};

export type DualResponse = {
  router: Chat;
  gpt4: Chat;
};

export async function promptHandler(prompt: string) {
  const response = await fetch("http://localhost:8000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();

  console.log(data.gpt4.cost);

  const result = {
    router: {
      prompt,
      response: data.router.response,
      model: data.router.model,
    },
    gpt4: {
      prompt,
      response: data.gpt4.response,
    },
  };

  return result;
}
