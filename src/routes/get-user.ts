import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getUser } from "../features/get-user";
import { z } from "zod";
import { verifyJWT } from '../middlewares/verifyJWT';

export const getUserRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.get("/user",
  {
    preHandler: [verifyJWT]
  },
  async (req, res) => {
    console.log(req.userId);
    const id = req.query.id ?? req.userId;
    const user = await getUser(id).catch(() => {
      return res.status(400).send({ message: 'There was an error querying the user'})
    });
    return user;
  });
};
