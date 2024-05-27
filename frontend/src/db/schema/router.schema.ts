import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from ".";

export const routerType = pgEnum("router_type", [
  "semantic",
  "diagnostic",
  "performance",
]);

export const routers = pgTable("routers", {
  id: uuid("id").primaryKey().defaultRandom(),
  user: uuid("user")
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 255 }).notNull(),
  type: routerType("type").notNull(),
  models: varchar("models", { length: 255 }).notNull().default(""),
});

export const routerRelations = relations(routers, ({ one }) => ({
  user: one(users, { fields: [routers.user], references: [users.id] }),
}));

export type InsertRouter = InferInsertModel<typeof routers>;
export type SelectRouter = InferSelectModel<typeof routers>;
