import produtoModel from "../models/produto.model.js";

const produtoController = {
    // Cadastrar produto
    // cadastrarProduto: async (req, res) => {
    //     try {

    //         const { idCategoria, nomeProduto, valorProduto } = req.body;

    //         // Validação básica
    //         if (!idCategoria || !nomeProduto || !valorProduto) {
    //             return res.status(400).json({
    //                 message: "idCategoria, nomeProduto e valorProduto são obrigatórios"
    //             });
    //         }

    //         // Verifica se imagem foi enviada
    //         if (!req.file) {
    //             return res.status(400).json({
    //                 message: "A imagem do produto é obrigatória"
    //             });
    //         }

    //         const vinculoImagem = req.file.filename; // Nome gerado pelo multer

    //         const novoProduto = {
    //             idCategoria,
    //             nomeProduto,
    //             valorProduto,
    //             vinculoImagem,
    //             dataCad: new Date()
    //         };

    //         await produtoModel.insert(novoProduto);

    //         return res.status(201).json({
    //             message: "Produto cadastrado com sucesso"
    //         });



    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
    //     }
    // },

    cadastrarProduto: async (req, res) => {
        try {
            const { nomeProduto } = req.body;
            const valorProduto = Number(req.body.valorProduto);
            const idCategoria = Number(req.body.idCategoria);
            const vinculoImagem = req.file.path ? req.file.filename : null;

            // Validação básica de dados
            if (!nomeProduto || !valorProduto || !idCategoria) {
                return res.status(400).json({
                    message: "Dados incompletos ou inválidos"
                });
            }

            // Chamada da camada Model
            const idProduto = await produtoModel.criarProduto(
                nomeProduto,
                valorProduto,
                idCategoria,
                vinculoImagem
            );

            return res.status(201).json({
                message: "Produto criado com sucesso",
                id: idProduto
            });
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            return res.status(500).json({
                message: "Erro ao criar produto"
            });
        }
    },

    // Listar todos os produtos
    listarProdutos: async (req, res) => {
        try {
            const produtos = await produtoModel.selecionarTodos();
            return res.status(200).json(produtos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    },

    // Buscar produto por ID
    buscarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;
            const produto = await produtoModel.selecionarUm(idProduto);

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            return res.status(200).json(produto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    },

    // Editar produto
    editarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;
            const { idCategoria, nomeProduto, valorProduto, vinculoImagem } = req.body;

            if (!idCategoria || !nomeProduto || !valorProduto) {
                return res.status(400).json({ message: 'idCategoria, nomeProduto e valorProduto são obrigatórios' });
            }

            const produtoExistente = await produtoModel.selecionarUm(idProduto);
            if (!produtoExistente) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            await produtoModel.update({
                idProduto: idProduto,
                idCategoria,
                nomeProduto,
                valorProduto,
                vinculoImagem: vinculoImagem || produtoExistente.vinculoImagem
            });

            return res.status(200).json({ message: 'Produto atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    },

    // Excluir produto
    excluirProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;

            const produtoExistente = await produtoModel.selecionarUm(idProduto);
            if (!produtoExistente) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            await produtoModel.deletar(idProduto);

            return res.status(200).json({ message: 'Produto excluído com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    }
}

export default produtoController;
