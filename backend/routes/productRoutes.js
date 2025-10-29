import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllCategories,
  getProductsByCategory,
} from "../controllers/productController.js";

const router = express.Router();

// ✅ Create (Add) a product
router.post("/add", addProduct);

// ✅ Read (Get all products)
router.get("/", getAllProducts);

// ✅ Read (Get single product by ID)
router.get("/:id", getProductById);

// ✅ Update (Edit product)
router.put("/edit/:id", updateProduct);

// ✅ Delete a product
router.delete("/delete/:id", deleteProduct);

// GET all categories
router.get("/categories", getAllCategories);

// GET products by category
router.get("/category/:categoryName", getProductsByCategory);

export default router;
