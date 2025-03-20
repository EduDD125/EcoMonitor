import { UUID } from "crypto";
import { Reading } from "../../domain/leitura/reading";
import { ReadingModel } from "../../models/ReadingModel";

export interface IReadingRepository {
    save(reading: Reading): Promise<void>;
    findAll(): Promise<Reading[]>;
    findByFilter(filters: { locations?: string[]; measurementTypes?: string[] }): Promise<Reading[] | null>
    findById(id: UUID): Promise<Reading | null>;
    getStatistics(): Promise<any | null>;
    delete(id: UUID): Promise<number>;
    update(reading: Reading): Promise<[number, Reading[]]>;
}