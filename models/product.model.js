const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    frontName: {
        type: String, 
        required: true, 
        trim: true,
        unique: true,
        minlength: 2, 
        maxlength: 80,
    },
    frontDescription:{
        type: String,
        required: true,
        trim: true,
        minlength: 6, 
        maxlength: 500,
    },
    backtName: {
        type: String, 
        required: true, 
        trim: true,
        unique: true,
        minlength: 2, 
        maxlength: 255,
    },
    backDescription:{
        type: String,
        required: true,
        trim: true,
        minlength: 6, 
        maxlength: 1000,
    },
    price:{
        type: Number,
        required: true,
        min: 1,
        max: 100000000
    },
    image:{
        type: String,
        required: false,
        // trim: true
    },
    details:{
        type: String,
        required: true,
        trim:true,
    },
    createdAt:{
        type: Date,
        default: Date.now // Sin los parentesis como en Js
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:"Category",
        required: true,
    },
    stock:{
        type: Number,
        required: true,
        min: 0,
        max: 10000,

    },
    active:{
        type: Boolean,
        default: true,
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