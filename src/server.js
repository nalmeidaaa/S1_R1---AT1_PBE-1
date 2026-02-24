import express from "express";
import path from 'path';
import 'dotenv/config';

import imagemRoutes from "./routes/imagem.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import produtoRoutes from "./routes/produto.routes.js";

const app = express();

// Middleware para parsing JSON
app.use(express.json());

// Routes
app.use('/', imagemRoutes);
app.use('/', categoriaRoutes);
app.use('/', produtoRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`);
});
