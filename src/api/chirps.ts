import type { Request, Response } from "express";

import { respondWithJSON, respondWithError } from "./json.js";

export async function handlerChirpsValidate(req: Request, res: Response) {
  type parameters = {
    body: string;
  };

  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  let params: parameters;
  req.on("end", () => {
    try {
      params = JSON.parse(body);
    } catch (e) {
      respondWithError(res, 400, "Invalid JSON");
      return;
    }
    const maxChirpLength = 140;
    if (params.body.length > maxChirpLength) {
      respondWithError(res, 400, "Chirp is too long");
      return;
    }

    respondWithJSON(res, 200, {
      valid: true,
    });
  });
}
