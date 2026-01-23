"use client";

import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [initial, setInitial] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !initial) {
      toast.error("Name and Initial required");
      return;
    }

    try {
      await axios.post("/api/categories", { name, initial });
      toast.success("Category added");
      setName("");
      setInitial("");
      axios.get("/api/categories").then((res) => setCategories(res.data));
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            className="w-full border p-2"
            required
          />
          <input
            value={initial}
            onChange={(e) => setInitial(e.target.value.toUpperCase())}
            placeholder="Unique Initial (e.g., EL)"
            className="w-full border p-2"
            maxLength={2}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add Category
          </button>
        </form>
        <ul className="mt-8 space-y-2">
          {categories.map((cat) => (
            <li key={cat.id} className="border p-2">
              {cat.name} - Initial: {cat.initial}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
