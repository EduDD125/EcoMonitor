import { UUID } from 'crypto';
import { Reading } from '../../domain/leitura/reading';
import { IReadingRepository } from './IReadingRepository'
import { ReadingModel } from '../../models/ReadingModel';
import { Op } from 'sequelize';
import sequelize from 'sequelize';

export class ReadingRepositoryPostgreSQL implements IReadingRepository {  
    async save(reading: Reading): Promise<void> {
        await ReadingModel.create({
            id: reading.getId(),
            location: reading.getLocation(),
            dateTime: reading.getDateTime(),
            measurementType: reading.getMeasurementType(),
            value: reading.getValue(),
        });
    }
    async update(reading: Reading): Promise<[number, Reading[]]> {
        const readingId = reading.getId();
        const [affectedCount, updatedReadingsModels] = await ReadingModel.update(
            {
                location: reading.getLocation(),
                dateTime: reading.getDateTime(),
                measurementType: reading.getMeasurementType(),
                value: reading.getValue(),
            },
            {
                where: { id: readingId },
                returning: true, // Retorna os registros atualizados
            }
        );

        const updatedReadings = updatedReadingsModels.map( r => new Reading(
            r.location,
            new Date(r.dateTime),
            r.measurementType,
            r.value,
            r.id,
        ));

        return [affectedCount, updatedReadings];
    }
    async findAll(): Promise<Reading[]> {
        const readings = await ReadingModel.findAll({
            order: [['dateTime', 'DESC']]
        });
        return readings.map( r => new Reading(
            r.location,
            new Date(r.dateTime),
            r.measurementType,
            r.value,
            r.id
        ));
    }

    async findById(id: UUID): Promise<Reading | null> {
        const reading = await ReadingModel.findByPk(id);
        if (!reading) return null;

        return new Reading(
            reading.location,
            new Date(reading.dateTime),
            reading.measurementType,
            reading.value,
            reading.id
        );
    }

    async findByFilter(filters: { locations?: string[]; measurementTypes?: string[]; }): Promise<Reading[]> {
        const whereClause: any = {};
        
        if (filters.locations && filters.locations.length > 0) {
            whereClause.location = { [Op.in]: filters.locations }; 
        }

        if (filters.measurementTypes && filters.measurementTypes.length > 0) {
            whereClause.measurementType = { [Op.in]: filters.measurementTypes };
        }

        const readings = await ReadingModel.findAll({ 
            where: whereClause,
            order: [['dateTime', 'DESC']]
        });
        
        return readings.map( r => new Reading(
            r.location,
            new Date(r.dateTime),
            r.measurementType,
            r.value,
            r.id
        ));
    }

    async getStatistics() {
        return await ReadingModel.findAll({
          attributes: [
            "measurementType",
            [sequelize.fn("AVG", sequelize.col("value")), "avg_value"],
            [sequelize.fn("MAX", sequelize.col("value")), "max_value"],
            [sequelize.fn("MIN", sequelize.col("value")), "min_value"]
          ],
          group: ["measurementType"],
        });
      }
    
      

    async delete(id: UUID): Promise<number> {
        return await ReadingModel.destroy({ where: {id} });
    }

}