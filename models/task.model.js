"use strict"

// get the client
const mysql = require('mysql2/promise');

/**
 * Devuelve la conexion a la DB // new PDO();
 */
const getConnection = async () => {
    return await mysql.createConnection({
        host:'localhost',
        user: 'root',
        database: 'db_tasks'
    });
};

exports.getAll = async () => {
    const connection = await getConnection();
    const [rows] = await connection.execute("SELECT * FROM tareas");

    return rows;
}

exports.get = async (id) => {
    const connection = await getConnection();
    const [rows] = await connection.execute("SELECT * FROM tareas WHERE id_tarea = ?", [id]);

    return rows[0];
}

exports.delete = async (id) => {
    const connection = await getConnection();
    const response = await connection.execute("DELETE FROM tareas WHERE id_tarea = ?", [id]);
    return response;
}