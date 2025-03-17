import { UUID } from "crypto";

export interface GetLogDTO {
    id: UUID;
    timestamp: Date;
    level: "INFO" | "WARN" | "ERROR" | "DEBUG";
    httpStatus: number;
    method: string;
    endpoint: string;
    message: string;
    requestIp: string;
    origin: string;
    userAgent?: string;
    stackTrace?: string;
    userId?: string;
  }
  