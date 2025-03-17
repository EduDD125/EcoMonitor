import { GetLogDTO } from "./GetLogDTO";

export interface GetAllLogs {
    logs: GetLogDTO[];
    total: number;
}