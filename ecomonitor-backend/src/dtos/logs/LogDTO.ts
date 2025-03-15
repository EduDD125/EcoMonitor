export interface LogDTO {
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
    timestamp: Date;
  }
  