const getUserOrders  = (req, res) => {
    res.send("Get All User Orders Listed Successfully");
}
const getSingleOrder = (req, res) => {
    res.send("Get single user order");
}
const orderCheckout = (req, res) => {
    res.send("Order Checkout");
}

module.exports = {getUserOrders, getSingleOrder, orderCheckout}