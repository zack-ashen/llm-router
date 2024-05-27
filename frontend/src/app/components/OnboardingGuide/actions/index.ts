"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function onboardingGuide() {
  const { userId } = auth();
  if (!userId) return null;
  const _ = await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      onboarded: true,
      onboardingGuide: true,
    },
  });
}
