import { UUID } from "crypto";
import { Reading } from "../../domain/leitura/reading";
import { ReadingModel } from "../../models/ReadingModel";

export interface IReadingRepository {
    save(reading: Reading): Promise<void>;
    findAll(): Promise<Reading[]>;
    findById(id: UUID): Promise<Reading | null>;
    delete(id: UUID): Promise<number>;
    update(reading: Reading): Promise<[number, Reading[]]>;
}