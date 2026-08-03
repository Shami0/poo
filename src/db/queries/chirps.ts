import { db } from "../index.js";
import { eq } from "drizzle-orm";
import { chirps, NewChirp } from "../schema.js";
import { NotFoundError } from "../../api/errors.js";


export async function createChirp(chirp: NewChirp) {
  const [rows] = await db.insert(chirps).values(chirp).returning();
  return rows;
}

export async function returnAllChirp() {
  const all = await db.select().from(chirps).orderBy(chirps.createdAt);
  return all;
}

export async function returnChirpById(id:string) {
  const idChirp = await db.select().from(chirps).where(eq(chirps.id, id));
  if (idChirp.length === 0) {
    throw new NotFoundError("Can't find the chirp");
  }
  return idChirp[0];
}