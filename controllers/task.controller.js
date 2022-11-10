"use strict"

const TaskModel = require('../models/task.model');

/**
 * Devuelve la lista de tareas
 */
exports.getAll = async (req, res) => {
    let tasks = await TaskModel.getAll();
    res.send(tasks);
}

exports.get = async (req, res) => {
    let id = req.params.id;
    let task = await TaskModel.get(id);

    if (task)
        res.send(task);
    else 
        res.status(404).send(`La tarea con el id=${id} no existe`);
}

exports.delete = async (req, res) => {
    let id = req.params.id;
    let task = await TaskModel.get(id);

    if (task) {
        let r = await TaskModel.delete(id);
        res.send(`La tarea con el id=${id} se eliminó`);
    } else {
        res.status(404).send(`La tarea con el id=${id} no existe`);
    }
}

