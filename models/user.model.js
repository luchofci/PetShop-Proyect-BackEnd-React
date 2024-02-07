const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 60,
        trim: true,
        validate:{
            validator: function(name){
                const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
                return regex.test(name)
            },
        },
    },
    email: {
        type: String, 
        required: true,
        unique:true, //Esto significa que en mi base de datos este valor email, no haya otro igual
        index: true, //Buscar el valor por indice.
        lowercase: true, //Para quie el email nos ea sensible a mayuscula ni minuscula
        trim: true, // Sirve para cuando escriben, osea tengo una string, y dejaron espacios adelante y al final, los quite.
        minlength:  6,
        maxlength: 80,   
        validate:{ //Antes de guardar, valida estos valores, valida si el valor que esta enviando el usuario pasa el test de patrones
            validator: function(value){
                const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,})?$/
                return regex.test(value)
            },
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 65,
        trim: true,
    },
    age:{
        type:Number,
        required: true,
        min: 12,
        max: 120,
        trim: true,
    },
    image:{
        type: String,
        required: false,
        trim: true,
    },
    role:{
        type:String,
        required: false,
        default: 'USER_ROLE',
        enum: [ //aca se enumeran todos las clases de usuarios que puede tener, esto depende del requerimiento del cliente.
            'USER_ROLE',
            'CLIENT_ROLE',
            'ADMIN_ROLE',
        ]
    },
    location:{
        type:String,
        required: false,
        trim: true,
    },
    bornDate:{
        type: Number,
        required: false,
    }
});

module.exports = mongoose.model('User', userSchema);