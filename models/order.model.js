// Libreria a partir de ella creamos un modelo
const mongoose = require("mongoose");

// receta - de mongoose traemos ese esquema
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  // necesitamos saber de quien es la orden
    user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
},
    total: {
    type: Number,
    required: true,
},
    products: [
    {
      // ID del producto
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    },
],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "CANCELED"],
        default: "PENDING",
    },
});
// guarda la collection  'orders' - Siempre en plural y enminuscula.-
module.exports = mongoose.model("Order", orderSchema);
