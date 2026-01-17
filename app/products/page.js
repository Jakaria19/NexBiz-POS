"use client";

import Sidebar from "@/components/Sidebar";
import ProductForm from "@/components/ProductForm";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
        <ProductForm onSuccess={fetchProducts} />
        <div className="mt-8">
          <h2 className="text-2xl mb-4">Product List</h2>
          {products.length === 0 ? (
            <p>No products added yet.</p>
          ) : (
            <ul className="space-y-2">
              {products.map((p) => (
                <li key={p.id} className="border p-3 rounded">
                  <strong>{p.name}</strong> | Category: {p.category} | Buy:{" "}
                  {p.buyPrice} | Sell: {p.sellPrice}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
