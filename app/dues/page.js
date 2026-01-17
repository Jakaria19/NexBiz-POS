// Copy Customers page and filter cust.due > 0
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dues() {
  const [dues, setDues] = useState([]);

  useEffect(() => {
    axios
      .get("/api/customers")
      .then((res) => setDues(res.data.filter((c) => c.due > 0)));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Due List</h1>
        <table className="w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            {dues.map((cust) => (
              <tr key={cust.id}>
                <td>{cust.name}</td>
                <td>{cust.phone}</td>
                <td>{cust.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
