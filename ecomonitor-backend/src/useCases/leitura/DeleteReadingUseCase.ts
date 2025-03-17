import { UUID } from "crypto";
import { Reading } from "../../domain/leitura/reading";
import { DeleteReadingDTO } from "../../dtos/reading/DeleteReadingDTO";
import { ILogRepository } from "../../repositories/logs/ILogRepository";
import { IReadingRepository } from "../../repositories/reading/IReadingRepository";
import { LogService } from "../../services/LogService";
import { isValidUUID } from "../../utils/validateUUID";

export class DeleteReadingUseCase {
    constructor (
        private readingRepository: IReadingRepository,
        private logRepository: ILogRepository
    ) {}

    async execute (data: DeleteReadingDTO, requestIp: string, userAgent?: string, userId?: string): Promise<void> {
        const logService = new LogService(this.logRepository);

        if (!isValidUUID(data.id)) {
            await logService.logInvalidUUIDFormat("Reading", data.id, "api/leituras", requestIp, userAgent, userId);
            throw new Error("Invalid UUID format.");
        }

        const readingId: UUID = data.id as UUID;

        try {
            const reading = await this.readingRepository.findById(readingId);

            if (!reading) {
                throw new Error(`Reading item with id ${readingId} not found.`);
            }
            const destroyedRows = await this.readingRepository.delete(readingId);

            if (destroyedRows < 1) throw new Error(`Failure deleting Reading item with id ${readingId}. Database informs that any row was deleted.`);

            await logService.logDeletionSuccess("Reading", "api/leituras",requestIp, userAgent, userId);
        } catch (error: any) {
            await logService.logDeletionError("Reading", "api/leituras", requestIp, error.stack, userAgent, userId );

            throw error;
        }
    }
}