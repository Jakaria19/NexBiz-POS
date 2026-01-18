"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // শুধু client-side এ চলবে (সার্ভারে document থাকে না)
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("role="))
      ?.split("=")[1];

    setRole(cookieValue || null);
  }, []); // একবার চলবে (mount হওয়ার সময়)

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 fixed top-0 left-0 overflow-y-auto z-50">
      <div className="flex items-center justify-center mb-10">
        <h2 className="text-2xl font-bold">NexBiz</h2>
      </div>

      <ul className="space-y-3">
        <li>
          <Link
            href="/products"
            className="block p-3 rounded hover:bg-gray-700 transition-colors"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="/categories"
            className="block p-3 rounded hover:bg-gray-700 transition-colors"
          >
            Categories
          </Link>
        </li>
        <li>
          <Link
            href="/sales"
            className="block p-3 rounded hover:bg-gray-700 transition-colors"
          >
            Add Sale
          </Link>
        </li>
        <li>
          <Link
            href="/sales/list"
            className="block p-3 rounded hover:bg-gray-700 transition-colors"
          >
            Sale List
          </Link>
        </li>
        <li>
          <Link
            href="/customers"
            className="block p-3 rounded hover:bg-gray-700 transition-colors"
          >
            Customers
          </Link>
        </li>
        <li>
          <Link
            href="/dealers"
            className="block p-3 rounded hover:bg-gray-700 transition-colors"
          >
            Dealers
          </Link>
        </li>
        <li>
          <Link
            href="/dues"
            className="block p-3 rounded hover:bg-gray-700 transition-colors"
          >
            Dues
          </Link>
        </li>
        <li>
          <Link
            href="/salesmen"
            className="block p-3 rounded hover:bg-gray-700 transition-colors"
          >
            Salesmen
          </Link>
        </li>

        {/* Manager role-এ Summary লুকাবে */}
        {role !== "manager" && (
          <li>
            <Link
              href="/summary"
              className="block p-3 rounded hover:bg-gray-700 transition-colors"
            >
              Summary
            </Link>
          </li>
        )}
      </ul>

      {/* Optional: Logout button বা অন্য কিছু যোগ করতে পারো */}
      <div className="mt-10">
        <button
          onClick={() => {
            document.cookie = "auth=; path=/; max-age=0";
            document.cookie = "role=; path=/; max-age=0";
            window.location.href = "/login";
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
