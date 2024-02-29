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
        console.log('\x1b[34m CONEXION A LA DB CORRECTA!! \x1b[34m')

        //Ponemos nuestro servidor express a escuchar
        server.listen(3000, ()=>{
        console.log('\x1b[34m Server is running at port 3000 \x1b[35m')
        })
    }
    catch(error){
        console.log(error)
    }

})()







