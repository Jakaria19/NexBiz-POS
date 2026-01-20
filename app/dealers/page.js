"use client";

import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import lodash from "lodash";

export default function Dealers() {
  const [dealers, setDealers] = useState([]);
  const [sortBy, setSortBy] = useState("amount");
  const [payment, setPayment] = useState({
    dealerId: "",
    amount: "",
    method: "cash",
  });

  useEffect(() => {
    axios.get("/api/dealers").then((res) => setDealers(res.data));
  }, []);

  const handlePayment = async () => {
    try {
      await axios.put(`/api/dealers/${payment.dealerId}`, payment);
      toast.success("Payment Processed");
      axios.get("/api/dealers").then((res) => setDealers(res.data));
    } catch (err) {
      toast.error("Failed");
    }
  };

  const sortedDealers = lodash.sortBy(dealers, sortBy);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Dealer List & Payments</h1>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="mb-4 border p-2"
        >
          <option value="amount">Sort by Amount</option>
          <option value="product">Sort by Product</option>
        </select>
        <ul className="space-y-2">
          {sortedDealers.map((dealer) => (
            <li key={dealer.id} className="border p-2">
              {dealer.product} - Amount: {dealer.amount} - Buy:{" "}
              {dealer.buyCount} - Sale: {dealer.saleCount} - Profit:{" "}
              {dealer.profit}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <h3>Make Payment</h3>
          <select
            value={payment.dealerId}
            onChange={(e) =>
              setPayment({ ...payment, dealerId: e.target.value })
            }
            className="border p-2"
          >
            <option>Select Dealer</option>
            {dealers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.product}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={payment.amount}
            onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
            className="border p-2 ml-2"
          />
          <select
            value={payment.method}
            onChange={(e) => setPayment({ ...payment, method: e.target.value })}
            className="border p-2 ml-2"
          >
            <option value="cash">Cash</option>
            <option value="mobile">Mobile Banking</option>
            <option value="check">Check</option>
          </select>
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white py-2 px-4 rounded ml-2"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
