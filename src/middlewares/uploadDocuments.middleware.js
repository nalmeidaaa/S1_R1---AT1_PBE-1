import createMulter from "../config/upload.multer.js";

const uploadFile = createMulter({
    pasta: 'documentos',
    tiposPermitidos: [
        'application/pdf',
        'application/msword', // .doc - Formato antigo do word
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' //.docx
        ],
    tamanhoArquivo: 10 * 1024 * 1024 // 10MB
}).single('documento');

export default uploadFile;