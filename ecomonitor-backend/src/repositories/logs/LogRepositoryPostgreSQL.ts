import { UUID } from "crypto";
import { Log } from "../../domain/logs/logs";
import { ILogRepository } from "./ILogRepository";
import { LogModel } from "../../models/LogsModel";

export class LogRepositoryPostgreSQL implements ILogRepository {
    async save(log: Log): Promise<void> {
        await LogModel.create({
            id: log.getId(),
            timestamp: log.getTimestamp(),
            level: log.getLevel(),
            httpStatus: log.getHttpStatus(),
            method: log.getMethod(),
            endpoint: log.getEndpoint(),
            message: log.getMessage(),
            requestIp: log.getRequestIp(),
            origin: log.getOrigin(),
            userAgent: log.getUserAgent(),
            stackTrace: log.getStackTrace(),
            userId: log.getUserId(),
        });
    }
    async findAll(): Promise<Log[]> {
        const logs = await LogModel.findAll();
        return logs.map( log => new Log(
            log.level,
            log.httpStatus,
            log.method,
            log.endpoint,
            log.message,
            log.requestIp,
            log.origin,
            log.userAgent,
            log.stackTrace,
            log.userId,
        ));
    }
    async findById(id: UUID): Promise<Log | null> {
        const log = await LogModel.findByPk(id);
        if (!log) return null

        return new Log(
            log.level,
            log.httpStatus,
            log.method,
            log.endpoint,
            log.message,
            log.requestIp,
            log.origin,
            log.userAgent,
            log.stackTrace,
            log.userId,
        );
    }

}