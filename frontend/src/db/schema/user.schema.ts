import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { routers } from "./router.schema";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  cuid: varchar("cuid", { length: 55 }).notNull(),
  firstName: varchar("first_name", { length: 60 }).notNull(),
  lastName: varchar("last_name", { length: 60 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  stripeId: varchar("stripe_id", { length: 60 }).notNull(),
  credits: numeric("credits", { precision: 100 }).notNull().default("0.0"),
});

export const userRelations = relations(users, ({ many }) => ({
  prompts: many(routers),
}));

export type InsertUser = InferInsertModel<typeof users>;
export type SelectUser = InferSelectModel<typeof users>;
