import express from "express";
import { handlerReadiness } from "./api/readiness.js";
import { handlerMetrics } from "./api/metrics.js";
import { handlerReset } from "./api/reset.js";
import { errorMiddleWare, middlewareLogResponse, middlewareMetricsInc, } from "./api/middleware.js";
import { handlerChirpsCreate, getAllChirp } from "./api/chirps.js";
import postgres from "postgres";
import { config } from "./config.js";
import { createUsers } from "./api/users.js";
const migrationClient = postgres(config.db.url, {
    max: 1,
});
const app = express();
app.use(middlewareLogResponse);
app.use(express.json());
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.get("/api/healthz", (req, res, next) => {
    Promise.resolve(handlerReadiness(req, res)).catch(next);
});
app.get("/admin/metrics", (req, res, next) => {
    Promise.resolve(handlerMetrics(req, res)).catch(next);
});
app.get("/api/chirps", (req, res, next) => {
    Promise.resolve(getAllChirp(req, res)).catch(next);
});
app.post("/admin/reset", (req, res, next) => {
    Promise.resolve(handlerReset(req, res)).catch(next);
});
app.post("/api/chirps", (req, res, next) => {
    Promise.resolve(handlerChirpsCreate(req, res)).catch(next);
});
app.post("/api/users", (req, res, next) => {
    Promise.resolve(createUsers(req, res)).catch(next);
});
app.use(errorMiddleWare);
app.listen(config.api.port, () => {
    console.log(`Server is running at http://localhost:${config.api.port}`);
});
