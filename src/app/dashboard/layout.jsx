"use client";

import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-white">
        {/* Sidebar with fixed width */}
        <div className="w-[280px] border-r border-gray-200">
          <AppSidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
