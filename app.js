const express =  require('express')
const app = express();

const userRoutes = require('./routes/user.routes');

//Middlewares -  Esto es importante para recordarle a la app que sabe leer Json (cuando se realice la request, el servidor tenga la habilidad de entender el body q ue estoy recibiendo.-)
app.use(express.json());


// Aplicamos o integramos las rutas a nuestros server
app.use(userRoutes)


module.exports = app;