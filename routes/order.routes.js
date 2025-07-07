const express = require('express');
const router = express.Router();
const {getUserOrders, getSingleOrder, orderCheckout} = require('../controllers/order.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.get('/', authMiddleware, getUserOrders)
router.get('/:id', authMiddleware, getSingleOrder, )
router.post('/', authMiddleware, orderCheckout)

module.exports = router;