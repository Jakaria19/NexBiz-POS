"use client";

import Sidebar from "../../components/Sidebar";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import lodash from "lodash";

export default function Dues() {
  const [dues, setDues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("due");

  useEffect(() => {
    axios
      .get("/api/customers")
      .then((res) => setDues(res.data.filter((c) => c.due > 0)));
  }, []);

  const debouncedSearch = useMemo(
    () => lodash.debounce(setSearchTerm, 300),
    [],
  );

  const filteredDues = dues.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.phone && c.phone.includes(searchTerm)),
  );

  const sortedDues = lodash.orderBy(filteredDues, [sortBy], ["desc"]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Due List</h1>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by Name or Phone..."
            value={searchTerm}
            onChange={(e) => debouncedSearch(e.target.value)}
            className="w-full sm:w-80 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-3 rounded"
          >
            <option value="due">Sort by Due (High to Low)</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

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

        {sortedDues.length === 0 && (
          <p className="mt-4 text-gray-500">No dues found.</p>
        )}
      </div>
    </div>
  );
}
