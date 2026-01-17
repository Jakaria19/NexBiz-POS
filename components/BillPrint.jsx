"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function BillPrint({ cart, total, customer }) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button
        onClick={handlePrint}
        className="bg-green-600 text-white py-2 px-4 rounded mt-4"
      >
        Print Bill
      </button>
      <div ref={componentRef} className="p-4 bg-white border">
        <h2>NexBiz Bill</h2>
        <p>Customer: {customer?.name}</p>
        <table className="w-full">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.sellPrice * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total: {total}</p>
      </div>
    </div>
  );
}
