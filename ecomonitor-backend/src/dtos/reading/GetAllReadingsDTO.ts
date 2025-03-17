import { GetReadingDTO } from "./GetReadingDTO";

export interface GetAllReadingsDTO {
    readings: GetReadingDTO[];
    total: number;
}