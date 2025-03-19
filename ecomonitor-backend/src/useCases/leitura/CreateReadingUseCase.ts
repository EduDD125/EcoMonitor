import { Reading } from "../../domain/leitura/reading";
import { CreateReadingDTO } from "../../dtos/reading/CreateReadingDTO";
import { IReadingRepository } from "../../repositories/reading/IReadingRepository";
import { LogService } from "../../services/LogService";
import { ILogRepository } from "../../repositories/logs/ILogRepository";

export class CreateReadingUseCase {
    constructor(
        private readingRepository: IReadingRepository,
        private logRepository: ILogRepository,
    ) {}

    async execute(data: CreateReadingDTO, requestIp: string, userAgent?: string, userId?: string): Promise<Reading> {
        const logService = new LogService(this.logRepository);

        try {
            const reading = new Reading(data.location, null, data.measurementType, data.value);
            await this.readingRepository.save(reading);
            
            // Criar log de sucesso usando LogService
            await logService.logCreationSuccess("Reading", "/api/leituras", requestIp, userAgent, userId);

            return reading;
        } catch (error: any) {
            // Criar log de erro usando LogService
            await logService.logCreationError("Reading", "/api/leituras", requestIp, error.stack, userAgent, userId);

            throw error;
        }
    }
}
