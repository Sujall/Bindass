"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { FiMenu } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import NavbarSimple from "./components/Navbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-neutral-900">
        {/* Mobile Top Navbar */}
        <header className="bg-black text-white p-4 flex justify-between items-center lg:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
            className="text-white"
          >
            {sidebarOpen ? (
              <MdOutlineCancel className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </header>

        {/* Custom Dashboard Navbar (desktop) */}
        <NavbarSimple />

        {/* Main content area */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
