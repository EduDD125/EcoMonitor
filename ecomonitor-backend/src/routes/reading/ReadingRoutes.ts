import { Router } from "express";
import { ReadingController } from "../../controllers/reading/ReadingController";

const router = Router();
const readingController = new ReadingController();

router.post("/api/leituras", (req, res) => readingController.create(req, res));
router.get("/api/leituras", (req, res) => readingController.getAll(req, res));
router.get("/api/leituras/:id", (req, res) => readingController.getById(req, res));
router.put("/api/leituras/:id", (req, res) => readingController.update(req, res));
router.delete("/api/leituras/:id", (req, res) => readingController.delete(req, res));

export default router;

