"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    buyPrice: "",
    sellPrice: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((r) => setCategories(r.data || []));
    axios.get("/api/brands").then((r) => setBrands(r.data || []));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/products", form);
      onSuccess();
      setForm({
        name: "",
        category: "",
        brand: "",
        buyPrice: "",
        sellPrice: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        name="brand"
        value={form.brand}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Brand</option>
        {brands.map((b) => (
          <option key={b.id} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>
      <input
        name="buyPrice"
        type="number"
        placeholder="Buying Price"
        value={form.buyPrice}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="sellPrice"
        type="number"
        placeholder="Selling Price"
        value={form.sellPrice}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Add Product
      </button>
    </form>
  );
}
