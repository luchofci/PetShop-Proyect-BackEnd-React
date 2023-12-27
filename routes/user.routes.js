const express = require('express');
const { route } = require('../app');
//Iniciamos el objeto router para poder definir rutas
const router = express.Router();
const userController = require('../controllers/user.controllers')

router.get('/test', userController.hellowController)



//Exportamos router para pdoer usar rutas en app.js
module.exports = router;