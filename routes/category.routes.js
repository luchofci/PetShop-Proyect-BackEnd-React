const express = require('express');
const router = express.Router();
// const productController = require('../controllers/product.controller');
const jwtVerify = require("../middlewares/isAuth");
const categoryController = require('../controllers/category.controller')



router.get('/categories', categoryController.getCategories);

router.post('/categories', categoryController.postCategory);



module.exports = router;