import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoal } from "../features/create-goal";
import { z } from "zod";
import { verifyJWT } from '../middlewares/verifyJWT';

export const createGoalRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.post(
    "/goal",
    {
      schema: {
        body: z.object({
          title: z.string().nonempty({ message: 'O título é obrigatório.' }),
          description: z.string().nullable().nullish(),
          desiredWeeklyFrequency:
            z.number()
            .int()
            .min(1, { message: 'A frequência semanal deve ter no mínimo 1 dia'})
            .max(7,  { message: 'A frequência semanal deve ter no máximo 7 dias' })
        }),
      },
      preHandler: [verifyJWT]
    },
    async (req, res) => {
      const { title, description, desiredWeeklyFrequency } = req.body;

      await createGoal({
        title,
        description,
        desiredWeeklyFrequency,
        userId: req.userId
      }).catch(() => {
        throw new Error("Unable to create goal");
      });

      return res.status(201).send();
    }
  );
};
