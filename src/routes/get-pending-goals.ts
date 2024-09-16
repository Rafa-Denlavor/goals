import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekPendingGoals } from "../features/get-week-pending-goals";

export const getPendingGoalRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.get("/pending-goals", async (req, res) => {
    const { pendingGoals } = await getWeekPendingGoals();

    return { pendingGoals };
  });
};
