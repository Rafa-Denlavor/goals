import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekSummary } from "../features/get-week-sumarry";
import { z } from "zod";

export const getUser: FastifyPluginAsyncZod = async (app, _options) => {
  app.get("/user", async (req, res) => {
    const { summary } = await getWeekSummary();

    return { summary };
  });
};
