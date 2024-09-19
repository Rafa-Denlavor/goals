import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { deleteGoalCompletion } from "../features/delete-goal-completion";
import { verifyJWT } from '../middlewares/verifyJWT';

export const deleteGoalCompletionRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.delete(
    "/completion",
    {
      preHandler: [verifyJWT]
    },
    async (req, res) => {
      const { id } = req.body;

      await deleteGoalCompletion(id).catch(() => {
        throw new Error("Could not delete goal completion");
      });
    }
  );
};
