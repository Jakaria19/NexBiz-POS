"use client";

export default function AdvancedSummary() {
  const stats = [
    {
      title: "Net Sales",
      value: "৳ 1,45,200",
      growth: "+12%",
      color: "text-blue-600",
    },
    {
      title: "Net Profit",
      value: "৳ 42,000",
      growth: "+8%",
      color: "text-emerald-600",
    },
    {
      title: "Expenses",
      value: "৳ 12,500",
      growth: "-2%",
      color: "text-red-500",
    },
    {
      title: "Stock Value",
      value: "৳ 8,12,000",
      growth: "Stable",
      color: "text-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-800">
            BUSINESS INSIGHTS
          </h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em] mt-2 italic">
            Performance Analytics Overview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-[50px] shadow-2xl shadow-slate-200 flex justify-between items-center group hover:bg-slate-900 transition-all duration-500"
            >
              <div>
                <p className="text-slate-400 font-bold text-sm mb-1 group-hover:text-white/50">
                  {s.title}
                </p>
                <h2
                  className={`text-4xl font-black tracking-tighter ${s.color} group-hover:text-white`}
                >
                  {s.value}
                </h2>
              </div>
              <div className="text-right">
                <span className="bg-slate-100 group-hover:bg-white/10 px-4 py-1 rounded-full text-xs font-black group-hover:text-white transition">
                  {s.growth}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Report Section Placeholder */}
        <div className="bg-slate-900 h-[300px] rounded-[60px] p-10 flex items-center justify-center border-8 border-white shadow-2xl">
          <p className="text-white/20 font-black text-5xl uppercase tracking-tighter">
            Sales Chart Visualization
          </p>
        </div>
      </div>
    </div>
  );
}
