import db from "@/db";
import { prompts, routers } from "@/db/schema";
import { NewRouter, Router } from "@/types";
import { avg, desc, eq, sql } from "drizzle-orm";
import apiKeyService from "./apiKey.service";

const routerService = {
  async create(newRouter: NewRouter): Promise<Router> {
    const [createdRouter] = await db
      .insert(routers)
      .values({ ...newRouter })
      .returning();

    const _ = apiKeyService.create({
      router: createdRouter.id,
      name: "Default",
    });

    return createdRouter;
  },

  async get(id: string): Promise<Router> {
    const router = await db.query.routers.findFirst({
      where: (routers, { eq }) => eq(routers.id, id),
    });
    if (!router) {
      throw new Error("Router not found");
    }

    return router;
  },

  async getAll(userId: string): Promise<Router[]> {
    const userRouters = await db.query.routers.findMany({
      where: (routers, { eq }) => eq(routers.user, userId),
    });
    return userRouters;
  },

  async getPrompts(routerId: string) {
    const prompts = await db.query.prompts.findMany({
      where: (prompts, { eq }) => eq(prompts.router, routerId),
    });
    return prompts;
  },

  async getAverageLatency(routerId: string) {
    const result = await db
      .select({ avg: avg(prompts.latency) })
      .from(prompts)
      .where(eq(prompts.router, routerId));

    const averageLatency = result[0].avg;
    return averageLatency;
  },

  async getAverageCost(routerId: string) {
    const result = await db
      .select({ avg: avg(prompts.cost) })
      .from(prompts)
      .where(eq(prompts.router, routerId));

    const averageCost = result[0].avg;
    return averageCost;
  },

  async getUsageData(routerId: string) {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const query = sql`
    SELECT 
      date_series.date AS prompt_date,
      COALESCE(pc.prompt_count, 0) AS prompt_count
    FROM 
      (SELECT generate_series(CURRENT_DATE - INTERVAL '93 days', CURRENT_DATE, '1 day')::date AS date) AS date_series
    LEFT JOIN 
      (SELECT DATE(created_at) AS prompt_date, COUNT(*) AS prompt_count 
      FROM prompts 
      WHERE router = ${routerId} AND created_at >= CURRENT_DATE - INTERVAL '93 days'
      GROUP BY prompt_date) AS pc
    ON date_series.date = pc.prompt_date
    ORDER BY date_series.date;`;

    const responses = await db.execute(query);
    const usage = responses.rows.map(({ prompt_date, prompt_count }) => ({
      day: prompt_date,
      usage: prompt_count,
    }));

    return usage as { day: string; usage: number }[];
  },

  async getModelSelectionData(routerId: string) {
    const accessData = await db
      .select({ name: prompts.model, retrieved: prompts.created_at })
      .from(prompts)
      .where(eq(prompts.router, routerId))
      .orderBy(desc(prompts.created_at));

    return accessData;
  },
};

export default routerService;
