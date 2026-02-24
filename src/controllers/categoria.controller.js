import categoriaModel from "../models/categoria.model.js";

const categoriaController = {
    // Cadastrar categoria
    cadastrarCategoria: async (req, res) => {
        try {
            const { descricaoCategoria } = req.body;

            if (!descricaoCategoria) {
                return res.status(400).json({ message: 'Descrição da categoria é obrigatória' });
            }

            const result = await categoriaModel.insert({ descricaoCategoria });

            if (result.insertId > 0) {
                return res.status(201).json({ 
                    message: 'Categoria cadastrada com sucesso',
                    idCategoria: result.insertId
                });
            }
            return res.status(400).json({ message: 'Erro ao cadastrar categoria' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    },

    // Selecionar todas as categorias
    listarCategorias: async (req, res) => {
        try {
            const categorias = await categoriaModel.selecionarTodos();
            return res.status(200).json(categorias);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    },

    // Selecionar categoria por ID
    buscarCategoria: async (req, res) => {
        try {
            const { id } = req.params;
            const categoria = await categoriaModel.selecionarUm(id);

            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            return res.status(200).json(categoria);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    },

    // Editar categoria
    editarCategoria: async (req, res) => {
        try {
            const { id } = req.params;
            const { descricaoCategoria } = req.body;

            if (!descricaoCategoria) {
                return res.status(400).json({ message: 'Descrição da categoria é obrigatória' });
            }

            const categoriaExistente = await categoriaModel.selecionarUm(id);
            if (!categoriaExistente) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            await categoriaModel.update({ idCategoria: id, descricaoCategoria });

            return res.status(200).json({ message: 'Categoria atualizada com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    },

    // Excluir categoria
    excluirCategoria: async (req, res) => {
        try {
            const { id } = req.params;

            const categoriaExistente = await categoriaModel.selecionarUm(id);
            if (!categoriaExistente) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            await categoriaModel.delete(id);

            return res.status(200).json({ message: 'Categoria excluída com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro no servidor', errorMessage: error.message });
        }
    }
}

export default categoriaController;
