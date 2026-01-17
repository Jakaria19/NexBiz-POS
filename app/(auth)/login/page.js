"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const pass = e.target.password.value;

    if (selectedRole === "admin" && pass === "Admin@1234") {
      document.cookie = "role=admin; path=/";
      toast.success("Welcome Admin! Accessing Live Backend.");
      router.push("/dashboard");
    } else if (selectedRole === "manager" && pass === "Manager@1234") {
      document.cookie = "role=manager; path=/";
      toast.success("Welcome Manager! Accessing Sales.");
      router.push("/sales");
    } else {
      toast.error("Incorrect Password!");
    }
  };

  const handleDemoMode = () => {
    document.cookie = "role=demo; path=/";
    toast.success("Entering Demo Mode (Preview Only)");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1d] p-4 font-sans">
      <div className="bg-[#131b2e] p-10 rounded-[50px] shadow-2xl w-full max-w-md border border-white/5">
        <h1 className="text-3xl font-black text-center text-white mb-10 italic uppercase tracking-tighter">
          NexBiz <span className="text-blue-500">POS</span>
        </h1>

        {!selectedRole ? (
          <div className="space-y-4">
            <button
              onClick={handleDemoMode}
              className="w-full py-4 rounded-2xl font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition uppercase text-xs tracking-widest"
            >
              Demo Check (Static Preview)
            </button>
            <div className="h-[1px] bg-white/5 my-4"></div>
            <button
              onClick={() => setSelectedRole("admin")}
              className="w-full py-5 rounded-3xl font-black bg-blue-600 hover:bg-blue-500 text-white transition text-lg shadow-xl shadow-blue-900/20 uppercase"
            >
              Admin Login
            </button>
            <button
              onClick={() => setSelectedRole("manager")}
              className="w-full py-5 rounded-3xl font-black bg-slate-800 hover:bg-slate-700 text-white transition text-lg uppercase"
            >
              Manager Login
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleLogin}
            className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="bg-blue-500/10 p-4 rounded-2xl text-center border border-blue-500/20">
              <p className="text-blue-400 font-bold text-xs uppercase tracking-widest tracking-widest">
                Verifying {selectedRole} Identity
              </p>
            </div>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-white/10 p-5 rounded-3xl text-white text-center text-3xl tracking-[0.3em] outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              autoFocus
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="py-4 bg-slate-800 rounded-2xl font-bold text-slate-400 hover:text-white transition"
              >
                BACK
              </button>
              <button
                type="submit"
                className="py-4 bg-blue-600 rounded-2xl font-black text-white hover:bg-blue-500 transition shadow-lg"
              >
                CONTINUE
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
