"use client";
import { useRouter } from "next/navigation";

export default function CustomerList() {
  const router = useRouter();
  const customers = [
    {
      id: "1616",
      name: "Walk-in Customer",
      address: "Dhaka",
      contact: "017...",
      balance: "0.00",
    },
    {
      id: "1614",
      name: "Rohim Uddin",
      address: "Chittagong",
      contact: "018...",
      balance: "500.00",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              CUSTOMER LIST
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              Manage your regular clients
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-blue-100">
            + ADD CUSTOMER
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-[32px] shadow-xl overflow-hidden border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-5 font-bold uppercase text-xs tracking-wider">
                  ID
                </th>
                <th className="p-5 font-bold uppercase text-xs tracking-wider">
                  Name
                </th>
                <th className="p-5 font-bold uppercase text-xs tracking-wider">
                  Contact
                </th>
                <th className="p-5 font-bold uppercase text-xs tracking-wider">
                  Balance
                </th>
                <th className="p-5 font-bold uppercase text-xs tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((cus) => (
                <tr key={cus.id} className="hover:bg-blue-50/50 transition">
                  <td className="p-5 font-bold text-slate-500 text-sm">
                    #{cus.id}
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{cus.name}</p>
                    <p className="text-xs text-slate-400">{cus.address}</p>
                  </td>
                  <td className="p-5 text-sm text-slate-600 font-medium">
                    {cus.contact}
                  </td>
                  <td className="p-5">
                    <span
                      className={`font-black ${
                        parseFloat(cus.balance) > 0
                          ? "text-red-500"
                          : "text-emerald-500"
                      }`}
                    >
                      ৳ {cus.balance}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-200 transition">
                        Report
                      </button>
                      <button className="bg-amber-100 text-amber-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-amber-200 transition">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
