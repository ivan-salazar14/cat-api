import axios from 'axios';
import { CatRepository } from '../../core/interfaces/cat.repository';

export class TheCatApiAdapter implements CatRepository {
  private readonly baseUrl = 'https://api.thecatapi.com/v1';
  private readonly apiKey = process.env.CAT_API_KEY;

  async findAllBreeds() {
    const { data } = await axios.get(`${this.baseUrl}/breeds`, {
      headers: { 'x-api-key': this.apiKey }
    });
    return data;
  }

  async findBreedById(id: string): Promise<any> {
    const { data } = await axios.get(`${this.baseUrl}/breeds/${id}`);
    return data;
  }

  async searchBreeds(query: string): Promise<any[]> {
    // La API de gatos usa el parámetro 'q' para buscar razas
    const { data } = await axios.get(`${this.baseUrl}/breeds/search?q=${query}`);
    return data;
  }

  async findImagesByBreed(breedId: string): Promise<any[]> {
    // Buscamos imágenes filtrando por el ID de la raza
    const { data } = await axios.get(`${this.baseUrl}/images/search?breed_ids=${breedId}&limit=10`);
    return data;
  }
}