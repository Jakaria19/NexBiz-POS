"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, PackageSearch } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = document.cookie
      .split("; ")
      .find((row) => row.startsWith("role="))
      ?.split("=")[1];
    setRole(userRole);
    // Demo data for preview
    if (userRole === "demo") {
      setProducts([
        { id: 1, name: "Sample Denim Jacket", price: "2450" },
        { id: 2, name: "Cotton Polo Shirt", price: "850" },
      ]);
    }
  }, []);

  const addProduct = (e) => {
    e.preventDefault();
    if (role === "demo")
      return toast.error("DEMO MODE: Database changes are disabled.");

    const name = e.target.name.value;
    const price = e.target.price.value;
    const newProduct = { id: Date.now(), name, price };

    setProducts([...products, newProduct]);
    toast.success("Successfully entry added to Backend!");
    e.target.reset();
  };

  const removeProduct = (id) => {
    if (role === "demo") return toast.error("DEMO MODE: Delete restricted.");
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Deleted from Backend Record");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-10 rounded-[50px] shadow-2xl mb-12 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-blue-500 opacity-10">
            <PackageSearch size={120} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-8 uppercase italic tracking-tight">
            Backend Entry: <span className="text-blue-600">New Product</span>
          </h2>
          <form
            onSubmit={addProduct}
            className="flex flex-col md:flex-row gap-4 relative z-10"
          >
            <input
              name="name"
              placeholder="Item Description"
              className="flex-1 bg-slate-100 border-none p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
              required
            />
            <input
              name="price"
              placeholder="Price (৳)"
              className="w-full md:w-48 bg-slate-100 border-none p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
              required
            />
            <button
              type="submit"
              className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-600 transition flex items-center justify-center gap-2 uppercase tracking-widest text-xs shadow-xl"
            >
              <Plus size={18} /> Save Entry
            </button>
          </form>
        </div>

        <div className="bg-white rounded-[50px] shadow-2xl overflow-hidden border border-slate-100">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900 text-white font-bold uppercase text-[10px] tracking-[0.2em]">
                <th className="p-8">Reference ID</th>
                <th className="p-8">Product Name</th>
                <th className="p-8">Price</th>
                <th className="p-8 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-20 text-center text-slate-300 font-bold uppercase tracking-widest italic"
                  >
                    No Database Record Found
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50/50 transition">
                    <td className="p-8 text-slate-400 font-bold">
                      #{p.id.toString().slice(-6)}
                    </td>
                    <td className="p-8 font-black text-slate-800 uppercase italic tracking-tighter text-lg">
                      {p.name}
                    </td>
                    <td className="p-8 font-black text-blue-600">
                      ৳ {p.price}
                    </td>
                    <td className="p-8 text-center">
                      <button
                        onClick={() => removeProduct(p.id)}
                        className="text-red-400 hover:text-red-600 hover:scale-125 transition transform"
                      >
                        <Trash2 size={22} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
