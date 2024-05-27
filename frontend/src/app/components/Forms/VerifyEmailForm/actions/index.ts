"use server";

import userService from "@/services/user.service";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function onboard() {
  try {
    const { userId } = auth();
    if (!userId) return null;
    const { firstName, lastName, emailAddresses } =
      await clerkClient.users.getUser(userId);

    const user = await userService.create({
      firstName: firstName || "",
      lastName: lastName || "",
      email: emailAddresses[0].emailAddress,
      cuid: userId,
    });

    const _ = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        onboarded: true,
      },
      privateMetadata: {
        uid: user.id,
      },
    });

    return user.id;
  } catch (err) {
    console.error(err);
  }
}
