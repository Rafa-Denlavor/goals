import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekPendingGoals } from "../features/get-week-pending-goals";
import { verifyJWT } from '../middlewares/verifyJWT';

export const getPendingGoalRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.get("/pending-goals", { preHandler: [verifyJWT] },  async (req, res) => {
    const { pendingGoals } = await getWeekPendingGoals();

    return { pendingGoals };
  });
};
