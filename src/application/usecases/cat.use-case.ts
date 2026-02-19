import { CatRepository } from '../../core/interfaces/cat.repository';

export class CatUseCase {
    constructor(private readonly catRepo: CatRepository) { }

    async executeGetBreeds() { return this.catRepo.getBreeds(); }
    async executeSearch(q: string) { return this.catRepo.searchBreeds(q); }
    async executeGetImages(id: string) { return this.catRepo.getImagesByBreed(id); }
}