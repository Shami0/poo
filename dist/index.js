import express from "express";
import { handlerReadiness } from "./api/readiness.js";
import { handlerMetrics } from "./api/metrics.js";
import { handlerReset } from "./api/reset.js";
import { middlewareLogResponse, middlewareMetricsInc, } from "./api/middleware.js";
import { handlerChirpsValidate } from "./api/chirps.js";
const app = express();
const PORT = 8080;
app.use(middlewareLogResponse);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics", handlerMetrics);
app.post("/admin/reset", handlerReset);
app.post("/api/validate_chirp", handlerChirpsValidate);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
