import { Router } from "express";
import { LogController } from "../../controllers/log/LogController";

const logRouter = Router();
const logController = new LogController();

logRouter.get("/api/logs", (req, res) => logController.getAll(req, res));
logRouter.get("/api/logs/estatisticas", (req, res) => logController.getStatistics(req, res));
logRouter.get("/api/logs/:id", (req, res) => logController.getById(req, res));

export default logRouter;

