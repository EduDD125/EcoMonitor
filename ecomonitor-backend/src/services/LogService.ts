import { Log } from "../domain/logs/logs";
import { ILogRepository } from "../repositories/logs/ILogRepository";

export class LogService {
    constructor(private logRepository: ILogRepository) {}

    async logCreationSuccess(
        entityName: string,
        endpoint: string,
        requestIp: string,
        userAgent?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "INFO",
            201,
            "POST",
            endpoint,
            `${entityName} created successfully`,
            requestIp,
            "Backend",
            userAgent,
            undefined,
            userId
        );

        await this.logRepository.save(log);
    }

    async logCreationError(
        entityName: string,
        endpoint: string,
        requestIp: string,
        errorStack?: string,
        userAgent?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "ERROR",
            500,
            "POST",
            endpoint,
            `Failed to create ${entityName}`,
            requestIp,
            "Backend",
            userAgent,
            errorStack,
            userId
        );

        await this.logRepository.save(log);
    }

    async logDeletionSuccess(
        entityName: string,
        endpoint: string,
        requestIp: string,
        userAgent?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "INFO",
            200,
            "DELETE",
            endpoint,
            `${entityName} deleted successfully`,
            requestIp,
            "Backend",
            userAgent,
            undefined,
            userId
        );

        await this.logRepository.save(log);
    }

    async logDeletionError(
        entityName: string,
        endpoint: string,
        requestIp: string,
        errorStack?: string,
        userAgent?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "ERROR",
            500,
            "DELETE",
            endpoint,
            `Failed to delete ${entityName}`,
            requestIp,
            "Backend",
            userAgent,
            errorStack,
            userId
        );

        await this.logRepository.save(log);
    }
}
