import { db } from "../db";
import { users } from "../db/schema";

interface CreateUserRequest {
  username: string,
  name: string,
  password: string
}

export async function createUser({
  username,
  name,
  password,
}: CreateUserRequest) {
  const result = await db
    .insert(users)
    .values({ username, name, password })
    .returning();

  const user = result[0];

  return { user };
}
