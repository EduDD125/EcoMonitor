import { Reading } from "../../domain/leitura/reading";
import { ILogRepository } from "../../repositories/logs/ILogRepository";
import { IReadingRepository } from "../../repositories/reading/IReadingRepository";
import { LogService } from "../../services/LogService";

export class CalculateReadingStatisticsUseCase {
    constructor(
        private readingRepository: IReadingRepository,
        private logRepository: ILogRepository,
    ) {}
  
    async execute (requestIp: string, userAgent?: string, userId?: string): Promise<any | null> {
      const logService = new LogService(this.logRepository);
      
              try {
                  const stats = await this.readingRepository.getStatistics();
      
                  if (!stats) throw new Error("None statistics data were produced")
                  
                  await logService.logGetStatisticSuccess("Reading", "/api/leituras", requestIp, userAgent, userId);
                  return stats;
              } catch (error: any) {
                  await logService.logUGetStatisticError("Reading", "/api/leituras", requestIp, error.stack, userAgent, userId);
      
                  throw error;
              }
    }
  }
  