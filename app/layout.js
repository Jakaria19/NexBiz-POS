import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

export const metadata = {
  title: "NexBiz",
  description: "Inventory Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <Navbar />
        <div className="flex">
          <Suspense fallback={<div className="w-64 bg-gray-800 h-screen" />}>
            <Sidebar />
          </Suspense>
          <main className="flex-1 ml-64">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
