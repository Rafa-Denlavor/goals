import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { deleteGoal } from "../features/delete-goal";

export const deleteGoalRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.delete(
    "/goal",
    async (req, res) => {
      const { id } = req.body;

      await deleteGoal(id).catch(() => {
        throw new Error("Could not delete goal");
      });
    }
  );
};
