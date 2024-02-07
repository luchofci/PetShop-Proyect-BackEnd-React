const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const jwtVerify = require("../middlewares/isAuth");



router.get('/products/:id?', productController.getProduct);

router.post('/products', productController.createProduct);

// router.delete('/products/:id', productController.deleteProduct);

router.put('/products/:id', productController.updateProduct);

module.exports = router;