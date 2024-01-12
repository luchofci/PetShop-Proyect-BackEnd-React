const express = require('express');
const { route } = require('../app');
//Iniciamos el objeto router para poder definir rutas
const router = express.Router();
const userController = require('../controllers/user.controllers')

// Definimos ruta obtener todos los usuarios GET
router.get('/users/:id?', userController.getUser);

// Agregamos un nuevo usuario POST
router.post('/users', userController.createUser);

// Borrar un usuario DELETE
//La route no es solo /user sino que tambien espera un IDuser
router.delete('/users/:idUser', userController.deleteUser);
//Esta es una copioa del de arriba pero ejemplo con 2 parametros. Asimismo el signo de pregunta al final hace q ese parametro en particular noi sea obligatorio.
// router.delete('/users/:idUser/:active?', userController.deleteUser);



// Actualizar un usuario PUT
router.put('/users/:id', userController.updateUser);
//Los query params, no tienen orden.

//Login de usuario 
router.post('/login', userController.login);



// Obtener un usuario especifico GET
// router.get('/users/:id', userController.getUser)



// router.get('/test', userController.hellowController)



//Exportamos router para pdoer usar rutas en app.js
module.exports = router;