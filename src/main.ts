import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { CatController } from './infrastructure/controllers/cat.controller';
import { TheCatApiAdapter } from './infrastructure/adapters/cat_api.adapter';
import { CatUseCase } from './application/usecases/cat.use-case';
import { UserController } from './infrastructure/controllers/user.controller';

const app = express();
app.use(express.json());

const catAdapter = new TheCatApiAdapter();
const catUseCase = new CatUseCase(catAdapter)
const catController = new CatController(catUseCase);
const userController = new UserController();

import { authMiddleware } from './infrastructure/middleware/auth.middleware';

app.get('/breeds', authMiddleware, (req: Request, res: Response) => catController.getAll(req, res));
app.get('/breeds/search', authMiddleware, (req: Request, res: Response) => catController.search(req, res));
app.get('/imagesbybreedid', authMiddleware, (req: Request, res: Response) => catController.getImages(req, res));
app.get('/register', (req: Request, res: Response) => userController.register(req, res));
app.get('/login', (req: Request, res: Response) => userController.login(req, res));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cat-api';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
