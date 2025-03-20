import { UUID } from "crypto";
import { Log } from "../../domain/logs/logs";
import { LogModel } from "../../models/LogsModel";
import { LogStatisticsDTO } from "../../dtos/logs/LogStatisticsDTO";

export interface ILogRepository {
    save(log: Log): Promise<void>;
    findAll(): Promise<Log[]>;
    findById(id: UUID): Promise<Log | null>;
    getStatistics(): Promise<LogStatisticsDTO[]>;
}