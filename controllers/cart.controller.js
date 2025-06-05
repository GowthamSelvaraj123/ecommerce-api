const getUserCart = (req, res) => {
    res.send("Get User Cart");
}
const addItemToCart = (req, res) => {
    res.send("Added Item to Cart");
}
const updateCartItem = (req, res) => {
    res.send("Updated Item Quantity");
}
const removeItemFromCart = (req, res) => {
    res.send("Removed Item Successfully");
}

module.exports = {getUserCart, addItemToCart, updateCartItem, removeItemFromCart}