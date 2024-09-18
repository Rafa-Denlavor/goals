import { db } from "../db";
import { goalsCompletions } from "../db/schema";
import { eq } from "drizzle-orm";

export async function deleteGoalCompletion(id: string) {
   await db.delete(goalsCompletions).where(eq(goalsCompletions.id, id));
}
