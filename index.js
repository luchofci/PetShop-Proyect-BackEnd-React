const server = require('./app')
const mongoose = require('mongoose');
// Forma de conectarse al server 
// mongodb+srv://lucianofedericoc:<password>@eit-64910.ivbc7y5.mongodb.net/
//uuser : lucianofedericoc
// pass wMDbZ5xWQkNUOAlB


(async function main(){
    try{
        //Nos conectamos a la base de datos
        await mongoose.connect("mongodb+srv://lucianofedericoc:wMDbZ5xWQkNUOAlB@eit-64910.ivbc7y5.mongodb.net/Ecommerce")
        console.log('CONEXION A LA DB CORRECTA!!')

        //Ponemos nuestro servidor express a escuchar
        server.listen(3000, ()=>{
        console.log('Server is running at port 3000')
        })
    }
    catch(error){
        console.log(error)
    }

})()


// app.get('/', (req, res)=>{
//     console.log('Endpoint llamado');
//     res.send('Hellow World!')
// })





