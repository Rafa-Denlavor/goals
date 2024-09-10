import fastify from "fastify";
import { createGoal } from "src/features/create-goal";
import z from "zod";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { getWeekPendingGoals } from "src/features/get-week-pending-goals";
import { createGoalCompletion } from "src/features/create-gol-completion";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/", (req, res) => {
  res.status(200).send("Bem vindo ao Goals!");
});

app.get("/pending-goals", async (req, res) => {
  const { pendingGoals } = await getWeekPendingGoals();

  return { pendingGoals };
});

app.post(
  "/goals",
  {
    schema: {
      body: z.object({
        title: z.string(),
        description: z.string().nullable().nullish(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async (req, res) => {
    const { title, description, desiredWeeklyFrequency } = req.body;

    await createGoal({
      title,
      description,
      desiredWeeklyFrequency,
    }).catch(() => console.error("Não foi possível criar meta."));
  }
);

app.post(
  "/completions",
  {
    schema: {
      body: z.object({
        goalId: z.string(),
      }),
    },
  },
  async (req, res) => {
    const { goalId } = req.body;
    await createGoalCompletion(goalId);

    return { message: `Goal ${goalId} successfully updated!`};
  }
);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running!");
  });
