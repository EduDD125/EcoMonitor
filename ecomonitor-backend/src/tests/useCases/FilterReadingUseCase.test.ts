import { FilterReadingsUseCase } from "../../../src/useCases/leitura/FilterReadingsUseCase";
import { IReadingRepository } from "../../../src/repositories/reading/IReadingRepository";
import { ILogRepository } from "../../../src/repositories/logs/ILogRepository";
import { Reading } from "../../../src/domain/leitura/reading";
import { randomUUID } from "crypto";

// Criamos mocks dos repositórios
const mockReadingRepository: jest.Mocked<IReadingRepository> = {
    findByFilter: jest.fn(),
    save: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
};

const mockLogRepository: jest.Mocked<ILogRepository> = {
    save: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
};

// Criamos uma instância do caso de uso com os mocks
const filterReadingsUseCase = new FilterReadingsUseCase(mockReadingRepository, mockLogRepository);

describe("FilterReadingsUseCase", () => {
    const mockReadings: Reading[] = [
        new Reading("São Paulo", new Date(), "Temperatura", "30", randomUUID()),
        new Reading("Rio de Janeiro", new Date(), "Humidade do Ar", "80", randomUUID()),
    ];

    it("deve retornar leituras filtradas com sucesso", async () => {
        // Configuramos o repositório para retornar leituras simuladas
        mockReadingRepository.findByFilter.mockResolvedValue(mockReadings);

        const filters = { locations: ["São Paulo"], measurementTypes: ["Temperatura"] };
        const result = await filterReadingsUseCase.execute(filters, "127.0.0.1", "Mozilla/5.0", "user123");

        expect(result?.every( reading => reading.getLocation() === 'São Paulo')).toBeTruthy();
        
        expect(mockReadingRepository.findByFilter).toHaveBeenCalledWith(filters);
        expect(mockLogRepository.save).toHaveBeenCalled(); // Confirma que o log foi chamado
    });

    it("deve lançar erro quando nenhuma leitura for encontrada", async () => {
        mockReadingRepository.findByFilter.mockResolvedValue([]);

        const filters = { locations: ["Desconhecido"], measurementTypes: ["Nada"] };

        await expect(filterReadingsUseCase.execute(filters, "127.0.0.1"))
            .rejects.toThrow("There're no Readings register in the system.");

        expect(mockLogRepository.save).toHaveBeenCalled(); // Confirma que o log de erro foi registrado
    });
});
