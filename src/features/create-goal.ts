import { db } from "../db";
import { goals } from "../db/schema";

interface CreateGoalRequest {
  title: string;
  description?: string | null | undefined;
  desiredWeeklyFrequency: number;
  userId: string;
}

export async function createGoal({
  title,
  description,
  desiredWeeklyFrequency,
  userId
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({ title, description, desiredWeeklyFrequency, userId })
    .returning();
  const goal = result[0];

  return { goal };
}
