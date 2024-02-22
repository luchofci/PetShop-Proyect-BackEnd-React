const Order = require("../models/order.model");

async function createOrder(req, res) {
    try {
        const order = new Order(req, body);
        const orderDB = await order.save();

        return res.status(200).send({
            ok: true,
            message: "Orden creada correctamente",
            order: orderDB,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            message: "Error al crear la orden",
        });
    }
}

async function getOrders(req, res) {
    try {
        //si es ADMIN q me traiga todas las ordenes
        if (req.user.role === "ADMIN_ROLE") {
            const orders = await Order.find()
                .populate("user")
                .populate("products.producId"); //dentro del array products que me traiga el ID
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            message: "Error al crear la orden",
        });
    }
}

module.exports = { createOrder, getOrders };
