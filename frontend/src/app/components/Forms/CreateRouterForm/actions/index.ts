"use server";

import routerService from "@/services/router.service";
import { getUid } from "@/utils";

export async function createRouter({ routerName }: { routerName: string }) {
  const uid = await getUid();

  const router = await routerService.create({
    name: routerName,
    user: uid,
    type: "performance",
    models: "",
  });

  return router.id;
}
