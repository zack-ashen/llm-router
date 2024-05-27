import db from "@/db";
import { users } from "@/db/schema";
import { NewUser, User } from "@/types";
import { auth, clerkClient } from "@clerk/nextjs/server";
import paymentsService from "./payments.service";

const userService = {
  async getUid(): Promise<string> {
    const { userId } = await auth();
    if (!userId) throw new Error("Not logged in");
    const {
      privateMetadata: { uid },
    } = await clerkClient.users.getUser(userId);

    return uid as string;
  },

  async get(uid: string): Promise<User> {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, uid),
    });
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },

  async create(user: NewUser): Promise<User> {
    const stripeId = await paymentsService.createCustomer(user.email);

    const [createdUser] = await db
      .insert(users)
      .values({
        cuid: user.cuid,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        stripeId: stripeId,
      })
      .returning();

    return createdUser;
  },
};

export default userService;
