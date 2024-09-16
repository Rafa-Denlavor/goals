import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoal } from "../features/create-goal";
import { z } from "zod";

export const createGoalRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.post(
    "/goals",
    {
      schema: {
        body: z.object({
          title: z.string(),
          description: z.string().nullable().nullish(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async (req, res) => {
      const { title, description, desiredWeeklyFrequency } = req.body;

      await createGoal({
        title,
        description,
        desiredWeeklyFrequency,
      }).catch(() => {
        throw new Error("Unable to create goal");
      });
    }
  );
};
