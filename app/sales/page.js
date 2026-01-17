"use client";

import Sidebar from "@/components/Sidebar";
import SaleForm from "@/components/SaleForm";

export default function AddSalePage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Add New Sale</h1>
        <SaleForm onSuccess={() => alert("Sale added!")} />
      </div>
    </div>
  );
}
