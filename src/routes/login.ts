import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import jwt from 'jsonwebtoken';

export const loginRoute: FastifyPluginAsyncZod = async (
  app,
  _options
) => {
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
      res.status(401).send({ message: 'Enter username and password'})
    }


    if(username === 'andressa.ferreira' && password === '123') {
      const token = jwt.sign({ userId: '1' }, process.env.JWT_SECRET, { expiresIn: 100 });

      res.status(200).send({
        message: 'Authenticated user',
        token
      })
    }

    // if(username && password) {
    //   const { userId } = await getUser();
    //
    //    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: 100 })
    //
    //    res.status(200).send({
    //      message: 'Authenticated user',
    //      token
    //    })
    // }

    return res.status(401).send({ message: 'Invalid username or password'})

  });
};
