import { Reading } from "../../domain/leitura/reading";
import { IReadingRepository } from "../../repositories/reading/IReadingRepository";
import { LogService } from "../../services/LogService";
import { ILogRepository } from "../../repositories/logs/ILogRepository";
import { GetAllReadingsDTO } from "../../dtos/reading/GetAllReadingsDTO";

export class GetAllReadingsUseCase {
    constructor(
        private readingRepository: IReadingRepository,
        private logRepository: ILogRepository
    ) {}

    async execute( requestIp: string, userAgent?: string, userId?: string): Promise<Reading[] | null> {
        const logService = new LogService(this.logRepository);

        try {
            const readings = await this.readingRepository.findAll();

            if (!readings) throw new Error("There're no Readings register in the system.")
            
            await logService.logGetAllItensSuccess("Reading", "/api/leituras", requestIp, userAgent, userId);
            return readings;
        } catch (error: any) {
            await logService.logGetAllItensError("Reading", "/api/leituras", requestIp, error.stack, userAgent, userId);

            throw error;
        }
    }
}
