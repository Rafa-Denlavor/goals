import { db } from "../db";
import { goalsCompletions } from "../db/schema";
import { eq } from "drizzle-orm";

export async function deleteGoalCompletion(id: string) {
  console.log('Aqui estão as querys');

   await db.delete(goalsCompletions).where(eq(goalsCompletions.id, id));
}
