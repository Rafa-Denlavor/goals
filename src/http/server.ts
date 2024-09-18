import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createUserRoute } from '../routes/create-user';
import { createGoalRoute } from "../routes/create-goal";
import { deleteGoalRoute } from "../routes/delete-goal";
import { createGoalCompletionRoute } from "../routes/create-goal-completion";
import { deleteGoalCompletionRoute } from '../routes/delete-goal-completion';
import { getPendingGoalRoute } from "../routes/get-pending-goals";
import { mainRoute } from "../routes";
import { getSummaryRoute } from "../routes/get-week-summary";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(mainRoute);
app.register(createUserRoute);
app.register(createGoalRoute);
app.register(deleteGoalRoute);
app.register(createGoalCompletionRoute);
app.register(deleteGoalCompletionRoute);
app.register(getPendingGoalRoute);
app.register(getSummaryRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running!");
  });
