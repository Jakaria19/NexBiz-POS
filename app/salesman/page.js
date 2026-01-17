// src/app/salesman/page.js
"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SalesmanPage() {
  const [staff, setStaff] = useState([
    { id: 1, name: "Rahim", totalSale: 5000 },
  ]);

  const addStaff = (e) => {
    e.preventDefault();
    const name = e.target.staffName.value;
    setStaff([...staff, { id: Date.now(), name, totalSale: 0 }]);
    toast.success("Salesman added!");
    e.target.reset();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Salesman Tracking</h2>
      <form onSubmit={addStaff} className="flex gap-2">
        <input
          name="staffName"
          placeholder="New Salesman Name"
          className="border p-2 flex-1"
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Salesman
        </button>
      </form>

      <div className="bg-white p-4 shadow rounded">
        {staff.map((s) => (
          <div key={s.id} className="flex justify-between border-b py-2">
            <span>{s.name}</span>
            <span className="font-bold text-blue-600">
              Total Sale: ৳{s.totalSale}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
