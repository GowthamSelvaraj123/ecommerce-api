const express = require('express');
const router = express.Router();
const {getUserCart, addItemToCart, updateCartItem, removeItemFromCart} = require("../controllers/cart.controller")

router.get('/:userId', getUserCart)
router.post('/', addItemToCart)
router.put('/:itemId', updateCartItem)
router.delete('/:itemId', removeItemFromCart)

module.exports = router;