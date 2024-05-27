"use server";

import routerService from "@/services/router.service";

export async function getModelSelectionData(routerId: string) {
  const modelSelectionData = await routerService.getModelSelectionData(
    routerId
  );

  const nameCountMap = new Map<string, number>();

  modelSelectionData.forEach((item) => {
    const name = item.name;
    if (nameCountMap.has(name)) {
      nameCountMap.set(name, nameCountMap.get(name)! + 1);
    } else {
      nameCountMap.set(name, 1);
    }
  });

  const aggregatedArray = Array.from(nameCountMap, ([name, count]) => ({
    name,
    count,
  }));

  return aggregatedArray;
}
