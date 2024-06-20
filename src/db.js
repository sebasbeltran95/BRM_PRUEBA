import mysql from "mysql2/promise";

export const conexion = mysql.createPool({
    host: '127.0.0.1',
    database: 'brm',
    user: 'root',
    password: ''
});