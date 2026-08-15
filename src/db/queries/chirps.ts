import { and, asc, eq } from "drizzle-orm";
import { db } from "../index.js";
import { chirps, NewChirp } from "../schema.js";
import { AsyncLocalStorage } from "node:async_hooks";

export async function createChirp(chirp: NewChirp) {
  const [rows] = await db
    .insert(chirps)
    .values(chirp)
    .returning();

  return rows;
}

export async function getChirps() {
  return db
    .select()
    .from(chirps)
    .orderBy(asc(chirps.createdAt));
}

export async function getChirp(id: string) {
  const rows = await db
    .select()
    .from(chirps)
    .where(eq(chirps.id, id));
  
  if (rows.length === 0) {
    return;
  }
  return rows[0];
}

export async function deleteChirp(userId: string, chirpId: string) {
  const [rows] = await db
    .delete(chirps)
    .where(
      and(
        eq(chirps.userId, userId),
        eq(chirps.id, chirpId)
      )
    )
    .returning();
  
  return rows;
}
