import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const fetchProduct = async () => {
    const res = await axios.get(`http://localhost:5000/api/products/${id}`);
    setForm(res.data.data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/products/edit/${id}`, form);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "category", "image", "tag", "price", "status"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.toUpperCase()}
            value={form[field] || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md w-full"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
