import { LogService } from "../../services/LogService";
import { ILogRepository } from "../../repositories/logs/ILogRepository";
import { Log } from "../../domain/logs/logs";
import { LogStatisticsDTO } from "../../dtos/logs/LogStatisticsDTO";

export class GetLogStatisticsUseCase {
    constructor(
        private logRepository: ILogRepository
    ) {}

    async execute( requestIp: string, userAgent?: string, userId?: string): Promise<LogStatisticsDTO[] | null> {
        const logService = new LogService(this.logRepository);

        try {
            const stats = await this.logRepository.getStatistics();

            if (!stats) throw new Error("There're no statistics of log in the system.")
            
            await logService.logGetStatisticSuccess("Log", "/api/logs/estatisticas", requestIp, userAgent, userId);
            return stats;
        } catch (error: any) {
            await logService.logUGetStatisticError("Log", "/api/logs/estatisticas", requestIp, error.stack, userAgent, userId);

            throw error;
        }
    }
}
