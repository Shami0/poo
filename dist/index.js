import express from "express";
import { handlerReadiness } from "./api/readiness.js";
import { handlerMetrics } from "./api/metrics.js";
import { handlerReset } from "./api/reset.js";
import { errorMiddleWare, middlewareLogResponse, middlewareMetricsInc, } from "./api/middleware.js";
import { handlerChirpsValidate } from "./api/chirps.js";
const app = express();
const PORT = 8080;
app.use(middlewareLogResponse);
app.use(express.json());
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.get("/api/healthz", (req, res, next) => {
    Promise.resolve(handlerReadiness(req, res)).catch(next);
});
app.get("/admin/metrics", (req, res, next) => {
    Promise.resolve(handlerMetrics(req, res)).catch(next);
});
app.post("/admin/reset", (req, res, next) => {
    Promise.resolve(handlerReset(req, res)).catch(next);
});
app.post("/api/validate_chirp", (req, res, next) => {
    Promise.resolve(handlerChirpsValidate(req, res)).catch(next);
});
app.use(errorMiddleWare);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
