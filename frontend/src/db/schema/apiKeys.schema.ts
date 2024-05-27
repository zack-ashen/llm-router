import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { date, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { routers } from ".";

export const apiKeys = pgTable("api_keys", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: varchar("key", { length: 64 }).notNull(),
  router: uuid("router")
    .notNull()
    .references(() => routers.id),
  createdAt: date("created_at").notNull().defaultNow(),
  lastUsedAt: date("last_used_at").notNull().defaultNow(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const apiKeysRelations = relations(apiKeys, ({ one }) => ({
  router: one(routers, { fields: [apiKeys.router], references: [routers.id] }),
}));

export type ApiKeysInsert = InferInsertModel<typeof apiKeys>;
export type ApiKeysSelect = InferSelectModel<typeof apiKeys>;
