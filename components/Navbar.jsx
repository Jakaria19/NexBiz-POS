"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "auth=; path=/; max-age=0";
    document.cookie = "role=; path=/; max-age=0";
    toast.success("Logged Out");
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl">
            NexBiz
          </Link>

          <div className="flex gap-6">
            <Link
              href="/dashboard"
              className={
                pathname.startsWith("/dashboard") ? "font-semibold" : ""
              }
            >
              Dashboard
            </Link>
            {document.cookie.includes("auth=") && (
              <button onClick={handleLogout} className="text-red-600">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
