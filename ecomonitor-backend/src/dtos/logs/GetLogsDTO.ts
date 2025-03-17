import { GetLogDTO } from "./GetLogDTO";

export interface GetLogs {
    logs: GetLogDTO[];
    total: number;
}