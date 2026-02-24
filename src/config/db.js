import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT_MYSQL,
    waitForConnections: true, // Se eu tiver mais conexões do que estou liberando aqui, vou permitir uma fila para conectar
    connectionLimit: 10, // Máximo de conexões por vez que estou liberando
    queueLimit: 0, // O máximo de usuários que permito na fila (0 = infinito)
});

export default pool;