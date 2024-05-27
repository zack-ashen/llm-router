"use server";

import routerService from "@/services/router.service";
import userService from "@/services/user.service";
import { Router } from "@/types";

async function getRouter(id: string): Promise<Router> {
  const router = await routerService.get(id);

  return router;
}

async function getRouters(): Promise<Router[]> {
  const userId = await userService.getUid();
  const routers = await routerService.getAll(userId);
  return routers;
}

export { getRouter, getRouters };
