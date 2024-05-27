"use server";

import routerService from "@/services/router.service";
import { getUid } from "@/utils";

export async function getRouters() {
  const uid = await getUid();

  const routers = await routerService.getAll(uid);

  return routers;
}
