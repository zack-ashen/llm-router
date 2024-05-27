"use server";

import routerService from "@/services/router.service";

export async function getMetrics(routerId: string) {
  const prompts = await routerService.getPrompts(routerId);
  const averageLatency = await routerService.getAverageLatency(routerId);
  const averageCost = await routerService.getAverageCost(routerId);

  if (!prompts) throw new Error("No prompts found");

  if (!averageLatency) throw new Error("No average latency found");

  if (!averageCost) throw new Error("No average cost found");

  return {
    promptCount: prompts.length,
    averageLatency,
    averageCost,
  };
}
