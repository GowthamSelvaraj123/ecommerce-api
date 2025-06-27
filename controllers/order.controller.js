const Order = require("../models/order.model");
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId }).populate('items.productId');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No orders found for this user" });
        }

        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
}
const getSingleOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId).populate('items.productId');
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
}
const orderCheckout = async (req, res) => {
    try {
        const { userId, items, totalAmount, shippingAddress, paymentMethod } = req.body;

        if (!userId || !items || !totalAmount || !shippingAddress || !paymentMethod) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
            status: "Pending"
        });

        await newOrder.save();

        res.status(201).json({ success: true, message: "Order placed successfully", data: newOrder });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
}

module.exports = { getUserOrders, getSingleOrder, orderCheckout }