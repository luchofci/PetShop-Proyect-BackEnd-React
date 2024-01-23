const express =  require('express')
const app = express();
const cors = require('cors')

const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes')

//Middlewares -  Esto es importante para recordarle a la app que sabe leer Json (cuando se realice la request, el servidor tenga la habilidad de entender el body q ue estoy recibiendo.-)
app.use(express.json());
app.use(cors());

// Aplicamos o integramos las rutas a nuestros server
app.use([userRoutes, productRoutes])

module.exports = app;


