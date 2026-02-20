import { CatRepository } from '../../core/interfaces/cat.repository';

export class CatUseCase {
    constructor(private readonly catRepo: CatRepository) { }

    async executeGetBreeds() {
        return this.catRepo.findAllBreeds();
    }

    async executeGetById(id: string) {
        return this.catRepo.findBreedById(id);
    }

    async executeSearch(q: string) {
        return this.catRepo.searchBreeds(q);
    }

    async executeGetImages(breedId: string) {
        return this.catRepo.findImagesByBreed(breedId);
    }
}