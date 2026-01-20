"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Salesmen() {
  const [name, setName] = useState("");
  const [salesmen, setSalesmen] = useState([]);

  useEffect(() => {
    axios.get("/api/salesmen").then((res) => setSalesmen(res.data));
  }, []);

  const addSalesman = async () => {
    try {
      await axios.post("/api/salesmen", { name });
      toast.success("Salesman Added");
      setName("");
      axios.get("/api/salesmen").then((res) => setSalesmen(res.data));
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Manage Salesmen</h1>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Salesman Name"
          className="border p-2"
        />
        <button
          onClick={addSalesman}
          className="bg-blue-600 text-white py-2 px-4 rounded ml-2"
        >
          Add
        </button>
        <ul className="mt-8 space-y-2">
          {salesmen.map((sm) => (
            <li key={sm.id} className="border p-2">
              {sm.name} - Total Sales: {sm.totalSales || 0}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
