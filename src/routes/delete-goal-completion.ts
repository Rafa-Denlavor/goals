import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { deleteGoalCompletion } from "../features/delete-goal-completion";

export const deleteGoalCompletionRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.delete(
    "/completion",
    async (req, res) => {
      const { id } = req.body;
      console.log(id);

      await deleteGoalCompletion(id).catch(() => {
        throw new Error("Could not delete goal completion");
      });
    }
  );
};
