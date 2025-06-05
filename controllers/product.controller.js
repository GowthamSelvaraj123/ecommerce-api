const listProducts = (req, res) => {
    res.send("Products Listed Successfully");
}
const singleProduct = (req, res) => {
    res.send("Single Product get Successfully");
}
const addProduct  = (req, res) => {
    res.send("Product Added Successfully");
}
const editProduct = (req, res) => {
    res.send("Edit Product Successfully");
}
const deleteProduct =  (req, res) => {
    res.send("Product Deleted Successfully");
}

module.exports = {listProducts, singleProduct, addProduct, editProduct, deleteProduct}