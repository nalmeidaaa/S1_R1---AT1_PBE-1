import pool from "../config/db.js";

const categoriaModel = {
    inserir: async (pCategoria) => {
        const sql = 'INSERT INTO Categoria (descricaoCategoria) VALUES (?)';
        const values = [pCategoria.descricaoCategoria];
        const [rows] = await pool.execute(sql, values);
        return rows;
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
