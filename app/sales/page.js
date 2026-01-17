"use client";
import { useRouter } from "next/navigation";

export default function SalesList() {
  const router = useRouter();
  const sales = [
    {
      id: "SL-001",
      date: "2024-03-15",
      customer: "Walk-in Customer",
      total: "1200",
      profit: "350",
      status: "Paid",
    },
    {
      id: "SL-002",
      date: "2024-03-16",
      customer: "Rohim Uddin",
      total: "2500",
      profit: "800",
      status: "Due",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              SALES HISTORY
            </h1>
            <p className="text-slate-500 font-medium">
              Track all your transactions
            </p>
          </div>
          <button
            onClick={() => router.push("/sales/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold transition shadow-xl"
          >
            + CREATE NEW SALE
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-[28px] shadow-sm border-l-8 border-blue-500">
            <p className="text-slate-400 text-xs font-bold uppercase">
              Total Revenue
            </p>
            <h2 className="text-2xl font-black text-slate-800">৳ 1,24,500</h2>
          </div>
          <div className="bg-white p-6 rounded-[28px] shadow-sm border-l-8 border-emerald-500">
            <p className="text-slate-400 text-xs font-bold uppercase">
              Total Profit
            </p>
            <h2 className="text-2xl font-black text-emerald-600">৳ 32,800</h2>
          </div>
          <div className="bg-white p-6 rounded-[28px] shadow-sm border-l-8 border-red-500">
            <p className="text-slate-400 text-xs font-bold uppercase">
              Unpaid Due
            </p>
            <h2 className="text-2xl font-black text-red-500">৳ 5,400</h2>
          </div>
        </div>

        <div className="bg-white rounded-[35px] shadow-xl overflow-hidden border border-slate-100">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white uppercase text-xs tracking-widest">
              <tr>
                <th className="p-6">Invoice ID</th>
                <th className="p-6">Date</th>
                <th className="p-6">Customer</th>
                <th className="p-6">Amount</th>
                <th className="p-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sales.map((sale) => (
                <tr
                  key={sale.id}
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                >
                  <td className="p-6 font-bold text-blue-600">{sale.id}</td>
                  <td className="p-6 text-slate-500 font-medium">
                    {sale.date}
                  </td>
                  <td className="p-6 font-bold text-slate-800">
                    {sale.customer}
                  </td>
                  <td className="p-6 font-black text-slate-700">
                    ৳ {sale.total}
                  </td>
                  <td className="p-6 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                        sale.status === "Paid"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {sale.status}
                    </span>
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
