"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      await axios.post("/api/categories", { name });
      toast.success("Category added successfully");
      setName("");

      // Refresh list
      const res = await axios.get("/api/categories");
      setCategories(res.data || []);
    } catch (err) {
      toast.error("Failed to add category");
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

        <form onSubmit={handleSubmit} className="max-w-md space-y-4 mb-10">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Add Category
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4">Existing Categories</h2>

        {categories.length === 0 ? (
          <p className="text-gray-500">No categories added yet.</p>
        ) : (
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="p-3 border rounded bg-gray-50 flex justify-between items-center"
              >
                <span>{cat.name}</span>
                {/* Optional: Delete button later */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
