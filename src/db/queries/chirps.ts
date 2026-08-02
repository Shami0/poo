import { db } from "../index.js";
import { chirps, NewChirp } from "../schema.js";

export async function createChirp(chirp: NewChirp) {
  const [rows] = await db.insert(chirps).values(chirp).returning();
  return rows;
}

export async function returnAllChirp() {
  const all = await db.select().from(chirps).orderBy(chirps.createdAt);
  return all;
}