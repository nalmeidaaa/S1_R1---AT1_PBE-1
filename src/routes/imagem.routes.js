import imagemController from "../controllers/imagem.controller.js";
import uploadFile from "../middlewares/uploadDocuments.middleware.js";
import uploadImage from "../middlewares/uploadImage.middleware.js";
import { Router } from "express";

const imagemRoutes = Router();

imagemRoutes.post('/produtos/imagens', uploadImage, imagemController.upload);
imagemRoutes.post('/produtos/documentos', uploadFile, imagemController.upload);

export default imagemRoutes;
