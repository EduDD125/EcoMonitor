import { Reading } from "../../domain/leitura/reading";
import { IReadingRepository } from "../../repositories/reading/IReadingRepository";
import { LogService } from "../../services/LogService";
import { ILogRepository } from "../../repositories/logs/ILogRepository";
import { GetReadingDTO } from "../../dtos/reading/GetReadingDTO";
import { isValidUUID } from "../../utils/validateUUID";
import { UUID } from "crypto";

export class GetReadingUseCase {
    constructor(
        private readingRepository: IReadingRepository,
        private logRepository: ILogRepository
    ) {}

    async execute(data: GetReadingDTO, requestIp: string, userAgent?: string, userId?: string): Promise<Reading | null> {
        const logService = new LogService(this.logRepository);

        if (!isValidUUID(data.id)) {
            await logService.logInvalidUUIDFormat("Reading", data.id, "api/leituras", requestIp, userAgent, userId);
            throw new Error("Invalid UUID format.");
        }
        const readingId = data.id as UUID;

        try {
            const reading = await this.readingRepository.findById(readingId);

            if (!reading) throw new Error(`Reading item with id ${readingId} not found`);
            
            await logService.logGetAllItensSuccess("Reading", "/api/leituras", requestIp, userAgent, userId);
            return reading;
        } catch (error: any) {
            await logService.logGetItemNotFound("Reading", "/api/leituras", requestIp, error.stack, userAgent, userId);

            throw error;
        }
    }
}
