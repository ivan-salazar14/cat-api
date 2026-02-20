import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { CatController } from './infrastructure/controllers/cat.controller';
import { TheCatApiAdapter } from './infrastructure/adapters/cat_api.adapter';
import { CatUseCase } from './application/usecases/cat.use-case';
import { UserController } from './infrastructure/controllers/user.controller';

const app = express();
app.use(express.json());

// Inyección de Dependencias manual (Clean Architecture)
const catAdapter = new TheCatApiAdapter();
const catUseCase = new CatUseCase(catAdapter)
const catController = new CatController(catUseCase);
const userController = new UserController();

// Rutas Gatos
app.get('/breeds', (req: Request, res: Response) => catController.getAll(req, res));
app.get('/breeds/search', (req: Request, res: Response) => catController.search(req, res));
app.get('/imagesbybreedid', (req: Request, res: Response) => catController.getImages(req, res));

// Rutas Usuarios
app.get('/register', (req: Request, res: Response) => userController.register(req, res));
app.get('/login', (req: Request, res: Response) => userController.login(req, res));

// Conexión Mongo y Start
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cat-api';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});
