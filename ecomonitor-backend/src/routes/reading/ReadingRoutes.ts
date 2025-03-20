import { Router } from "express";
import { ReadingController } from "../../controllers/reading/ReadingController";

const readingRouter = Router();
const readingController = new ReadingController();

readingRouter.post("/api/leituras", (req, res) => readingController.create(req, res));

readingRouter.get("/api/leituras/estatisticas", (req, res) => readingController.getStatistics(req, res));
readingRouter.get("/api/leituras", (req, res) => {
    if (Object.keys(req.query).length > 0) {
        readingController.getByFilter(req, res); // Se há parâmetros, chamar a filtragem
    } else {
        readingController.getAll(req, res); // Senão, listar tudo
    }
});
readingRouter.get("/api/leituras/:id", (req, res) => readingController.getById(req, res));
readingRouter.put("/api/leituras/:id", (req, res) => readingController.update(req, res));
readingRouter.delete("/api/leituras/:id", (req, res) => readingController.delete(req, res));

export default readingRouter;

