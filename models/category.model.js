const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        minlenght: 3,
        maxlenght: 50,
    },
    description:{
        type:String,
        required: true,
        trim: true,
        maxlenght: 255,
    },
})

    // va a crear la collection categories en mongoose
module.exports = mongoose.model( 'Category', categorySchema)