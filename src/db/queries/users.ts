import { db } from "../index.js";
import { NewUser, users } from "../schema.js";
import { checkPasswordHash, hashPassword } from "../../auth.js";
import { eq } from "drizzle-orm";
import { NotFoundError, UserNotAuthenticatedError } from "../../api/errors.js";

export async function createUser(user: NewUser) {
  const [result] = await db
    .insert(users)
    .values(user)
    .onConflictDoNothing()
    .returning();
  return result;
}

export async function reset() {
    await db.delete(users);
}

export async function getUserByEmail(email: string) {
  const [result] = await db.select().from(users).where(eq(users.email, email));
  return result;
}
