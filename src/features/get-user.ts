import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
export async function getUser(userId: string) {
  const user = await db.select({
    name: users.name,
    email: users.email
    avatar: users.avatar,
    motivationalPhrase: users.motivationalPhrase,
    createdAt: users.createdAt
  }).from(users).where(eq(users.id, userId));
  return user;
}
