import { Product } from "../model/product.js"; 

export const addProduct = async (req, res) => {
  try {
    const { name, category, subcategory, image, tag, price, status } = req.body;

    if (!name || !category || !image || !price) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const newProduct = await Product.create({
      name,
      category,
      subcategory,
      image,
      tag,
      price,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET ALL PRODUCTS with Search & Filter
export const getAllProducts = async (req, res) => {
  try {
    const { search, category, subcategory, sort, page = 1, limit = 6 } = req.query;
    let query = {};

    if (search)
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { tag: { $regex: search, $options: "i" } },
      ];

    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;

    let products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // 🪄 Sort by price
    if (sort === "asc") products.sort((a, b) => a.price - b.price);
    if (sort === "desc") products.sort((a, b) => b.price - a.price);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update (edit) product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // return updated doc
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ 1. Get all distinct categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err.message });
  }
};

// ✅ 2. Get all products from a given category
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const products = await Product.find({
      category: { $regex: new RegExp(categoryName, "i") },
    });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};
