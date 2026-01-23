"use client";

import Sidebar from "../../../components/Sidebar";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import dayjs from "dayjs";
import lodash from "lodash";

export default function SaleList() {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filter, setFilter] = useState("today");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchSales();
  }, [filter, from, to]);

  const fetchSales = async () => {
    let url = "/api/sales";
    if (filter === "today")
      url += `?from=${dayjs().format("YYYY-MM-DD")}&to=${dayjs().format("YYYY-MM-DD")}`;
    else if (from && to) url += `?from=${from}&to=${to}`;
    const res = await axios.get(url);
    setSales(res.data);
    setTotal(res.data.reduce((sum, s) => sum + s.total, 0));
  };

  const debouncedSearch = useMemo(
    () => lodash.debounce(setSearchTerm, 300),
    [],
  );

  const filteredSales = sales.filter(
    (s) =>
      s.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.id && s.id.toString().includes(searchTerm)),
  );

  const sortedSales = lodash.orderBy(filteredSales, [sortBy], ["desc"]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Sale List</h1>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <div className="space-x-4 flex flex-wrap">
            <button
              onClick={() => setFilter("today")}
              className="bg-blue-600 text-white py-1 px-2 rounded"
            >
              Today
            </button>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={fetchSales}
              className="bg-green-600 text-white py-1 px-2 rounded"
            >
              Filter
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by Customer or Sale ID..."
              value={searchTerm}
              onChange={(e) => debouncedSearch(e.target.value)}
              className="w-full sm:w-64 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border p-3 rounded"
            >
              <option value="date">Sort by Date</option>
              <option value="total">Sort by Amount</option>
              <option value="customerName">Sort by Customer</option>
            </select>
          </div>
        </div>

        <ul className="mt-8 space-y-2">
          {sortedSales.map((s) => (
            <li key={s.id} className="border p-2">
              Sale ID: {s.id} - Total: {s.total} - Date: {s.date || "N/A"} -
              Customer: {s.customerName || "N/A"}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-bold">Total Sales: {total}</p>
      </div>
    </div>
  );
}
