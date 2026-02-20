import { describe, it, expect, vi } from 'vitest';
import { CatUseCase } from '../src/application/usecases/cat.use-case';

describe('CatUseCase', () => {
    it('should filter breeds by name correctly', async () => {
        const mockRepo = {
            searchBreeds: vi.fn().mockResolvedValue([{ id: 'beng', name: 'Bengali' }])
        };
        const useCase = new CatUseCase(mockRepo as any);
        const result = await useCase.executeSearch('Bengali');

        expect(result[0].id).toBe('beng');
        expect(mockRepo.searchBreeds).toHaveBeenCalledWith('Bengali');
    });
});