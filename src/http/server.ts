import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { mainRoute } from "../routes";
import { loginRoute } from '../routes/login';
import { getUserRoute } from '../routes/get-user';
import { createUserRoute } from '../routes/create-user';
import { deleteUserRoute } from '../routes/delete-user';
import { createGoalRoute } from "../routes/create-goal";
import { deleteGoalRoute } from "../routes/delete-goal";
import { createGoalCompletionRoute } from "../routes/create-goal-completion";
import { deleteGoalCompletionRoute } from '../routes/delete-goal-completion';
import { getPendingGoalRoute } from "../routes/get-pending-goals";
import { getSummaryRoute } from "../routes/get-week-summary";
import { loginRoute } from '../routes/login';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(mainRoute);
app.register(getUserRoute);
app.register(createUserRoute);
app.register(deleteUserRoute);
app.register(createGoalRoute);
app.register(deleteGoalRoute);
app.register(createGoalCompletionRoute);
app.register(deleteGoalCompletionRoute);
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
