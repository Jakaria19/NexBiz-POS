"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userRole = document.cookie
      .split("; ")
      .find((row) => row.startsWith("role="))
      ?.split("=")[1];
    if (!userRole) router.push("/login");
    else setRole(userRole);
  }, []);

  if (!role)
    return (
      <div className="min-h-screen bg-[#0a0f1d] flex items-center justify-center text-white font-black italic animate-pulse tracking-widest">
        LOADING DATABASE...
      </div>
    );

  if (role === "manager") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10">
        <h1 className="text-6xl font-black text-red-500 mb-4 tracking-tighter uppercase">
          Access Denied
        </h1>
        <p className="text-slate-500 font-bold mb-8">
          Summary analytics are restricted to Admin role only.
        </p>
        <button
          onClick={() => router.push("/sales")}
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition"
        >
          GO TO SALES POS
        </button>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Product",
      val: "4,642",
      color: "from-cyan-400 to-blue-600",
    },
    {
      label: "Total Sale",
      val: "৳ 1,24,500",
      color: "from-purple-400 to-indigo-600",
    },
    {
      label: "Net Profit",
      val: "৳ 32,800",
      color: "from-emerald-400 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase italic">
              Dashboard
            </h1>
            <p className="text-slate-400 font-bold text-[10px] tracking-[0.2em]">
              {role === "demo"
                ? "DASHBOARD PREVIEW (STATIC)"
                : "ADMIN CONTROL PANEL (LIVE)"}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/sales")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-lg"
            >
              + NEW SALE
            </button>
            <button
              onClick={() => router.push("/products")}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-lg"
            >
              + ADD PRODUCT
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${s.color} p-10 rounded-[45px] text-white shadow-2xl transition hover:scale-105 group cursor-pointer`}
            >
              <p className="text-white/60 font-bold uppercase text-[10px] tracking-widest mb-2">
                {s.label}
              </p>
              <h2 className="text-4xl font-black tracking-tighter">{s.val}</h2>
              <div className="mt-6 bg-white/20 w-fit px-4 py-1 rounded-full text-[9px] font-black group-hover:bg-white/30 transition uppercase">
                View Analytics →
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-20 rounded-[60px] shadow-2xl shadow-slate-200 border border-slate-100 flex items-center justify-center">
          <p className="text-slate-200 font-black text-6xl uppercase tracking-tighter opacity-30 italic text-center">
            Business Performance Visualization
          </p>
        </div>
      </div>
    </div>
  );
}
