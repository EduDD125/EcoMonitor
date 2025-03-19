import { UUID } from 'crypto';
import { Reading } from '../../domain/leitura/reading';
import { IReadingRepository } from './IReadingRepository'
import { ReadingModel } from '../../models/ReadingModel';

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
        const readings = await ReadingModel.findAll();
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

    async delete(id: UUID): Promise<number> {
        return await ReadingModel.destroy({ where: {id} });
    }

}