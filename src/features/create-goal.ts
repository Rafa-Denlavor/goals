import { db } from "src/db";
import { goals } from "src/db/schema";

interface CreateGoalRequest {
  title: string;
  description?: string | null | undefined;
  desiredWeeklyFrequency: number;
}

export async function createGoal({
  title,
  description,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({ title, description, desiredWeeklyFrequency })
    .returning();
  const goal = result[0];

  return { goal };
}
