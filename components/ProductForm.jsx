"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductForm({ onSuccess }) {
  const [formData, setFormData] = useState({
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
    axios.get("/api/categories").then((res) => setCategories(res.data));
    axios.get("/api/brands").then((res) => setBrands(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate barcode
      const year = new Date(formData.date).getFullYear().toString().slice(-2);
      const month = (new Date(formData.date).getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const category = categories.find((c) => c.name === formData.category);
      const categoryInitial = category.initial || "XX";
      const brandCode = formData.brand.slice(0, 3).toUpperCase(); // Example brand code
      const serial = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0"); // Random serial
      const barcode = year + month + categoryInitial + brandCode + serial;

      await axios.post("/api/products", { ...formData, barcode });
      toast.success("Product Added with Barcode: " + barcode);
      onSuccess();
    } catch (err) {
      toast.error("Failed to Add Product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2"
        required
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-2"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        className="w-full border p-2"
      >
        <option value="">Select Brand</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.name}>
            {brand.name}
          </option>
        ))}
      </select>
      <input
        name="buyPrice"
        type="number"
        placeholder="Buying Price"
        value={formData.buyPrice}
        onChange={handleChange}
        className="w-full border p-2"
        required
      />
      <input
        name="sellPrice"
        type="number"
        placeholder="Selling Price"
        value={formData.sellPrice}
        onChange={handleChange}
        className="w-full border p-2"
        required
      />
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border p-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Add Product
      </button>
    </form>
  );
}
