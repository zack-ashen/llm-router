"use server";

import apiKeyService from "@/services/apiKey.service";

export async function getApiKeys(routerId: string) {
  const keys = await apiKeyService.getAll(routerId);

  return keys;
}
