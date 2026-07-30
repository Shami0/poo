export function respondWithError(res, code, message) {
    respondWithJSON(res, code, { error: message });
}
export function respondWithJSON(res, code, payload) {
    res.header("Content-Type", "application/json");
    const body = JSON.stringify(payload);
    res.status(code).send(body);
}
