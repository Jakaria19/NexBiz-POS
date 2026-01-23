"use client";

import Sidebar from "../../components/Sidebar";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import lodash from "lodash";

export default function DealersPage() {
  const [dealers, setDealers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("amount");
  const [payment, setPayment] = useState({
    dealerId: "",
    amount: "",
    method: "cash",
  });

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      const res = await axios.get("/api/dealers");
      setDealers(res.data || []);
    } catch (err) {
      console.error("Failed to load dealers", err);
      toast.error("Failed to load dealers");
    }
  };

  // Real-time search with debounce
  const debouncedSearch = useMemo(
    () => lodash.debounce(setSearchTerm, 300),
    [],
  );

  // Filtered & Sorted
  const filteredDealers = dealers.filter(
    (d) =>
      d.product?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedDealers = lodash.orderBy(filteredDealers, [sortBy], ["desc"]);

  const handlePayment = async () => {
    if (!payment.dealerId || !payment.amount || payment.amount <= 0) {
      toast.error("Select dealer and enter valid amount");
      return;
    }

    try {
      await axios.put(`/api/dealers/${payment.dealerId}`, {
        ...payment,
        amount: Number(payment.amount),
      });
      toast.success("Payment Processed");
      setPayment({ dealerId: "", amount: "", method: "cash" });
      fetchDealers(); // Refresh list
    } catch (err) {
      toast.error("Payment Failed");
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Dealer List & Payments</h1>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search by Product or Dealer Name..."
            value={searchTerm}
            onChange={(e) => debouncedSearch(e.target.value)}
            className="w-full sm:w-96 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-3 rounded min-w-[180px]"
          >
            <option value="amount">Sort by Amount (High to Low)</option>
            <option value="product">Sort by Product Name</option>
            <option value="profit">Sort by Profit</option>
            <option value="buyCount">Sort by Buy Count</option>
            <option value="saleCount">Sort by Sale Count</option>
          </select>
        </div>

        {/* Dealer Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">Product</th>
                <th className="border p-3 text-left">Total Paying Amount</th>
                <th className="border p-3 text-left">Buy Count</th>
                <th className="border p-3 text-left">Sale Count</th>
                <th className="border p-3 text-left">Profit</th>
              </tr>
            </thead>
            <tbody>
              {sortedDealers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="border p-6 text-center text-gray-500"
                  >
                    No dealers found
                  </td>
                </tr>
              ) : (
                sortedDealers.map((dealer) => (
                  <tr key={dealer.id} className="hover:bg-gray-50">
                    <td className="border p-3">{dealer.product || "N/A"}</td>
                    <td className="border p-3">{dealer.amount || 0} TK</td>
                    <td className="border p-3">{dealer.buyCount || 0}</td>
                    <td className="border p-3">{dealer.saleCount || 0}</td>
                    <td className="border p-3 text-green-600 font-medium">
                      {dealer.profit || 0} TK
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Payment Form */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Make Dealer Payment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={payment.dealerId}
              onChange={(e) =>
                setPayment({ ...payment, dealerId: e.target.value })
              }
              className="border p-3 rounded"
            >
              <option value="">Select Dealer</option>
              {dealers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.product} (Amount Due: {d.amount || 0} TK)
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Payment Amount"
              value={payment.amount}
              onChange={(e) =>
                setPayment({ ...payment, amount: e.target.value })
              }
              className="border p-3 rounded"
              min="1"
            />

            <select
              value={payment.method}
              onChange={(e) =>
                setPayment({ ...payment, method: e.target.value })
              }
              className="border p-3 rounded"
            >
              <option value="cash">Cash</option>
              <option value="mobile">
                Mobile Banking (bKash/Nagad/Rocket)
              </option>
              <option value="check">Check</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 bg-blue-600 text-white py-3 px-8 rounded hover:bg-blue-700 transition"
          >
            Process Payment
          </button>
        </div>
      </div>
    </div>
  );
}
