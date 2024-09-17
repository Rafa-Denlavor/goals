import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "../routes/create-goal";
import { createCompletionGoalRoute } from "../routes/create-completion-goal";
import { getPendingGoalRoute } from "../routes/get-pending-goals";
import { mainRoute } from "../routes";
import { getSummaryRoute } from "../routes/get-week-summary";
import { loginRoute } from '../routes/login';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(mainRoute);
app.register(createGoalRoute);
app.register(createCompletionGoalRoute);
app.register(getPendingGoalRoute);
app.register(getSummaryRoute);
app.register(loginRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running!");
  });
