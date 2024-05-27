import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { routers } from ".";

export const prompts = pgTable("prompts", {
  id: uuid("id").primaryKey().defaultRandom(),
  router: uuid("router")
    .notNull()
    .references(() => routers.id),
  prompt: text("prompt").notNull(),
  response: text("response").notNull(),
  model: varchar("model", { length: 64 }).notNull(),
  latency: numeric("latency", { precision: 100 }).notNull(),
  candidates: jsonb("candidates").notNull(),
  input_tokens: integer("input_tokens").notNull(),
  output_tokens: integer("output_tokens").notNull(),
  cost: numeric("cost", { precision: 100 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const promptRelations = relations(prompts, ({ one }) => ({
  router: one(routers, { fields: [prompts.router], references: [routers.id] }),
}));

export type PromptInsert = InferInsertModel<typeof prompts>;
export type PromptSelect = InferSelectModel<typeof prompts>;
