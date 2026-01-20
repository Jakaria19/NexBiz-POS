"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import lodash from "lodash";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [saleList, setSaleList] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    axios.get("/api/customers").then((res) => setCustomers(res.data));
    fetchSales();
  }, [from, to]);

  const fetchSales = async () => {
    let url = "/api/sales";
    if (from && to) url += `?from=${from}&to=${to}`;
    const res = await axios.get(url);
    setSaleList(res.data);
  };

  const topCustomers = lodash
    .chain(saleList)
    .groupBy("customerId")
    .map((sales, id) => ({ id, total: lodash.sumBy(sales, "total") }))
    .sortBy("total")
    .reverse()
    .value();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Customer List</h1>
        <table className="w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Total Amount</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust.id}>
                <td>{cust.name}</td>
                <td>{cust.phone}</td>
                <td>{cust.totalAmount}</td>
                <td>{cust.due}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="mt-8 text-2xl">Total Sale List by Time Range</h2>
        <div className="space-x-4">
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
        </div>
        <ul className="mt-4 space-y-2">
          {topCustomers.map((c) => (
            <li key={c.id} className="border p-2">
              Customer ID: {c.id} - Total Sale: {c.total}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
