import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
interface CreateUserRequest {
  username: string,
  name: string,
  password: string
}
export async function createUser({
  email,
  username,
  name,
  password,
}: CreateUserRequest) {
  const hasUser = await db.select().from(users)
  .where(eq(users.username, username));

  if(hasUser.length > 0) {
    return { message: 'Username already exists' };
  }
  
  const result = await db
    .insert(users)
    .values({ email, username, name, password })
    .returning();
  const user = result[0];

  return { user };
}
