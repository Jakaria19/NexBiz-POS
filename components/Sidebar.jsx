"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieRole =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("role="))
          ?.split("=")[1] || null;
      setRole(cookieRole);
    }
  }, []);

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 fixed top-0 left-0 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">NexBiz</h2>
      <ul className="space-y-4">
        <li>
          <Link
            href="/products"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="/categories"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            Categories
          </Link>
        </li>
        <li>
          <Link href="/sales" className="block p-2 hover:bg-gray-700 rounded">
            Add Sale
          </Link>
        </li>
        <li>
          <Link
            href="/sales/list"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            Sale List
          </Link>
        </li>
        <li>
          <Link
            href="/customers"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            Customers
          </Link>
        </li>
        <li>
          <Link href="/dealers" className="block p-2 hover:bg-gray-700 rounded">
            Dealers
          </Link>
        </li>
        <li>
          <Link href="/dues" className="block p-2 hover:bg-gray-700 rounded">
            Dues
          </Link>
        </li>
        <li>
          <Link
            href="/salesmen"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            Salesmen
          </Link>
        </li>
        <li>
          <Link
            href="/collections"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            Add Collection
          </Link>
        </li>
        <li>
          <Link
            href="/payments"
            className="block p-2 hover:bg-gray-700 rounded"
          >
            Add Payment
          </Link>
        </li>
        {role !== "manager" && (
          <li>
            <Link
              href="/summary"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Summary
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
