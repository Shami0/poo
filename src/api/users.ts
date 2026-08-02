import type { Request, Response } from "express";

import { createUser } from "../db/queries/users.js";
import { BadRequestError } from "./errors.js";
import { respondWithJSON } from "./json.js";

export async function createUsers(req: Request, res: Response) {
    type parameters = {
        email: string;
    };
    
    const params: parameters = req.body;

    if (!params.email) {
        throw new BadRequestError("You need to insert the email!")
    }
    
    const user = await createUser(params);

    respondWithJSON(res, 201, {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });

}