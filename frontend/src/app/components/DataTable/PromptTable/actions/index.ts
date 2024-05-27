"use server";

import routerService from "@/services/router.service";

export async function getPrompts(routerId: string) {
  const prompts = await routerService.getPrompts(routerId);

  return prompts;
}
