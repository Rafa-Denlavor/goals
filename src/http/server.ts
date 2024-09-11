import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "src/routes/create-goal";
import { createCompletionGoalRoute } from "src/routes/create-completion-goal";
import { getPendingGoalRoute } from "src/routes/get-pending-goals";
import { mainRoute } from "src/routes";
import { getSummaryRoute } from "src/routes/get-week-summary";
import fastifyCors from "@fastify/cors";

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

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running!");
  });
