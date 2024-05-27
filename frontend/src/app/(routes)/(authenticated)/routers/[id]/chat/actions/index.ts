"use server";

import apiKeyService from "@/services/apiKey.service";

interface QueryResponse {
  message: string;
  model: string;
  latency: number;
  id: string;
}

async function sendQuery(
  prompt: string,
  routerId: string
): Promise<QueryResponse> {
  const defaultApiKey = await apiKeyService.getAll(routerId);

  if (!defaultApiKey) {
    throw new Error("No API key found");
  }

  const key = defaultApiKey[0].key;

  const response = await fetch(
    `${process.env.API_URL}/routers/${routerId}/inference/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        query: prompt,
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  return {
    message: data.response,
    model: data.model,
    latency: data.latency,
    id: data.id,
  };
}

export { sendQuery };
