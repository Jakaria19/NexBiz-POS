"use client";

import Sidebar from "@/components/Sidebar";
import ProductForm from "@/components/ProductForm";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  const refresh = () => {
    axios.get("/api/products").then((res) => setProducts(res.data));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
        <ProductForm onSuccess={refresh} />
        <ul className="mt-8 space-y-2">
          {products.map((product) => (
            <li key={product.id} className="border p-2">
              {product.name} - {product.sellPrice}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
