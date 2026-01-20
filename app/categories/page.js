"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/categories", { name });
      toast.success("Category Added");
      setName("");
      axios.get("/api/categories").then((res) => setCategories(res.data));
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Add Category</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            className="w-full border p-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add
          </button>
        </form>
        <ul className="mt-8 space-y-2">
          {categories.map((cat) => (
            <li key={cat.id} className="border p-2">
              {cat.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
