// src/core/interfaces/cat.repository.ts
export interface CatRepository {
  findAllBreeds(): Promise<any[]>;
  findById(id: string): Promise<any>;
  search(query: string): Promise<any[]>;
  findImagesByBreed(id: string): Promise<any[]>;
}