import produtoModel from "../models/produto.model.js";

const produtoController = {
    // Cadastrar produto
    cadastrarProduto: async (req, res) => {
        try {
            const { idCategoria, nomeProduto, valorProduto } = req.params;
            
            const { vinculoImagem } = "teste"

            if (!idCategoria || !nomeProduto || !valorProduto) {
                return res.status(400).json({ message: 'idCategoria, nomeProduto e valorProduto são obrigatórios' });
            }

            const result = await produtoModel.inserir({
                idCategoria,
                nomeProduto,
                valorProduto,
                vinculoImagem: vinculoImagem || ''
            });

            return res.status(400).json({ message: 'Erro ao cadastrar produto' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
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
