import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { deleteUser } from "../features/delete-user";

export const deleteUserRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.delete(
    "/user",
    async (req, res) => {
      const { id } = req.body;

      await deleteUser(id).catch(() => {
        throw new Error("Could not delete user");
      });
    }
  );
};
