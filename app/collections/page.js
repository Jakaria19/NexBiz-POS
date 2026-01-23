"use client";

import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BillPrint from "../../components/BillPrint";

export default function Collections() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    axios
      .get("/api/customers")
      .then((res) => setCustomers(res.data.filter((c) => c.due > 0)));
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/collections", {
        customerId: selectedCustomer.id,
        amount,
      });
      toast.success("Collection Added");
      // Update due
      await axios.put("/api/customers/" + selectedCustomer.id, {
        due: selectedCustomer.due - amount,
      });
      setAmount("");
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Add Collection</h1>
        <select
          onChange={(e) =>
            setSelectedCustomer(customers.find((c) => c.id == e.target.value))
          }
          className="w-full border p-2"
        >
          <option value="">Select Customer with Due</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} - Due: {c.due}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full border p-2 mt-4"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
        >
          Add Collection
        </button>
        <BillPrint collection={{ amount, customer: selectedCustomer }} />
      </div>
    </div>
  );
}
