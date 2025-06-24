"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "./components/Header";
import TabBarWrapper from "./components/TabBarWrapper";

export default function Layout({ children }) {
  const pathname = usePathname();

  const isGiveawayDetail = /^\/giveaway\/\d+$/.test(pathname); // Matches /giveaway/123, /giveaway/1, etc.

  return (
    <div className="max-w-[480px] w-full mx-auto bg-[#e6ecf4] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {!isGiveawayDetail && <TabBarWrapper />}
    </div>
  );
}
