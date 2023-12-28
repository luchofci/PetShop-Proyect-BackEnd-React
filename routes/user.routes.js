const express = require('express');
const { route } = require('../app');
//Iniciamos el objeto router para poder definir rutas
const router = express.Router();
const userController = require('../controllers/user.controllers')

// Definimos ruta obtener todos los usuarios GET
router.get('/users', userController.getUser);

// Agregamos un nuevo usuario POST
router.post('/users', userController.createUser);

// Borrar un usuario DELETE
router.delete('/users', userController.deleteUser);

// Actualizar un usuario PUT
router.put('/users', userController.updateUser);

// Obtener un usuario especifico GET




// router.get('/test', userController.hellowController)



//Exportamos router para pdoer usar rutas en app.js
module.exports = router;