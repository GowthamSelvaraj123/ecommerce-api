const express = require('express');
const router = express.Router();
const {listProducts, singleProduct, addProduct, editProduct, deleteProduct} = require('../controllers/product.controller');

router.get('/', listProducts)
router.get('/:id', singleProduct)
router.post('/', addProduct)
router.put('/:id', deleteProduct)

module.exports = router;