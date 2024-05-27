import { ApiKeysInsert, ApiKeysSelect } from "@/db/schema/apiKeys.schema";

export type ApiKey = ApiKeysSelect;

export type NewApiKey = Omit<ApiKeysInsert, "key">;
