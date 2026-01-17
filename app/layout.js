import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "NexBiz - Inventory Management",
  description: "Modern inventory and sales management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
