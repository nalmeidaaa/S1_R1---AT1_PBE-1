const imagemController = {
    upload: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Arquivo não foi enviado' });
            }
            
            // Retorna o nome do arquivo para ser salvo no produto
            return res.status(200).json({ 
                message: 'Upload realizado com sucesso',
                nomeArquivo: req.file.filename
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
}

export default imagemController;
