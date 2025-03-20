import { Request, Response } from "express";
import { CreateReadingUseCase } from "../../useCases/leitura/CreateReadingUseCase";
import { GetAllReadingsUseCase } from "../../useCases/leitura/GetAllReadingsUseCase";
import { GetReadingByIdUseCase } from "../../useCases/leitura/GetReadingByIdUseCase";
import { UpdateReadingUseCase } from "../../useCases/leitura/UpdateReadingUseCase";
import { DeleteReadingUseCase } from "../../useCases/leitura/DeleteReadingUseCase";
import { ReadingRepositoryPostgreSQL } from "../../repositories/reading/ReadingRepositoryPostgreSQL";
import { LogRepositoryPostgreSQL } from "../../repositories/logs/LogRepositoryPostgreSQL";
import { CreateReadingDTO } from "../../dtos/reading/CreateReadingDTO";
import { UpdateReadingDTO } from "../../dtos/reading/UpdateReading";
import { DeleteReadingDTO } from "../../dtos/reading/DeleteReadingDTO";
import { FilterReadingsUseCase } from "../../useCases/leitura/FilterReadingsUseCase";
import { CalculateReadingStatisticsUseCase } from "../../useCases/leitura/CalculateReadingStatisticsUseCase";

export class ReadingController {
    private readingRepository = new ReadingRepositoryPostgreSQL();
    private logRepository = new LogRepositoryPostgreSQL();

    private createReadingUseCase = new CreateReadingUseCase(this.readingRepository, this.logRepository);
    private getAllReadingsUseCase = new GetAllReadingsUseCase(this.readingRepository, this.logRepository);
    private getReadingByIdUseCase = new GetReadingByIdUseCase(this.readingRepository, this.logRepository);
    private updateReadingUseCase = new UpdateReadingUseCase(this.readingRepository, this.logRepository);
    private deleteReadingUseCase = new DeleteReadingUseCase(this.readingRepository, this.logRepository);
    private filterReadingsUseCase = new FilterReadingsUseCase(this.readingRepository, this.logRepository);
    private calculateReadingStatisticsUseCase = new CalculateReadingStatisticsUseCase(this.readingRepository, this.logRepository)



    async getStatistics(req: any, res: any) {
        try {
            const requestIp = req.ip;
            const userAgent = req.get("User-Agent") || "";

            const readings = await this.calculateReadingStatisticsUseCase.execute(requestIp as string, userAgent); // todo: pensar como pegar id de usuário para parametro UserID
            return res.status(200).json(readings);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }

    async create(req: any, res: any) {
        try {
            const { location, measurementType, dateTime, value } = req.body;
            const requestIp = req.ip;
            const userAgent = req.get("User-Agent") || "";

            const createReadingDTO = { location, measurementType, dateTime, value } as CreateReadingDTO;

            const reading = await this.createReadingUseCase.execute(createReadingDTO, requestIp as string, userAgent); // todo: pensar se assercao de tipo é problematico

            return res.status(201).json(reading);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getByFilter(req: any, res: any) {
        try {
            const { locations, measurementTypes } = req.query;
            const requestIp = req.ip;
            const userAgent = req.get("User-Agent") || "";


            console.log("\n\controller\n\n", locations, measurementTypes, "\n\n");


            const locationArray = locations ? locations.split(",") : [];
            const measurementTypeArray = measurementTypes ? measurementTypes.split(",") : [];

            const filters = {
                locations: locationArray.length > 0 ? locationArray : undefined,
                measurementTypes: measurementTypeArray.length > 0 ? measurementTypeArray : undefined,
            };

            const readings = await this.filterReadingsUseCase.execute(filters, requestIp as string, userAgent); // todo: pensar como pegar id de usuário para parametro UserID
            return res.status(200).json(readings);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }

    async getAll(req: any, res: any) {
        try {
            const requestIp = req.ip;
            const userAgent = req.get("User-Agent") || "";

            const readings = await this.getAllReadingsUseCase.execute(requestIp as string, userAgent); // todo: pensar como pegar id de usuário para parametro UserID
            return res.status(200).json(readings);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }

    async getById(req: any, res: any) {
        try {
            const { id } = req.params;
            const requestIp = req.ip;
            const userAgent = req.get("User-Agent") || "";

            const reading = await this.getReadingByIdUseCase.execute(id, requestIp as string, userAgent); // todo: pensar como pegar id de usuário para parametro UserID
            if (!reading) {
                return res.status(404).json({ error: `Reading with ID ${id} not found` });
            }

            return res.status(200).json(reading);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req: any, res: any) {
        try {
            const { id } = req.params;
            const { location, measurementType, dateTime, value } = req.body;
            const requestIp = req.ip;
            const userAgent = req.get("User-Agent") || "";

            const updateReadingDTO = { id, location, measurementType, dateTime, value } as UpdateReadingDTO;

            const updatedReading = await this.updateReadingUseCase.execute(updateReadingDTO, requestIp as string, userAgent);
            return res.status(200).json(updatedReading);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req: any, res: any) {
        try {
            const { id } = req.params;
            const requestIp = req.ip;
            const userAgent = req.get("User-Agent") || "";

            const deleteReadingDTO = { id } as DeleteReadingDTO;

            await this.deleteReadingUseCase.execute( deleteReadingDTO, requestIp as string, userAgent);
            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}
