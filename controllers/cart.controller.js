const Cart = require("../models/cart.model")
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            model: 'Product'
        });
        console.log(cart);
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        res.status(200).json({ success: true, data: cart });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
}
const addItemToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || typeof quantity !== 'number') {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity }]
            });
        } else {
            const itemIndex = cart.items.findIndex((item) =>
                item.productId && item.productId.toString() === productId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }
        await cart.save();
        res.status(200).json({ success: true, message: "Product Cart Added Successfully", data: cart });
    }
    catch (err) {
        console.error("Cart Error:", err);
        res.status(200).json({ success: false, message: "Server Error", error: err });
    }
}
const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || typeof quantity !== 'number') {
            return res.status(400).json({ success: false, message: "Missing or invalid fields" });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        res.status(200).json({ success: true, message: "Cart item updated successfully", data: cart });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};
const removeItemFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ success: false, message: "Missing userId or productId" });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const updatedItems = cart.items.filter(
            (item) => item.productId.toString() !== productId
        );

        if (updatedItems.length === cart.items.length) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        cart.items = updatedItems;
        await cart.save();

        res.status(200).json({ success: true, message: "Item removed from cart", data: cart });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};

module.exports = { getUserCart, addItemToCart, updateCartItem, removeItemFromCart }