"use strict"

// get the client
const mysql = require('mysql2/promise');

/**
 * Devuelve la conexion a la DB // new PDO();
 */
const getConnection = async () => {
    return await mysql.createConnection({
        host: process.env.MYSQL_DB || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        database: 'db_tasks',
        password: process.env.MYSQL_PASS || ''
    });
};

const deploy = async () =>{
    const connection = await getConnection();
    await connection.execute(`
    CREATE TABLE tareas (
        id_tarea int(11) NOT NULL,
        titulo varchar(200) NOT NULL,
        descripcion varchar(400) DEFAULT NULL,
        prioridad int(11) NOT NULL,
        finalizada tinyint(1) NOT NULL
      );
      `);

    await connection.execute(`
    INSERT INTO tareas VALUES
        (1, 'Poder completar la clase', 'Venimos bien pero es larga', 5, 0),
        (12, 'Hardcoding insert', 'Descrpcion', 1, 1),
        (13, 'sdfgdgf', 'sdgfdsg', 1, 1),
        (14, 'Hardcoding insert', 'Descrpcion', 1, 0),
        (16, 'test2', 'test2', 2, 0),
        (17, 'test3', 'test3', 2, 1),
        (18, 'test4', 'test4', 3, 1),
        (19, 'test4', 'test4', 3, 1),
        (20, 'sdfsdf', 'sdfsdfs', 3, 1),
        (21, 'asdasd', 'adsasdas', 4, 1);
    `);

}

exports.getAll = async () => {
    try{
        const connection = await getConnection();
        const [rows] = await connection.execute("SELECT * FROM tareas");
    
        return rows;    
    }catch(error){
        deploy();
    }
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