import type { Request, Response } from "express";
import { config } from "../config.js";

export async function handlerReset(_: Request, res: Response) {
  config.fileServerHits = 0;
  res.write("Hits reset to 0");
  res.end();
}
