import type { Request, Response } from "express";
import { upgradeChirpyRed } from "../db/queries/users.js";
import { NotFoundError, UserForbiddenError, UserNotAuthenticatedError } from "./errors.js";
import { getAPIKey } from "../auth.js";
import { config } from "../config.js";


export async function handlerWebhook(req: Request, res: Response) {
  type parameters = {
    event: string;
    data: {
        userId: string;
    };
  };

  let apiKey = getAPIKey(req);
  if (apiKey !== config.api.polkaApiKey) {
    throw new UserNotAuthenticatedError("invalid api key");
  }

  const params: parameters = req.body;

  
  if (params.event !== "user.upgraded") {
    res.status(204).send();
    return;
  }

  const user = await upgradeChirpyRed(params.data.userId);

  if (!user) {
    throw new NotFoundError(`puff`);
  }

  res.status(204).send();

}