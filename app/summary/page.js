"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import SalesChart from "@/components/Charts";

export default function Summary() {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [type, setType] = useState("day");
  const [data, setData] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    fetchSummary();
  }, [date, type]);

  const fetchSummary = async () => {
    const res = await axios.get(`/api/summary?date=${date}&type=${type}`);
    setData(res.data.chartData);
    setTotalSale(res.data.totalSale);
    setTotalProfit(res.data.totalProfit);
  };

  const prevDay = () =>
    setDate(dayjs(date).subtract(1, "day").format("YYYY-MM-DD"));
  const nextDay = () => setDate(dayjs(date).add(1, "day").format("YYYY-MM-DD"));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Summary</h1>
        <div className="flex space-x-4">
          <button
            onClick={prevDay}
            className="bg-gray-600 text-white py-1 px-2 rounded"
          >
            &lt;
          </button>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            onClick={nextDay}
            className="bg-gray-600 text-white py-1 px-2 rounded"
          >
            &gt;
          </button>
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-4 border p-2"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="5year">5 Years</option>
        </select>
        <p>
          Total Sale: {totalSale} | Total Profit: {totalProfit}
        </p>
        <SalesChart data={data} type={type} />
      </div>
    </div>
  );
}
