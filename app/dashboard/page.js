"use client";

import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">Welcome to NexBiz Dashboard</h1>
        <p>Select a section from the sidebar to manage your shop.</p>
      </div>
    </div>
  );
}
