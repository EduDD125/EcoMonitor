import { UUID } from 'crypto';
import { Reading } from '../../domain/leitura/reading';
import { IReadingRepository } from './IReadingRepository'
import { ReadingModel } from '../../models/ReadingModel';
import { measureMemory } from 'vm';

export class ReadingRepositoryPostgreSQL implements IReadingRepository {
    async save(reading: Reading): Promise<void> {
        await ReadingModel.create({
            id: reading.getId(),
            location: reading.getLocation(),
            dateTime: reading.getDateTime(),
            measurementType: reading.getMeasurementType(),
            valeu: reading.getValue(),
        });
    }
    async findAll(): Promise<Reading[]> {
        const readings = await ReadingModel.findAll();
        return readings.map( r => new Reading(
            r.location,
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
            reading.measurementType,
            reading.value,
            reading.id
        );
    }

    async delete(id: UUID): Promise<void> {
        await ReadingModel.destroy({ where: {id} });
    }

}