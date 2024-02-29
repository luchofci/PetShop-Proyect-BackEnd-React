const express = require("express");
const router = express.Router();
const orderController = require('../controllers/order.controller')
const jwtVerify = require("../middlewares/isAuth");



router.get('/orders', jwtVerify, orderController.getOrders)

router.post('/orders', jwtVerify, orderController.createOrder);

module.exports = router 