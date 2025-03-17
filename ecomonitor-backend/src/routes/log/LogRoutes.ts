import { Router } from "express";
import { LogController } from "../../controllers/log/LogController";

const router = Router();
const logController = new LogController();

router.get("/api/logs", (req, res) => logController.getAll(req, res));
router.get("/api/logs/:id", (req, res) => logController.getById(req, res));

export default router;

