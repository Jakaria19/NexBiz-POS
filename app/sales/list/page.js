"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import lodash from "lodash";

export default function SaleList() {
  const [sales, setSales] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
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

    // Top customers by sale in range
    const grouped = lodash.groupBy(res.data, "customerId");
    const sorted = lodash
      .sortBy(Object.keys(grouped), (key) =>
        lodash.sumBy(grouped[key], "total"),
      )
      .reverse();
    setTopCustomers(
      sorted.map((key) => ({
        customerId: key,
        total: lodash.sumBy(grouped[key], "total"),
      })),
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Sale List</h1>
        <button
          onClick={() => setFilter("today")}
          className="bg-blue-600 text-white py-1 px-2 rounded"
        >
          Today
        </button>
        <div className="mt-4 space-x-4">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <button
            onClick={fetchSales}
            className="bg-green-600 text-white py-1 px-2 rounded"
          >
            Filter
          </button>
        </div>
        <ul className="mt-8 space-y-2">
          {sales.map((s) => (
            <li key={s.id} className="border p-2">
              Sale ID: {s.id} - Total: {s.total}
            </li>
          ))}
        </ul>
        <p>Total Sales: {total}</p>
        <h2 className="mt-8 text-2xl">Top Customers in Range</h2>
        <ul>
          {topCustomers.map((c) => (
            <li key={c.customerId} className="border p-2">
              Customer ID: {c.customerId} - Total: {c.total}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
