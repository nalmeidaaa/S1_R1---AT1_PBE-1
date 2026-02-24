import pool from "../config/db.js";

const produtoModel = {
    inserir: async (pProduto) => {
        const sql = 'INSERT INTO Produtos (idCategoria, nomeProduto, valorProduto, vinculoImagem, dataCad) VALUES (?,?,?,?, CURDATE())';
        const values = [pProduto.idCategoria, pProduto.nomeProduto, pProduto.valorProduto, pProduto.vinculoImagem];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },

    selecionarTodos: async () => {
        const sql = "SELECT p.*, c.descricaoCategoria FROM Produtos p LEFT JOIN Categoria c ON p.idCategoria = c.idCategoria ORDER BY p.idProduto DESC";
        const [rows] = await pool.execute(sql);
        return rows;
    },

    selecionarUm: async (idProduto) => {
        const sql = "SELECT p.*, c.descricaoCategoria FROM Produtos p LEFT JOIN Categoria c ON p.idCategoria = c.idCategoria WHERE p.idProduto = ?";
        const [rows] = await pool.execute(sql, [idProduto]);
        return rows[0];
    },

    atualizar: async (pProduto) => {
        const sql = 'UPDATE Produtos SET idCategoria = ?, nomeProduto = ?, valorProduto = ?, vinculoImagem = ? WHERE idProduto = ?';
        const values = [pProduto.idCategoria, pProduto.nomeProduto, pProduto.valorProduto, pProduto.vinculoImagem, pProduto.idProduto];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },
    deletar: async (idProduto) => {
        const sql = 'DELETE FROM Produtos WHERE idProduto = ?';
        const [rows] = await pool.execute(sql, [idProduto]);
        return rows;
    }
}

export default produtoModel;
