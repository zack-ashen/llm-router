import { InsertUser, SelectUser } from "@/db/schema";

export type User = SelectUser;

export type NewUser = Omit<InsertUser, "stripeId">;
