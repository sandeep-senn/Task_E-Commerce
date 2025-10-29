import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data.data);
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure to delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition-all"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-40 h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-500">₹{p.price}</p>
            <p className="text-sm text-pink-600">
              {p.category} → {p.subcategory}
            </p>

            <div className="mt-3 flex gap-3">
              <Link
                to={`/edit/${p._id}`}
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
