// src/infrastructure/repositories/the-cat-api.adapter.ts
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
  // ... implementar el resto de métodos
}