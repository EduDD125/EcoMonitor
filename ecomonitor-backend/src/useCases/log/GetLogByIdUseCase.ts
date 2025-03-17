import { LogService } from "../../services/LogService";
import { ILogRepository } from "../../repositories/logs/ILogRepository";
import { isValidUUID } from "../../utils/validateUUID";
import { UUID } from "crypto";
import { Log } from "../../domain/logs/logs";

export class GetLogByIdUseCase {
    constructor(
        private logRepository: ILogRepository
    ) {}

    async execute(id: string, requestIp: string, userAgent?: string, userId?: string): Promise<Log | null> {
        const logService = new LogService(this.logRepository);

        if (!isValidUUID(id)) {
            await logService.logInvalidUUIDFormat("Log", id, "api/logs", requestIp, userAgent, userId);
            throw new Error("Invalid UUID format.");
        }
        const logId = id as UUID;

        try {
            const log = await this.logRepository.findById(logId);

            if (!log) throw new Error(`Log item with id ${logId} not found.`);
            
            await logService.logGetItemSuccess("Log", "/api/leituras", id, requestIp, userAgent, userId);
            return log;
        } catch (error: any) {
            await logService.logGetItemNotFound("Log", "/api/leituras",id, requestIp, userAgent, userId);

            throw error;
        }
    }
}
