const Product = require("../models/product.model")
const listProducts = async (req, res) => {
    try {
        res.status(200).json({ message: "Product Listed Succesfully"})
    }
    catch (err) {
        res.status(500).json({ message: "Product Not Found", error: err.message })
    }
}
const singleProduct = async (req, res) => {
    res.send("Single Product get Successfully");
    try {
        res.status(200).json({ message: "Product Listed Succesfully"})
    }
    catch (err) {
        res.status(500).json({ message: "Product Not Found", error: err.message })
    }
}
const addProduct = async (req, res) => {
    try {
        const {name, description, price , category, stock, images} = req.body;
        if(!name?.trim() || !description?.trim() || typeof price !== 'number' || !category?.trim() || typeof stock !== 'number' || !Array.isArray(images) || images.length === 0)
        {
             return res.status(400).json({success: false, message: "All product fields (name, description, price, category, stock, images) are required.",});
        }
        const newProduct = new Product({
            name: name.trim(),
            description: description.trim(),
            price,
            category: category.trim(),
            stock,
            images,
        });

        await newProduct.save();
        res.status(200).json({success: true, message: "Product Listed Succesfully", product:newProduct})
    }
    catch (err) {
        res.status(500).json({success: false, message: "Product Not Added Successfullly", error: err.message })
    }
}
const editProduct = async (req, res) => {
    try {
        res.status(200).json({ message: "Product Listed Succesfully"})
    }
    catch (err) {
        res.status(500).json({ message: "Edit Product Successfully", error: err.message })
    }
}
const deleteProduct = async (req, res) => {
    try {
    res.status(200).json({ message: "Product Listed Succesfully"})
    }
    catch (err) {
        res.status(500).json({ message: "Product Not Found", error: err.message })
    }
}

module.exports = { listProducts, singleProduct, addProduct, editProduct, deleteProduct }