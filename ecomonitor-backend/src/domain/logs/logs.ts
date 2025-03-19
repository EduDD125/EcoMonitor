import { UUID } from "crypto";
import { idStrategy } from "../../utils/idStrategy";

export class Log {
  private id: UUID;
  private timestamp: Date;
  private level: "INFO" | "WARN" | "ERROR" | "DEBUG";
  private httpStatus: number;
  private method: "GET" | "POST" | "PUT" | "DELETE" | "REQUEST";
  private endpoint: string;
  private message: string;
  private requestIp: string;
  private userAgent?: string;
  private origin: string;
  private stackTrace?: string;
  private userId?: string;

  constructor(
    level: "INFO" | "WARN" | "ERROR" | "DEBUG",
    httpStatus: number,
    timestamp: Date | null,
    method: "GET" | "POST" | "PUT" | "DELETE" | "REQUEST",
    endpoint: string,
    message: string,
    requestIp: string,
    origin: string,
    userAgent?: string,
    stackTrace?: string,
    userId?: string
  ) {
    this.id = idStrategy();
    this.timestamp = timestamp ?? new Date();
    this.level = level;
    this.httpStatus = httpStatus;
    this.method = method;
    this.endpoint = endpoint;
    this.message = message;
    this.requestIp = requestIp;
    this.origin = origin;
    this.userAgent = userAgent;
    this.stackTrace = stackTrace;
    this.userId = userId;
  }

  getId(): string {
    return this.id;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }

  getLevel(): string {
    return this.level;
  }

  getHttpStatus(): number {
    return this.httpStatus;
  }

  getMethod(): string {
    return this.method;
  }

  getEndpoint(): string {
    return this.endpoint;
  }

  getMessage(): string {
    return this.message;
  }

  getRequestIp(): string {
    return this.requestIp;
  }

  getUserAgent(): string | undefined {
    return this.userAgent;
  }

  getOrigin(): string {
    return this.origin;
  }

  getStackTrace(): string | undefined {
    return this.stackTrace;
  }

  getUserId(): string | undefined {
    return this.userId;
  }

  toString(): string {
    return `Log ID: ${this.getId()} | Timestamp: ${this.getTimestamp().toISOString()} | Level: ${this.getLevel()} | 
    HTTP Status: ${this.getHttpStatus()} | Method: ${this.getMethod()} | Endpoint: ${this.getEndpoint()} | 
    Message: ${this.getMessage()} | Request IP: ${this.getRequestIp()} | Origin: ${this.getOrigin()} | 
    User Agent: ${this.getUserAgent() ?? "N/A"} | Stack Trace: ${this.getStackTrace() ?? "N/A"} | 
    User ID: ${this.getUserId() ?? "N/A"}`;
}

}
