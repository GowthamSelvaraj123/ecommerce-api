const Product = require("../models/product.model")
const listProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, message: "Products listed successfully", products });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to list products", error: err.message });
    }
}
const singleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const singleProductData = await Product.findById(id);
        if (!singleProductData) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product fetched successfully", singleProductData });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch product", error: err.message });
    }
}
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, images } = req.body;
        if (!name?.trim() || !description?.trim() || typeof price !== 'number' || !category?.trim() || typeof stock !== 'number' || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ success: false, message: "All product fields (name, description, price, category, stock, images) are required.", });
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
        res.status(200).json({ success: true, message: "Product Listed Succesfully", product: newProduct })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Product Not Added Successfullly", error: err.message })
    }
}
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock, images } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required in params." });
        }
        if (!name?.trim() || !description?.trim() || typeof price !== 'number' || !category?.trim() || typeof stock !== 'number' || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ success: false, message: "All product fields (name, description, price, category, stock, images) are required.", });
        }
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, category, stock, images },
            { new: true, runValidators: true }
        );
        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product: updatedProduct,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required in params." });
        }
        const deleteProeuctdata = await Product.findByIdAndDelete(id);
        if (!deleteProeuctdata) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product Deleted Succesfully", product: deleteProeuctdata })
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message })
    }
}

const bulkProductImport = async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Products array is required and cannot be empty.",
      });
    }

    const validProducts = products.filter(product =>
      product.name?.trim() &&
      product.description?.trim() &&
      typeof product.price === 'number' &&
      product.category?.trim() &&
      typeof product.stock === 'number' &&
      Array.isArray(product.images) &&
      product.images.length > 0
    );

    if (validProducts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid products found in request.",
      });
    }

    const insertedProducts = await Product.insertMany(validProducts);

    res.status(201).json({
      success: true,
      message: `${insertedProducts.length} products imported successfully.`,
      products: insertedProducts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Bulk import failed.",
      error: err.message,
    });
  }
};
module.exports = { listProducts, singleProduct, addProduct, editProduct, deleteProduct, bulkProductImport }