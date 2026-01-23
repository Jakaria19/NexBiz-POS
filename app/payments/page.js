"use client";

import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Payments() {
  const [dealers, setDealers] = useState([]);
  const [payment, setPayment] = useState({
    dealerId: "",
    amount: "",
    method: "cash",
  });

  useEffect(() => {
    axios.get("/api/dealers").then((res) => setDealers(res.data));
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/payments", payment);
      toast.success("Payment Added");
      setPayment({ dealerId: "", amount: "", method: "cash" });
    } catch (err) {
      toast.error("Failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/payments/" + id);
      toast.success("Payment Deleted");
      // Refresh
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Add Payment</h1>
        <select
          value={payment.dealerId}
          onChange={(e) => setPayment({ ...payment, dealerId: e.target.value })}
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
          onClick={handleSubmit}
          className="bg-blue-600 text-white py-2 px-4 rounded ml-2"
        >
          Add Payment
        </button>
      </div>
    </div>
  );
}
