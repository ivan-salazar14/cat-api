// src/core/interfaces/cat.repository.ts
export interface CatRepository {
  findAllBreeds(): Promise<any[]>;
  findBreedById(id: string): Promise<any>;
  searchBreeds(query: string): Promise<any[]>;
  findImagesByBreed(breedId: string): Promise<any[]>;
}