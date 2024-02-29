const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const jwtVerify = require("../middlewares/isAuth");
const { isAdmin } = require('../middlewares/isAdmin');
const uploadImage = require('../middlewares/uploadProductImage')



router.get('/products/:id?', productController.getProduct);
// Agregamos nuevo producto.-
router.post('/products', uploadImage, productController.createProduct);
// actualizamos producto.-
router.put('/products/:id', uploadImage, [jwtVerify, isAdmin], productController.updateProduct);

router.delete('/products/:id', [jwtVerify, isAdmin] ,productController.deleteProduct);

module.exports = router;