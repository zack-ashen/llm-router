import db from "@/db";
import { apiKeys } from "@/db/schema";
import { NewApiKey } from "@/types/apiKey.types";
import crypto from "crypto";

const apiKeyService = {
  create: async (apiKey: NewApiKey) => {
    const key = `sk-${crypto.randomBytes(31).toString("hex").substring(0, 61)}`;

    const newApiKey = await db
      .insert(apiKeys)
      .values({
        ...apiKey,
        key,
      })
      .returning();

    return newApiKey[0];
  },

  getAll: async (routerId: string) => {
    const routerApiKeys = await db.query.apiKeys.findMany({
      where: (apiKeys, { eq }) => eq(apiKeys.router, routerId),
    });
    return routerApiKeys;
  },
};

export default apiKeyService;
