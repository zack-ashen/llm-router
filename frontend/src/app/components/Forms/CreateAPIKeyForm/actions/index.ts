"use server";

import apiKeyService from "@/services/apiKey.service";

export async function createAPIKey({
  apiKeyName,
  routerId,
}: {
  apiKeyName: string;
  routerId: string;
}) {
  const _ = await apiKeyService.create({
    name: apiKeyName,
    router: routerId,
  });
}
