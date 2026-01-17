"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("/api/customers").then((res) => setCustomers(res.data));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
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
      </div>
    </div>
  );
}
