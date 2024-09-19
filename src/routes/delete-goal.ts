import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { deleteGoal } from "../features/delete-goal";
import { verifyJWT } from '../middlewares/verifyJWT';

export const deleteGoalRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.delete(
    "/goal",
    {
      preHandler: [verifyJWT]
    },
    async (req, res) => {
      const { id } = req.body;

      await deleteGoal(id).catch(() => {
        throw new Error("Could not delete goal");
      });
    }
  );
};
