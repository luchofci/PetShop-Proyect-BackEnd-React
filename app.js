const express =  require('express')
const app = express();
const cors = require('cors')

const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes')

//Middlewares -  Esto es importante para recordarle a la app que sabe leer Json (cuando se realice la request, el servidor tenga la habilidad de entender el body que estoy recibiendo.-)
app.use(express.json()); //Cuando venga un re.body poder leerlo
app.use(express.urlencoded({extended:true}));
app.use(cors());

// Aplicamos o integramos las rutas a nuestros server
app.use([userRoutes, productRoutes]) //Esto es para que la app use las rutas definidas en userRoutes

module.exports = app;


