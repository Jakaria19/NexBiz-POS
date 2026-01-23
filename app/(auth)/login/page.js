"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const existingRole = document.cookie
  //       .split("; ")
  //       .find((row) => row.startsWith("role="))
  //       ?.split("=")[1];

  //     if (existingRole) {
  //       setRole(existingRole);
  //     }
  //   }
  // }, []);

  const handleDemo = () => {
    document.cookie = "auth=democheck; path=/; max-age=3600";
    document.cookie = "role=demo; path=/; max-age=3600";
    toast.success("Demo Mode Activated");
    router.push("/dashboard");
  };

  const handleLogin = async (selectedRole) => {
    if (!email || !password) {
      toast.error("Email and password required");
      return;
    }

    try {
      const res = await axios.post("/api/auth", {
        email,
        password,
        role: selectedRole,
      });

      if (res.data.success) {
        document.cookie = `auth=${res.data.token}; path=/; max-age=3600`;
        document.cookie = `role=${selectedRole}; path=/; max-age=3600`;
        toast.success(`Logged in as ${selectedRole}`);
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      toast.error("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">NexBiz Login</h1>

        <div className="space-y-4 mb-8">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-4">
          <button
            onClick={handleDemo}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Demo Check (Dummy Data)
          </button>

          <button
            onClick={() => handleLogin("admin")}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Login as Admin
          </button>

          <button
            onClick={() => handleLogin("manager")}
            className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
          >
            Login as Manager
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          Admin: admin@nexbiz.com / admin123 <br />
          Manager: manager@nexbiz.com / manager123
        </p>
      </div>
    </div>
  );
}
