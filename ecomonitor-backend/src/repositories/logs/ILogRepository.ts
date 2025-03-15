import { UUID } from "crypto";
import { Log } from "../../domain/logs/logs";

export interface ILogRepository {
    save(reading: Log): Promise<void>;
    findAll(): Promise<Log[]>;
    findById(id: UUID): Promise<Log | null>;
}