"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUid(): Promise<string> {
  const { userId } = await auth();

  if (!userId) throw new Error("Not logged in");
  const {
    privateMetadata: { uid },
  } = await clerkClient.users.getUser(userId);

  return uid as string;
}
