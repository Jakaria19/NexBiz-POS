"use client";

import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import JsBarcode from "jsbarcode";
import { useReactToPrint } from "react-to-print";

export default function BarcodeGenerator() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [layout, setLayout] = useState("2x3");
  const componentRef = useReactToPrint({
    content: () => document.getElementById("printable"),
  });

  useEffect(() => {
    axios.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handlePrint = () => {
    componentRef.current.handlePrint();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Barcode Generator</h1>
        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          className="border p-2 mb-4"
        >
          <option value="2x3">2x3 Grid</option>
          <option value="3x4">3x4 Grid</option>
        </select>

        <div className="mb-6">
          <h2 className="text-2xl mb-4">Select Products for Barcodes</h2>
          <ul className="space-y-2">
            {products.map((p) => (
              <li key={p.id} className="flex items-center border p-2">
                <input
                  type="checkbox"
                  checked={selected.includes(p.id)}
                  onChange={() => handleSelect(p.id)}
                  className="mr-2"
                />
                {p.name} - Barcode: {p.barcode}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Print Selected Barcodes
        </button>

        {/* Printable Area */}
        <div id="printable" className="hidden print:block">
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                layout === "2x3" ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: "10px",
            }}
          >
            {selected.map((id) => {
              const p = products.find((p) => p.id === id);
              return (
                <div key={id} className="text-center border p-4">
                  <p>{p.name}</p>
                  <canvas
                    ref={(ref) =>
                      JsBarcode(ref, p.barcode, {
                        format: "CODE128",
                        displayValue: true,
                      })
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
