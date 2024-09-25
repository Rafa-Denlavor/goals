import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import jwt from 'jsonwebtoken';
import { verifyUser } from '../features/verify-user';

const ONE_DAY = 86400;

export const loginRoute: FastifyPluginAsyncZod = async (
  app,
  _options
) => {
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
      res.status(401).send({ message: 'Enter username and password'})
    }

    const { hasUser, userInfo } = await verifyUser(username, password);

    if(hasUser) {
      const { id, username } = userInfo;
      const token = jwt.sign({ userId: id, username }, process.env.JWT_SECRET, { expiresIn: ONE_DAY });

      res.status(200).send({
        message: 'Authenticated user',
        token
      })
    }

    return res.status(401).send({ message: 'Invalid username or password'})

  });
};
