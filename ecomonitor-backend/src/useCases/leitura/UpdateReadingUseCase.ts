import { UUID } from "crypto";
import { Reading } from "../../domain/leitura/reading";
import { UpdateReadingDTO } from "../../dtos/reading/UpdateReading";
import { ILogRepository } from "../../repositories/logs/ILogRepository";
import { IReadingRepository } from "../../repositories/reading/IReadingRepository";
import { LogService } from "../../services/LogService";
import { isValidUUID } from "../../utils/validateUUID";

export class UpdateReadingUseCase {
    constructor(
            private readingRepository: IReadingRepository,
            private logRepository: ILogRepository
        ) {}
    
        async execute(data: UpdateReadingDTO, requestIp: string, userAgent?: string, userId?: string): Promise<Reading | null> {
            const logService = new LogService(this.logRepository);
            
            if (!isValidUUID(data.id)) {
                await logService.logInvalidUUIDFormat("Reading", data.id, "api/leituras", requestIp, userAgent, userId);
                throw new Error("Invalid UUID format.");
            }
    
            const readingId: UUID = data.id as UUID;
            
            const reading = new Reading(
                data.location,
                data.measurementType,
                data.value,
                readingId,
            );

            try {
                const readingToUpdate = this.readingRepository.findById(readingId);
                
                if (!readingToUpdate) throw new Error(`Reading item with id ${readingId} not found`); //repensar sequencia de acionamento de logs de erros - usar log de not found ou usar log de erro na atualizacao? representar erro no use case ou nos processos internos do banco de dados?

                const [affectedCount, updatedReadings] = await this.readingRepository.update(reading);
                
                if (affectedCount > 1) throw new Error(`Failure updating Reading item with id ${readingId}. Database informs that any row was updated.`);

                await logService.logDeletionSuccess("Reading", "api/leituras",requestIp, userAgent, userId);  
                return updatedReadings[0];
            } catch (error: any) {
                await logService.logUpdateError("Reading", "api/leituras", readingId, requestIp, error.stack, userAgent, userId);
                throw error; 
            }
        }
}