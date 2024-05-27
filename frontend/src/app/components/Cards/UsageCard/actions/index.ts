"use server";

import routerService from "@/services/router.service";

export async function getUsageData(routerId: string) {
  const usageData = await routerService.getUsageData(routerId);

  return usageData;
}
