"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TrendingProducts({ onAdd }) {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    // Simulate trending from sales data
    axios
      .get("/api/sales?trending=true")
      .then((res) => setTrending(res.data.slice(0, 5)));
  }, []);

  return (
    <div className="mt-4">
      <h3 className="font-bold">Week's Top Trending Products</h3>
      <div className="grid grid-cols-3 gap-4">
        {trending.map((product) => (
          <button
            key={product.id}
            onClick={() => onAdd(product)}
            className="border p-2 hover:bg-gray-100"
          >
            {product.name}
          </button>
        ))}
      </div>
    </div>
  );
}
