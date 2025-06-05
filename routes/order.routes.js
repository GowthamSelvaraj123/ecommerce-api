const express = require('express');
const router = express.Router();
const {getUserOrders, getSingleOrder, orderCheckout} = require('../controllers/order.controller');

router.get('/', getUserOrders)
router.get('/:id', getSingleOrder, )
router.post('/', orderCheckout)

module.exports = router;