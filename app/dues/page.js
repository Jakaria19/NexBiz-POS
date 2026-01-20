"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import lodash from "lodash";

export default function Dues() {
  const [dues, setDues] = useState([]);
  const [sortBy, setSortBy] = useState("due");

  useEffect(() => {
    axios
      .get("/api/customers")
      .then((res) => setDues(res.data.filter((c) => c.due > 0)));
  }, []);

  const sortedDues = lodash.sortBy(dues, sortBy);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Due List</h1>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="mb-4 border p-2"
        >
          <option value="due">Sort by Due</option>
          <option value="name">Sort by Name</option>
        </select>
        <table className="w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            {sortedDues.map((cust) => (
              <tr key={cust.id}>
                <td>{cust.name}</td>
                <td>{cust.phone}</td>
                <td>{cust.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
