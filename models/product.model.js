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

