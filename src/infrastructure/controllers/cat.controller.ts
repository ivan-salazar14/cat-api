// src/infrastructure/controllers/cat.controller.ts
import { Request, Response } from 'express';
import { CatUseCase } from '../../application/usecases/cat.use-case';

export class CatController {
    constructor(private readonly catUseCase: CatUseCase) { }

    // GET /breeds
    async getAll(req: Request, res: Response) {
        try {
            const breeds = await this.catUseCase.executeGetBreeds();
            return res.status(200).json(breeds);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching breeds', error });
        }
    }

    // GET /breeds/:breed_id
    async getById(req: Request, res: Response) {
        try {
            const { breed_id } = req.params;
            const breed = await this.catUseCase.executeGetById(breed_id as string);
            if (!breed) return res.status(404).json({ message: 'Breed not found' });
            return res.status(200).json(breed);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching breed', error });
        }
    }

    // GET /breeds/search?q=...
    async search(req: Request, res: Response) {
        try {
            const { q } = req.query;
            const results = await this.catUseCase.executeSearch(String(q || ''));
            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json({ message: 'Error in search', error });
        }
    }

    // GET /imagesbybreedid?breed_id=...
    async getImages(req: Request, res: Response) {
        try {
            const { breed_id } = req.query;
            if (!breed_id) return res.status(400).json({ message: 'breed_id is required' });

            const images = await this.catUseCase.executeGetImages(String(breed_id));
            return res.status(200).json(images);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching images', error });
        }
    }
}