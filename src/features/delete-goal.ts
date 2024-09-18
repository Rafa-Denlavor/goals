import { db } from "../db";
import { goals } from "../db/schema";
import { eq } from "drizzle-orm";

export async function deleteGoal(id: string) {
  await db.delete(goals).where(eq(goals.id, id));
}
