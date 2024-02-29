const express = require("express");
const router = express.Router();
const orderController = require('../controllers/order.controller')
const jwtVerify = require("../middlewares/isAuth");



router.post('/orders', jwtVerify, orderController.createOrder);

router.get('/orders', jwtVerify, orderController.getOrders)

module.exports = router 