import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const mainRoute: FastifyPluginAsyncZod = async (
  app,
  _options
) => {
  app.get("/", (req, res) => {
    res.status(200).send("Bem vindo ao Goals!");
  });
};
