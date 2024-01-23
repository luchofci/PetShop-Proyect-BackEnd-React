const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 3, 
        maxlength: 60,
        trim: true,
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

},)

module.exports = mongoose.model('Product', productSchema);

// const productSchema = new Schema({   //propiedades de la collection //barreras para cargar el usuario
//     producto: {     type: String,     required: true,     minlength: 4,     maxlenght: 60,     trim: true,       },
//     precio: {     type: Number,     required: true,     min: 1,     max: 10000000,   },
//     active:{     type: String,     required:true,   },   descripcion: {     type: String,     required: true,     minlength: 4,     maxlenght: 60,     trim: true,   },   fecha: {     type: Date,     required: false,   },   image: {     type: String,     required: false,     trim: true,   },  });


// title1: {     type: String,     required: true,     minlength: 4,     maxlenght: 60,     trim: true,       },
// description1: "Alimento seco para gatitos en su primera etapa de crecimiento (de 1 a 4 meses de edad) y durante el período de destete. Tambien indicado para gatas gestantes o en período de lactancia.",
// title2: "Especial para facilitar el destete",
// description2: "Entre las 4 y las 12 semanas después del nacimiento, la inmunidad proporcionada de forma natural por el calostro de la madre disminuye progresivamente. Mother & Babycat ayuda a reforzar las defensas naturales del gatito en su primera etapa de crecimiento, gracias a un exclusivo complejo de antioxidantes, que incluye vitamina E.",
// price: {type: Number, required: true, min: 1, max: 10000000},
// detais: "De 1 a 4 meses de edad",
// imageUrl: "https://github.com/luchofci/ProyectoIntegradorEcommerce/blob/main/assets/images/products/Royal%20Canin%20Mother%20&%20baby%20cat.png?raw=true",
// category: "productosSecos",
// order: 0,
// active: 5