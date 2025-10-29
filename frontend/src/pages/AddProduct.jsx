import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    subcategory: "",
    image: "",
    tag: "",
    price: "",
    status: "available",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/products/add", {
        ...form,
        tag: form.tag.split(",").map((t) => t.trim()),
      });
      alert("✅ Product added successfully!");
      navigate("/");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-pink-600">
        🛍️ Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Enter Category (e.g., Tops)"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />

        {/* Subcategory */}
        <input
          type="text"
          name="subcategory"
          placeholder="Enter Subcategory (e.g., T-shirt)"
          value={form.subcategory}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
        />

        {/* Image URL */}
        <input
          type="text"
          name="image"
          placeholder="Enter Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />

        {/* Tags */}
        <input
          type="text"
          name="tag"
          placeholder="Tags (comma separated)"
          value={form.tag}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded-md w-full hover:bg-pink-700 transition-all"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
