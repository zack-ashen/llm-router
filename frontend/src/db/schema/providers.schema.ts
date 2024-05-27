import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { routers } from ".";

const routerType = pgEnum("router_type", [
  "semantic",
  "diagnostic",
  "performance",
]);

export const providers = pgTable("providers", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: routerType("type").notNull(),
  router: uuid("router")
    .notNull()
    .references(() => routers.id),
  apiKey: varchar("api_key", { length: 64 }).notNull(),
  models: varchar("models", { length: 255 }).notNull().default(""),
});

export const providersRelations = relations(providers, ({ one }) => ({
  router: one(routers, {
    fields: [providers.router],
    references: [routers.id],
  }),
}));

export type ProviderInsert = InferInsertModel<typeof providers>;
export type ProviderSelect = InferSelectModel<typeof providers>;
