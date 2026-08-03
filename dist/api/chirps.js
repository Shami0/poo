import { respondWithJSON } from "./json.js";
import { createChirp, returnAllChirp, returnChirpById, } from "../db/queries/chirps.js";
import { BadRequestError, NotFoundError } from "./errors.js";
export async function handlerChirpsCreate(req, res) {
    const params = req.body;
    const cleaned = validateChirp(params.body);
    const chirp = await createChirp({ body: cleaned, userId: params.userId });
    respondWithJSON(res, 201, chirp);
}
export async function getAllChirp(_, res) {
    const allChirp = await returnAllChirp();
    respondWithJSON(res, 200, allChirp);
}
export async function getChirpById(req, res) {
    const chirpId = req.params.chirpId;
    const chirp = await returnChirpById(chirpId);
    if (!chirp) {
        throw new NotFoundError("Chirp not found"); // if you create a NotFoundError class
    }
    respondWithJSON(res, 200, chirp);
}
function validateChirp(body) {
    const maxChirpLength = 140;
    if (body.length > maxChirpLength) {
        throw new BadRequestError(`Chirp is too long. Max length is ${maxChirpLength}`);
    }
    const badWords = ["kerfuffle", "sharbert", "fornax"];
    return getCleanedBody(body, badWords);
}
function getCleanedBody(body, badWords) {
    const words = body.split(" ");
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const loweredWord = word.toLowerCase();
        if (badWords.includes(loweredWord)) {
            words[i] = "****";
        }
    }
    const cleaned = words.join(" ");
    return cleaned;
}
