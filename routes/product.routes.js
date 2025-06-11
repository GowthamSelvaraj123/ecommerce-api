const express = require('express');
const router = express.Router();
const {listProducts, singleProduct, addProduct, editProduct, deleteProduct, bulkProductImport} = require('../controllers/product.controller');

router.get('/', listProducts)
router.get('/:id', singleProduct)
router.post('/', addProduct)
router.put('/:id', editProduct);
router.delete('/:id', deleteProduct);
router.post('/bulk-import', bulkProductImport);

module.exports = router;