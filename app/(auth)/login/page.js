"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleDemo = () => {
    document.cookie = "auth=democheck; path=/; max-age=3600";
    document.cookie = "role=demo; path=/; max-age=3600";
    toast.success("Entered Demo Mode");
    router.push("/dashboard");
  };

  const handleLogin = async (selectedRole) => {
    setRole(selectedRole);
    try {
      const res = await axios.post("/api/auth", {
        email,
        password,
        role: selectedRole,
      });
      if (res.data.success) {
        document.cookie = `auth=${res.data.token}; path=/; max-age=3600`;
        document.cookie = `role=${selectedRole}; path=/; max-age=3600`;
        toast.success("Login Successful");
        router.push("/dashboard");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error("Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Login to NexBiz</h1>

      <form className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
      </form>

      <div className="mt-6 space-y-4">
        <button
          onClick={handleDemo}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Demo Check (Hardcoded Dummy)
        </button>
        <button
          onClick={() => handleLogin("admin")}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login as Admin
        </button>
        <button
          onClick={() => handleLogin("manager")}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Login as Manager
        </button>
      </div>

      <p className="text-center mt-4 text-sm text-gray-600">
        Admin: admin@nexbiz.com / admin123 | Manager: manager@nexbiz.com /
        manager123
      </p>
    </div>
  );
}
