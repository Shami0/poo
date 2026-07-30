import type { Request, Response, NextFunction } from "express";
import { config } from "../config.js";

export function middlewareLogResponse(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.on("finish", () => {
    const statusCode = res.statusCode;

    if (statusCode >= 300) {
      console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`);
    }
  });

  next();
}

export function middlewareMetricsInc(
  _: Request,
  __: Response,
  next: NextFunction,
) {
  config.fileServerHits++;
  next();
}

export function errorMiddleWare(
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction,
) {
  console.log(err.message);
  res.status(500).json({
    error: "Something went wrong on our end",
  });
}
