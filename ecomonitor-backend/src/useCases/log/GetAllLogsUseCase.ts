import { LogService } from "../../services/LogService";
import { ILogRepository } from "../../repositories/logs/ILogRepository";
import { Log } from "../../domain/logs/logs";

export class GetAllLogsUseCase {
    constructor(
        private logRepository: ILogRepository
    ) {}

    async execute( requestIp: string, userAgent?: string, userId?: string): Promise<Log[] | null> {
        const logService = new LogService(this.logRepository);

        try {
            const logs = await this.logRepository.findAll();

            if (!logs) throw new Error("There're no Log register in the system.")
            
            await logService.logGetAllItensSuccess("Log", "/api/logs", requestIp, userAgent, userId);
            return logs;
        } catch (error: any) {
            await logService.logGetAllItensError("Log", "/api/logs", requestIp, error.stack, userAgent, userId);

            throw error;
        }
    }
}
