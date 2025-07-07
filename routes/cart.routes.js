const express = require('express');
const router = express.Router();
const {getUserCart, addItemToCart, updateCartItem, removeItemFromCart} = require("../controllers/cart.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.get('/:userId', authMiddleware, getUserCart)
router.post('/', authMiddleware, addItemToCart)
router.put('/:itemId', authMiddleware, updateCartItem)
router.delete('/:itemId', authMiddleware, removeItemFromCart)

module.exports = router;