const express = require('express');
const { route } = require('../app');
//Iniciamos el objeto router para poder definir rutas
const router = express.Router();
const userController = require('../controllers/user.controller')
const jwtVerify = require("../middlewares/isAuth");
const { isAdmin } = require('../middlewares/isAdmin');
const uploadImage = require('../middlewares/uploadUserImage')

// Definimos ruta obtener todos los usuarios GET
router.get('/users/:id?', userController.getUser);

// Agregamos un nuevo usuario POST
router.post('/users',uploadImage, [jwtVerify, isAdmin], userController.createUser);

// Borrar un usuario DELETEEE
//La route no es solo /user sino que tambien espera un IDuser
router.delete('/users/:idUser', [jwtVerify, isAdmin], userController.deleteUser);
//Esta es una copioa del de arriba pero ejemplo con 2 parametros. Asimismo el signo de pregunta al final hace q ese parametro en particular noi sea obligatorio.
// router.delete('/users/:idUser/:active?', userController.deleteUser);

// Actualizar un usuario PUT
router.put('/users/:id', uploadImage,[jwtVerify, uploadImage], userController.updateUser);

//Los query params, no tienen orden.
//Login de usuario 
router.post('/login', userController.login);

// Busqueda de Usuario (No es obligatorio en el final)
router.get('/users/search/:search', userController.searchUser)
//Exportamos router para pdoer usar rutas en app.js
module.exports = router;




