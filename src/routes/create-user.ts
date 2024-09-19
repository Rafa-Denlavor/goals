import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createUser } from "../features/create-user";
import { z } from "zod";
import { verifyJWT } from '../middlewares/verifyJWT';

export const createUserRoute: FastifyPluginAsyncZod = async (app, _options) => {
  app.post(
    "/user",
    {
      schema: {
        body: z.object({
          username: z.string()
            .min(1)
            .max(30)
            .regex(/^[a-zA-Z0-9_.-]+$/)
            .trim()
            .nonempty(),
          name: z.string().max(30).nonempty(),
          password: z.string()
            .min(8, 'A senha deve ter no mínimo 8 caracteres')
            .regex(/[a-zA-Z]/, 'A senha deve conter pelo menos uma letra')
            .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
            .regex(/[^a-zA-Z0-9]/, 'A senha deve conter pelo menos um caractere especial')
        }),
      },
      preHandler: [verifyJWT]
    },
    async (req, res) => {
      const { username, name, password } = req.body;
      const { message } = await createUser({
        username,
        name,
        password,
      }).catch(() => {
        throw new Error("Unable to create user");
      });
      if(message) {
        res.status(400).send({ message })
      }
      return res.status(201).send();
    }
  );
};
