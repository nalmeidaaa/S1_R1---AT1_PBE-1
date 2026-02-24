import produtoController from "../controllers/produto.controller.js";
import { Router } from "express";

const produtoRoutes = Router();

produtoRoutes.post('/produtos', produtoController.cadastrarProduto);
produtoRoutes.get('/produtos', produtoController.listarProdutos);
produtoRoutes.get('/produtos/:id', produtoController.buscarProduto);
produtoRoutes.put('/produtos/:id', produtoController.editarProduto);
produtoRoutes.delete('/produtos/:id', produtoController.excluirProduto);

export default produtoRoutes;
