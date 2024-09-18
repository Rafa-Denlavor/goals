import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export async function getUser(userId: string) {
  const user = await db.select().from(users).where(eq(users.id, userId));

  return user;
}
