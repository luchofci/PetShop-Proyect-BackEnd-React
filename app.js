const express = require('express');
const app = express();
const cors = require('cors') //LIBRERIA 
const productRoutes=require('./routes/product.routes')
const userRoutes = require('./routes/user.routes')
const categoryRoutes=require("./routes/category.routes")

//Middlewares(aplicaciones intermedias) acciones que se ejecutan en mi servidor antes de llamara a cualquier ruta
app.use(express.json());//cuando venga un req.body poder leerlo
app.use(cors()); //incorporar servivio cors a las funcionalidades
app.use(express.urlencoded({ extended: true }));
//Aplicamos o Integramos las rutas a nuestro server
app.use([userRoutes,productRoutes, categoryRoutes]); //que app use las rutas definidas en userRoutes/productRoutes

module.exports = app;
