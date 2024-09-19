import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoalCompletion } from "../features/create-goal-completion";
import { z } from "zod";
import { verifyJWT } from '../middlewares/verifyJWT';

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async (
  app,
  _options
) => {
  app.post(
    "/completion",
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
      preHandler: [verifyJWT]
    },
    async (req, res) => {
      const { goalId } = req.body;
      await createGoalCompletion(goalId);

       return res.status(201).send({ message: `Goal ${goalId} successfully updated!` });
    }
  );
};
