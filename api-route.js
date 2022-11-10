"use strict"

// controllers
const TaskController = require('./controllers/task.controller');

const express = require('express');
const app = express(); // new Router(); seria como el router
const port = 3000;

// tabla de ruteo
app.get('/', (req, res) => { // (http_request, http_response)
    res.send('Hello!' ); // echo 'Hello World!'
});

// app.get('/tasks', (req, res) => TaskController.getAll(req, res) );
app.get('/tasks', TaskController.getAll);
app.get('/tasks/:id', TaskController.get);
app.delete('/tasks/:id', TaskController.delete);


// se queda escuchando el puerto (levanta el servidor web)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
