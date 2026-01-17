"use client";
import { useRouter } from "next/navigation";
import { ShieldCheck, BarChart3, Zap, Box, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      title: "Universal Inventory",
      desc: "Manage stock for any business with low-stock alerts.",
      icon: <Box size={32} />,
    },
    {
      title: "Flash POS",
      desc: "Super fast billing system for retail and wholesale shops.",
      icon: <Zap size={32} />,
    },
    {
      title: "Real Analytics",
      desc: "Track live sales, profit, and loss in one dashboard.",
      icon: <BarChart3 size={32} />,
    },
    {
      title: "Multi-Role Access",
      desc: "Secure panels for Admin, Manager, and Demo users.",
      icon: <ShieldCheck size={32} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white font-sans selection:bg-blue-500/30">
      <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto border-b border-white/5">
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">
          NexBiz <span className="text-blue-500">POS</span>
        </h1>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 hover:bg-blue-500 px-8 py-2 rounded-full font-bold transition shadow-lg shadow-blue-500/20"
        >
          USE SOFTWARE
        </button>
      </nav>

      <section className="flex flex-col items-center justify-center text-center py-24 px-6 max-w-5xl mx-auto">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold tracking-widest uppercase">
          Multi-Purpose Business Solution
        </div>
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
          Run your business <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Smarter & Faster
          </span>
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12">
          The most flexible POS system for retail, garments, electronics, and
          more. Manage everything in one platform.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="group bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition transform shadow-2xl flex items-center gap-3"
        >
          GET STARTED NOW <ArrowRight size={24} />
        </button>
      </section>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-8 pb-32">
        {features.map((f, i) => (
          <div
            key={i}
            className="group p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-500"
          >
            <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
