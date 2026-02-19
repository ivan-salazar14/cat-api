import express from 'express';
import mongoose from 'mongoose';
import { CatController } from './infrastructure/controllers/cat.controller';
import { TheCatApiAdapter } from './infrastructure/adapters/cat-api.adapter';

const app = express();
app.use(express.json());

// Inyección de Dependencias manual (Clean Architecture)
const catAdapter = new TheCatApiAdapter();
const catController = new CatController(catAdapter);

// Rutas Gatos
app.get('/breeds', (req, res) => catController.getAll(req, res));
app.get('/breeds/search', (req, res) => catController.search(req, res));
app.get('/imagesbybreedid', (req, res) => catController.getImages(req, res));

// Conexión Mongo y Start
mongoose.connect(process.env.MONGO_URI!).then(() => {
    app.listen(3000, () => console.log('🔥 Server running on port 3000'));
});