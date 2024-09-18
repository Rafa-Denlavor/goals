import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getUser } from "../features/get-user";
import { z } from "zod";

export const getUserRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.get("/user",
  // {
  //   schema: {
  //     params: z.object({
  //       id: z.string().nonempty({ message: 'ID é obrigatório'})
  //     })
  //   }
  // },
  async (req, res) => {
    const { id } = req.query;

    const user = await getUser(id).catch(() => {
      return res.status(400).send({ message: 'There was an error querying the user'})
    });

    return user;
  });
};
