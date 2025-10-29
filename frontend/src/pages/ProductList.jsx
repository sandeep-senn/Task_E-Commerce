import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔢 Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 6; // products per page

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/api/products?page=${page}&limit=${limit}`;
      if (search) url += `&search=${search}`;
      if (category) url += `&category=${category}`;
      if (subcategory) url += `&subcategory=${subcategory}`;
      if (sortOrder) url += `&sort=${sortOrder}`;

      const { data } = await axios.get(url);
      setProducts(data.products);
      setTotalPages(data.totalPages);

      const uniqueCategories = [
        ...new Set(data.products.map((p) => p.category)),
      ];
      setCategories(uniqueCategories);

      if (category) {
        const filteredSubs = [
          ...new Set(
            data.products
              .filter((p) => p.category === category)
              .map((p) => p.subcategory)
              .filter(Boolean)
          ),
        ];
        setSubcategories(filteredSubs);
      } else {
        setSubcategories([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, subcategory, sortOrder, page]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSubcategory("");
    setSortOrder("");
  };

  const changePage = (num) => {
    if (num >= 1 && num <= totalPages) setPage(num);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        👗 Product List
      </h1>

      {/* 🔍 Filters */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center items-center">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-60 focus:ring-2 focus:ring-pink-400"
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubcategory("");
          }}
          className="border px-3 py-2 rounded-md w-60"
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {subcategories.length > 0 && (
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="border px-3 py-2 rounded-md w-60"
          >
            <option value="">All Subcategories</option>
            {subcategories.map((sub, idx) => (
              <option key={idx} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-2 rounded-md w-48"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>

        <button
          onClick={clearFilters}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-semibold"
        >
          Clear Filters
        </button>
      </div>

      {/* 💫 Loader */}
      {loading ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse border rounded-xl shadow p-4 space-y-4"
            >
              <div className="bg-gray-300 h-40 w-full rounded-lg"></div>
              <div className="h-4 bg-gray-300 w-3/4 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* 🛍️ Product Grid */}
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {products.length === 0 ? (
              <p className="text-gray-500 text-center w-full">
                No products found 😕
              </p>
            ) : (
              products.map((p) => (
                <div
                  key={p._id}
                  className="border rounded-xl shadow hover:shadow-lg p-4 transition-all"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {p.category} → {p.subcategory}
                  </p>
                  <p className="text-pink-600 font-semibold mt-1">₹{p.price}</p>
                </div>
              ))
            )}
          </div>

          {/* 🔢 Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded-md hover:bg-pink-100 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => changePage(i + 1)}
                className={`px-3 py-1 rounded-md ${
                  page === i + 1
                    ? "bg-pink-600 text-white"
                    : "border hover:bg-pink-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded-md hover:bg-pink-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
