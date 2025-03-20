import { Reading } from "../../domain/leitura/reading";
import { ILogRepository } from "../../repositories/logs/ILogRepository"
import { IReadingRepository } from "../../repositories/reading/IReadingRepository"
import { LogService } from "../../services/LogService"

export class FilterReadingsUseCase {
    constructor(
        private readingRepository: IReadingRepository,
        private logRepository: ILogRepository
    ) {}

    async execute( filter: {locations?: string[]; measurementTypes?: string[];}, requestIp: string, userAgent?: string, userId?: string): Promise<Reading[] | null>  {
        const logService = new LogService(this.logRepository);

        try {
            const readings = await this.readingRepository.findByFilter(filter);
            console.log("\n\nisso mesmo",readings,"\n\n");
            if (!readings  || readings.length === 0) throw new Error("There're no Readings register in the system.")
            
            await logService.logGetItensByFilterSuccess("Reading", "/api/leituras", requestIp, userAgent, userId);
            return readings;
        } catch (error: any) {
            await logService.logGetItensByFilterError("Reading", "/api/leituras", requestIp, userAgent, error.stack, userId);

            throw error;
        }
    }
}