import pool from "../config/db.js";

const categoriaModel = {
    inserir: async (pCategoria) => {
        const sql = 'INSERT INTO Categoria (descricaoCategoria, dataCad) VALUES (?, ?)';
        const values = [pCategoria.descricaoCategoria, pCategoria.data];
        const [result] = await pool.execute(sql, values);
    },

    selecionarTodos: async () => {
        const sql = "SELECT * FROM Categoria ORDER BY idCategoria DESC";
        const [rows] = await pool.execute(sql);
        return rows;
    },

    selecionarUm: async (idCategoria) => {
        const sql = "SELECT * FROM Categoria WHERE idCategoria = ?";
        const [rows] = await pool.execute(sql, [idCategoria]);
        return rows[0];
    },

    atualizar: async (pCategoria) => {
        const sql = 'UPDATE Categoria SET descricaoCategoria = ? WHERE idCategoria = ?';
        const values = [pCategoria.descricaoCategoria, pCategoria.idCategoria];
        const [rows] = await pool.execute(sql, values);
        return rows;
    },

    // Excluir (Delete)
    deletar: async (idCategoria) => {
        const sql = 'DELETE FROM Categoria WHERE idCategoria = ?';
        const [rows] = await pool.execute(sql, [idCategoria]);
        return rows;
    }
}

export default categoriaModel;
