import createMulter from "../config/upload.multer.js";

const uploadImage = createMulter({
    pasta: 'imagens',
    tiposPermitidos: ['image/png', 'image/jpeg', 'image/jpg'],
    tamanhoArquivo: 10 * 1024 * 1024 // 10MB
}).single('image');

export default uploadImage;