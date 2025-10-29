import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    minlength: [3, "Name should have at least 3 characters"]
  },

  category: {
    type: String,
    required: true,
  },
 subcategory: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    required: true,
  },

  tag: {
    type: [String], // multiple tags allowed
    default: [],
  },

  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"],
  },

  status: {
    type: String,
    enum: ["available", "out-of-stock", "discontinued"],
    default: "available",
  },

}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
