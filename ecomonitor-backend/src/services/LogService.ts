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
            new Date(),
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
            new Date(),
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
            new Date(),
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
            new Date(),
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
            new Date(),
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
            new Date(),
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

    async logGetItensByFilterSuccess(
        entityName: string,
        endpoint: string,
        requestIp: string,
        userAgent?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "INFO",
            200,
            new Date(),
            "GET",
            endpoint,
            `Successfully retrieved ${entityName}'s itens with filter`,
            requestIp,
            "Backend",
            userAgent,
            undefined,
            userId
        );
    
        await this.logRepository.save(log);
    }

    async logGetItensByFilterError(
        entityName: string,
        endpoint: string,
        requestIp: string,
        userAgent?: string,
        errorStack?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "WARN",
            400,
            new Date(),
            "GET",
            endpoint,
            `Problem trying to retrieved ${entityName}'s itens with filter`,
            requestIp,
            "Backend",
            userAgent,
            errorStack,
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
            new Date(),
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
    
    async logGetItemSuccess(entityName: string, endpoint: string, itemId: string, requestIp: string, userAgent?: string, userId?: string): Promise<void> {
        const log = new Log(
            "INFO",
            200,
            new Date(),
            "GET",
            endpoint,
            `Successfully retrieved ${entityName} with ID: ${itemId}`,
            requestIp,
            "Backend",
            userAgent,
            undefined,
            userId
        );
    
        await this.logRepository.save(log);
    }
    
    async logGetItemNotFound(entityName: string, endpoint: string, itemId: string, requestIp: string, userAgent?: string, userId?: string): Promise<void> {
        const log = new Log(
            "WARN",
            404,
            new Date(),
            "GET",
            endpoint,
            `${entityName} with ID: ${itemId} not found`,
            requestIp,
            "Backend",
            userAgent,
            undefined,
            userId
        );
    
        await this.logRepository.save(log);
    }

    async logGetStatisticSuccess(
        entityName: string,
        endpoint: string,
        requestIp: string,
        userAgent?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "INFO",
            200,
            new Date(),
            "GET",
            endpoint,
            `Successfully retrieved ${entityName}'s statistics`,
            requestIp,
            "Backend",
            userAgent,
            undefined,
            userId
        );

        await this.logRepository.save(log);
    }
    
    async logUGetStatisticError(
        entityName: string,
        endpoint: string,
        requestIp: string,
        errosStack?: string,
        userAgent?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "INFO",
            200,
            new Date(),
            "PUT",
            endpoint,
            `Problem trying to retriver statistics of ${entityName}s`,
            requestIp,
            "Backend",
            userAgent,
            errosStack,
            userId
        );
    
        await this.logRepository.save(log);
    }
    
    async logUpdateError(
        entityName: string,
        endpoint: string,
        itemId: string,
        requestIp: string,
        errorStack?: string,
        userAgent?: string,
        userId?: string
    ): Promise<void> {
        const log = new Log(
            "ERROR",
            500,
            new Date(),
            "PUT",
            endpoint,
            `Failed to update ${entityName} with ID: ${itemId}`,
            requestIp,
            "Backend",
            userAgent,
            errorStack,
            userId
        );
    
        await this.logRepository.save(log);
    }
    
    
}
