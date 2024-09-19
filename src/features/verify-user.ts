import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
export async function verifyUser(username : string, password: string) {
  const user = await db.select().from(users).where(eq(users.username, username), eq(users.password, password));

  if(user.length === 0) {
    return { hasUser: false }
  }

  return { hasUser: true, userInfo: user };
}
