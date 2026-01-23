"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import JsBarcode from "jsbarcode";
import { useReactToPrint } from "react-to-print";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";

export default function BarcodeGenerator() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [layout, setLayout] = useState("2x4");
  const [loading, setLoading] = useState(true);

  const printRef = useRef();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data || []);
      } catch (err) {
        toast.error("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "NexBiz_Barcodes",
    onAfterPrint: () => toast.success("Print job sent"),
  });

  const selectedProducts = products.filter((p) => selected.includes(p.id));

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 ml-64 flex items-center justify-center">
          <p className="text-xl">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Barcode Generator & Printer</h1>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium mb-1">
              Sticker Layout
            </label>
            <select
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              className="border p-3 rounded w-full sm:w-48"
            >
              <option value="1x1">1×1 (Single)</option>
              <option value="2x2">2×2</option>
              <option value="2x4">2×4</option>
              <option value="3x5">3×5 (A4 Sheet)</option>
              <option value="4x6">4×6</option>
            </select>
          </div>

          <button
            onClick={handlePrint}
            disabled={selected.length === 0}
            className="bg-green-600 text-white py-3 px-8 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Print Selected ({selected.length})
          </button>
        </div>

        {/* Product Selection */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">
              Select Products to Generate Barcodes
            </h2>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {products.length === 0 ? (
              <p className="p-8 text-center text-gray-500">
                No products available
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selected.includes(product.id)
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                        : "hover:border-gray-400"
                    }`}
                    onClick={() => toggleSelect(product.id)}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(product.id)}
                        readOnly
                        className="mt-1"
                      />
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Barcode:{" "}
                          <span className="font-mono">{product.barcode}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Category: {product.category} | Brand: {product.brand}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hidden Printable Area */}
        <div ref={printRef} className="hidden print:block p-4">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: layout.split("x")[1]
                ? `repeat(${layout.split("x")[1]}, 1fr)`
                : "repeat(4, 1fr)",
              gap: "16px",
              padding: "10px",
            }}
          >
            {selectedProducts.map((p) => (
              <div
                key={p.id}
                className="border border-gray-400 p-4 text-center bg-white"
              >
                <div className="font-medium text-sm mb-2">{p.name}</div>
                <canvas
                  ref={(ref) => {
                    if (ref)
                      JsBarcode(ref, p.barcode, {
                        format: "CODE128",
                        width: 2,
                        height: 60,
                        displayValue: true,
                        fontSize: 14,
                      });
                  }}
                />
                <div className="text-xs mt-1 text-gray-600">
                  Price: {p.sellPrice} TK
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
