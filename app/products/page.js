"use client";

import Sidebar from "../../components/Sidebar";
import ProductForm from "../../components/ProductForm";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import lodash from "lodash";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    axios.get("/api/products").then((res) => setProducts(res.data || []));
  }, []);

  // Real-time search with debounce
  const debouncedSearch = useMemo(
    () => lodash.debounce(setSearchTerm, 300),
    [],
  );

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.barcode && p.barcode.includes(searchTerm)) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedProducts = lodash.orderBy(filteredProducts, [sortBy], ["asc"]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
        <ProductForm
          onSuccess={() =>
            axios.get("/api/products").then((res) => setProducts(res.data))
          }
        />

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <input
              type="text"
              placeholder="Search by Name, Barcode, Category..."
              value={searchTerm}
              onChange={(e) => debouncedSearch(e.target.value)}
              className="w-full sm:w-80 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border p-3 rounded"
            >
              <option value="name">Sort by Name</option>
              <option value="barcode">Sort by Barcode</option>
              <option value="category">Sort by Category</option>
              <option value="buyPrice">Sort by Purchase Price</option>
              <option value="sellPrice">Sort by Sale Price</option>
              <option value="stock">Sort by Stock</option>
            </select>
          </div>

          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">Barcode</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Brand</th>
                <th className="border p-2">Purchase Price</th>
                <th className="border p-2">Sale Price</th>
                <th className="border p-2">Sale Quantity</th>
                <th className="border p-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((p) => (
                <tr key={p.id}>
                  <td className="border p-2">{p.barcode}</td>
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">{p.category}</td>
                  <td className="border p-2">{p.brand}</td>
                  <td className="border p-2">{p.buyPrice}</td>
                  <td className="border p-2">{p.sellPrice}</td>
                  <td className="border p-2">{p.saleQuantity || 0}</td>
                  <td className="border p-2">{p.stock || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {sortedProducts.length === 0 && (
            <p className="mt-4 text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
