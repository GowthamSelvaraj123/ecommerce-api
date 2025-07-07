const express = require('express');
const router = express.Router();
const {listProducts, singleProduct, addProduct, editProduct, deleteProduct, bulkProductImport} = require('../controllers/product.controller');
const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require('../middlewares/role.middleware');

router.get('/', listProducts)
router.get('/:id', singleProduct)
router.post('/', authorizeRoles, authMiddleware, addProduct)
router.put('/:id', authorizeRoles, authMiddleware, editProduct);
router.delete('/:id', authorizeRoles, authMiddleware, deleteProduct);
router.post('/bulk-import', authorizeRoles, authMiddleware, bulkProductImport);

module.exports = router;