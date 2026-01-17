"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

export default function SaleListPage() {
  const [sales, setSales] = useState([]);
  const [filterType, setFilterType] = useState("today");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const loadSales = async () => {
    let url = "/api/sales";
    if (filterType === "today") {
      const today = dayjs().format("YYYY-MM-DD");
      url += `?from=${today}&to=${today}`;
    } else if (dateFrom && dateTo) {
      url += `?from=${dateFrom}&to=${dateTo}`;
    }
    try {
      const res = await axios.get(url);
      setSales(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSales();
  }, [filterType, dateFrom, dateTo]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Sale List</h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilterType("today")}
            className={`px-4 py-2 rounded ${
              filterType === "today" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Today
          </button>
          <div className="flex gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border p-2 rounded"
            />
            <span>to</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>

        {sales.length === 0 ? (
          <p>No sales found.</p>
        ) : (
          <div className="space-y-3">
            {sales.map((s) => (
              <div key={s.id} className="border p-4 rounded">
                <p>
                  <strong>ID:</strong> {s.id}
                </p>
                <p>
                  <strong>Total:</strong> {s.total} TK
                </p>
                <p>
                  <strong>Date:</strong> {s.date || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
