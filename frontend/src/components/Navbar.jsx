import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🛒 Product Dashboard</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-200">All Products</Link>
        <Link to="/add" className="hover:text-gray-200">Add Product</Link>
      </div>
    </nav>
  );
}
