
import { LogRepositoryPostgreSQL } from "../../repositories/logs/LogRepositoryPostgreSQL";
import { CreateReadingDTO } from "../../dtos/reading/CreateReadingDTO";
import { UpdateReadingDTO } from "../../dtos/reading/UpdateReading";
import { DeleteReadingDTO } from "../../dtos/reading/DeleteReadingDTO";
import { GetAllLogsUseCase } from "../../useCases/log/GetAllLogsUseCase";
import { GetLogByIdUseCase } from "../../useCases/log/GetLogByIdUseCase";
import { GetLogStatisticsUseCase } from "../../useCases/log/GetLogStatisticsUseCase";

export class LogController {
    private logRepository = new LogRepositoryPostgreSQL();

    private getAllLogsUseCase = new GetAllLogsUseCase(this.logRepository);
    private getLogByIdUseCase = new GetLogByIdUseCase(this.logRepository);
    private getLogsStatisticsUseCase = new GetLogStatisticsUseCase(this.logRepository);

    async getAll(req: any, res: any) {
        try {
            const requestIp = req.ip;
            const userAgent = req.get("User-Agent") || "";

            const logs = await this.getAllLogsUseCase.execute(requestIp as string, userAgent); // todo: pensar como pegar id de usuário para parametro UserID
            return res.status(200).json(logs);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }

    async getById(req: any, res: any) {
        try {
            const { id } = req.params;
            const requestIp = req.ip;
            const userAgent = req.get("User-Agent") || "";

            const log = await this.getLogByIdUseCase.execute(id, requestIp as string, userAgent); // todo: pensar como pegar id de usuário para parametro UserID
            if (!log) {
                return res.status(404).json({ error: `Log with ID ${id} not found` });
            }

            return res.status(200).json(log);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getStatistics(req: any, res: any) {
        try {
            const requestIp = req.ip;
            const userAgent = req.get("User-Agent") || "";

            const logs = await this.getLogsStatisticsUseCase.execute(requestIp as string, userAgent); // todo: pensar como pegar id de usuário para parametro UserID
            return res.status(200).json(logs);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }
}
