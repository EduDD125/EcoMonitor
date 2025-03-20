import { UUID } from "crypto";
import { Log } from "../../domain/logs/logs";
import { ILogRepository } from "./ILogRepository";
import { LogModel } from "../../models/LogsModel";
import { QueryTypes, Sequelize } from "sequelize";  
import { LogStatisticsDTO } from "../../dtos/logs/LogStatisticsDTO";

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
        const logs = await LogModel.findAll({
            order: [['timestamp', 'DESC']]
        });
        return logs.map( log => new Log(
            log.level,
            log.httpStatus,
            log.timestamp,
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
            log.timestamp,
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

    async getStatistics(): Promise<LogStatisticsDTO[]> {
        const statistics = await LogModel.sequelize?.query(
          `
          SELECT 
            level,
            COUNT(*) AS count_per_level,
            method,
            COUNT(*) FILTER (WHERE method IS NOT NULL) AS count_per_method,
            "httpStatus",
            COUNT(*) FILTER (WHERE "httpStatus" IS NOT NULL) AS count_per_status,
            endpoint,
            COUNT(*) FILTER (WHERE endpoint IS NOT NULL) AS count_per_endpoint
          FROM log
          GROUP BY level, method, "httpStatus", endpoint;
          `,
          {
            type: QueryTypes.SELECT,
            raw: true, // Retorna objetos JSON puros ao invés de instâncias do Sequelize
          }
        );
        
        console.log("\n\nnaaaao\n\n", statistics)
    
        return statistics as LogStatisticsDTO[];
      }

}