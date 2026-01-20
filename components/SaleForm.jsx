"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import JsBarcode from "jsbarcode";
import TrendingProducts from "@/components/TrendingProducts";
import BillPrint from "@/components/BillPrint";

export default function SaleForm({ onSuccess }) {
  const [customer, setCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [barcode, setBarcode] = useState("");
  const barcodeRef = useRef(null);
  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "" });
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [saleType, setSaleType] = useState("sale"); // sale, return, view-only

  useEffect(() => {
    axios.get("/api/customers").then((res) => setCustomers(res.data));
    axios.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  useEffect(() => {
    if (barcode) {
      const product = products.find((p) => p.barcode === barcode);
      if (product) addToCart(product);
      setBarcode("");
    }
  }, [barcode]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, qty: 1 }]);
    toast.success(`${product.name} added to cart`);
  };

  const handleScan = (e) => setBarcode(e.target.value);

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.sellPrice * item.qty,
      0,
    );
    const profit = cart.reduce(
      (sum, item) => sum + (item.sellPrice - item.buyPrice) * item.qty,
      0,
    );
    return { subtotal, total: subtotal - discount, profit };
  };

  const handleSubmit = async () => {
    const { total, profit } = calculateTotal();
    try {
      if (saleType === "sale") {
        await axios.post("/api/sales", {
          cart,
          customerId: customer?.id,
          discount,
          paymentMethod,
          total,
          profit,
          type: "sale",
        });
        toast.success("Sale Added");
      } else if (saleType === "return") {
        await axios.post("/api/sales", {
          cart,
          customerId: customer?.id,
          discount,
          paymentMethod,
          total,
          profit,
          type: "return",
        });
        toast.success("Return Processed");
      } else if (saleType === "view-only") {
        await axios.post("/api/sales", {
          cart,
          customerId: customer?.id,
          discount,
          paymentMethod,
          total,
          profit,
          type: "view-only",
        });
        toast.success("View-Only Logged");
      }
      if (customer) {
        await axios.put(`/api/customers/${customer.id}`, {
          totalAmount: customer.totalAmount + total,
          due: customer.due + (total - paid),
        }); // Assume paid logic
      }
      onSuccess();
    } catch (err) {
      toast.error("Failed");
    }
  };

  const addNewCustomer = async () => {
    try {
      const res = await axios.post("/api/customers", newCustomer);
      setCustomers([...customers, res.data]);
      setCustomer(res.data);
      setShowNewCustomer(false);
      toast.success("Customer Added");
    } catch (err) {
      toast.error("Failed");
    }
  };

  const selectCustomer = (cust) => {
    setCustomer(cust);
    toast.success(
      `Selected ${cust.name} | Prev Amount: ${cust.totalAmount} | Due: ${cust.due}`,
    );
  };

  useEffect(() => {
    if (barcodeRef.current) JsBarcode(barcodeRef.current, "sample-barcode");
  }, []);

  return (
    <div className="space-y-4">
      {/* Sale Type */}
      <div>
        <label>Sale Type</label>
        <select
          value={saleType}
          onChange={(e) => setSaleType(e.target.value)}
          className="w-full border p-2"
        >
          <option value="sale">Sale</option>
          <option value="return">Return</option>
          <option value="view-only">View Only</option>
        </select>
      </div>

      {/* Customer Search/Add */}
      <div>
        <label>Search Customer</label>
        <select
          onChange={(e) =>
            selectCustomer(customers.find((c) => c.id == e.target.value))
          }
          className="w-full border p-2"
        >
          <option value="">Select</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} - {c.phone}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowNewCustomer(true)}
          className="mt-2 bg-green-600 text-white py-1 px-2 rounded"
        >
          New Customer
        </button>
        {showNewCustomer && (
          <div className="mt-2 space-y-2">
            <input
              placeholder="Name"
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
              className="w-full border p-2"
            />
            <input
              placeholder="Phone"
              value={newCustomer.phone}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
              className="w-full border p-2"
            />
            <button
              onClick={addNewCustomer}
              className="bg-blue-600 text-white py-1 px-2 rounded"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Barcode Scan */}
      <div>
        <label>Scan Barcode</label>
        <input
          value={barcode}
          onChange={handleScan}
          placeholder="Scan or Enter Barcode"
          className="w-full border p-2"
        />
        <canvas ref={barcodeRef} className="mt-2"></canvas>
      </div>

      {/* Trending */}
      <TrendingProducts onAdd={addToCart} />

      {/* Cart */}
      <div>
        <h3>Cart</h3>
        {cart.map((item, idx) => (
          <div key={idx} className="flex justify-between">
            <span>{item.name}</span>
            <input
              type="number"
              value={item.qty}
              onChange={(e) => {
                const newCart = [...cart];
                newCart[idx].qty = parseInt(e.target.value);
                setCart(newCart);
              }}
              className="w-20 border p-1"
            />
            <span>{item.sellPrice * item.qty}</span>
          </div>
        ))}
      </div>

      {/* Discount */}
      <div>
        <label>Discount</label>
        <select
          value={discount}
          onChange={(e) => setDiscount(parseInt(e.target.value))}
          className="w-full border p-2"
        >
          <option value="0">None</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {/* Payment */}
      <div>
        <label>Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border p-2"
        >
          <option value="cash">Cash</option>
          <option value="bkash">bKash</option>
          <option value="nagad">Nagad</option>
          <option value="rocket">Rocket</option>
          <option value="card">Card</option>
          <option value="bank">Bank</option>
        </select>
      </div>

      <p>
        Total: {calculateTotal().total} | Profit: {calculateTotal().profit}
      </p>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Complete
      </button>

      {/* Bill Print */}
      <BillPrint
        cart={cart}
        total={calculateTotal().total}
        customer={customer}
      />
    </div>
  );
}
