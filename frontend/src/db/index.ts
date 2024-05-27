import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import {
  apiKeys,
  apiKeysRelations,
  promptRelations,
  prompts,
  providers,
  providersRelations,
  routerRelations,
  routers,
  userRelations,
  users,
} from "./schema";

const pool = new Pool({ connectionString: process.env.DB_URL });

const db = drizzle(pool, {
  schema: {
    users,
    userRelations,
    prompts,
    promptRelations,
    routers,
    routerRelations,
    apiKeys,
    apiKeysRelations,
    providers,
    providersRelations,
  },
});

export default db;
