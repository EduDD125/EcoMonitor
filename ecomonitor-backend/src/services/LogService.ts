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

    async logInvalidUUIDFormat(
        entityName: string,
        receivedId: string,
        endpoint: string,
        requestIp: string,
        userAgent?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "WARN",
            400,
            "REQUEST",
            endpoint,
            `Invalid UUID format received for ${entityName}: ${receivedId}`,
            requestIp,
            "Backend",
            userAgent,
            undefined,
            userId
        );

        await this.logRepository.save(log);
    }

    async logGetAllItensSuccess(
        entityName: string,
        endpoint: string,
        requestIp: string,
        userAgent?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "INFO",
            200,
            "GET",
            endpoint,
            `Successfully retrieved all ${entityName}`,
            requestIp,
            "Backend",
            userAgent,
            undefined,
            userId
        );
    
        await this.logRepository.save(log);
    }

    async logGetAllItensError(
        entityName: string,
        endpoint: string,
        requestIp: string,
        errorStack?: string, 
        userAgent?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "WARN",
            404,
            "GET",
            endpoint,
            `Problem trying to retriever ${entityName} from the data base`,
            requestIp,
            "Backend",
            userAgent,
            errorStack,
            userId
        );
    
        await this.logRepository.save(log);
    }
    
    async logGetItemSuccess(entityName: string, endpoint: string, readingId: string, requestIp: string, userAgent?: string, userId?: string): Promise<void> {
        const log = new Log(
            "INFO",
            200,
            "GET",
            endpoint,
            `Successfully retrieved ${entityName} with ID: ${readingId}`,
            requestIp,
            "Backend",
            userAgent,
            undefined,
            userId
        );
    
        await this.logRepository.save(log);
    }
    
    async logGetItemNotFound(entityName: string, endpoint: string, readingId: string, requestIp: string, userAgent?: string, userId?: string): Promise<void> {
        const log = new Log(
            "WARN",
            404,
            "GET",
            endpoint,
            `${entityName} with ID: ${readingId} not found`,
            requestIp,
            "Backend",
            userAgent,
            undefined,
            userId
        );
    
        await this.logRepository.save(log);
    }
    
    async logUpdateSuccess(
        entityName: string,
        endpoint: string,
        readingId: string,
        requestIp: string,
        userAgent?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "INFO",
            200,
            "PUT",
            endpoint,
            `Successfully updated ${entityName} with ID: ${readingId}`,
            requestIp,
            "Backend",
            userAgent,
            undefined,
            userId
        );
    
        await this.logRepository.save(log);
    }
    
    async logUpdateError(
        entityName: string,
        endpoint: string,
        readingId: string,
        requestIp: string,
        errorStack?: string,
        userAgent?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "ERROR",
            500,
            "PUT",
            endpoint,
            `Failed to update ${entityName} with ID: ${readingId}`,
            requestIp,
            "Backend",
            userAgent,
            errorStack,
            userId
        );
    
        await this.logRepository.save(log);
    }
    
    
}
