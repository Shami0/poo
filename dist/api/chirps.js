import { respondWithJSON } from "./json.js";
import { BadRequestError } from "./errors.js";
export async function handlerChirpsValidate(req, res) {
    const params = req.body;
    const maxChirpLength = 140;
    if (params.body.length > maxChirpLength) {
        throw new BadRequestError(`Chirp is too long. Max length is ${maxChirpLength}`);
    }
    const words = params.body.split(" ");
    const badWords = ["kerfuffle", "sharbert", "fornax"];
    for (let i = 0; i < words.length; i++) {
        if (badWords.includes(words[i].toLowerCase())) {
            words[i] = "****";
        }
    }
    const cleaned = words.join(" ");
    respondWithJSON(res, 200, {
        cleanedBody: cleaned,
    });
}
