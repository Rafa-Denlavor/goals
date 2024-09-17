import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekSummary } from "../features/get-week-summary";
import { z } from "zod";
import { verifyJWT } from '../middlewares/verifyJWT';

export const getSummaryRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.get("/summary", async (req, res) => {
    const { summary } = await getWeekSummary();

    return { summary };
  });
};
