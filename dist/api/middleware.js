import { config } from "../config.js";
export function middlewareLogResponse(req, res, next) {
    res.on("finish", () => {
        const statusCode = res.statusCode;
        if (statusCode >= 300) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`);
        }
    });
    next();
}
export function middlewareMetricsInc(_, __, next) {
    config.fileServerHits++;
    next();
}
export function errorMiddleWare(err, _, res, __) {
    console.log(err.message);
    res.status(500).json({
        error: "Something went wrong on our end",
    });
}
