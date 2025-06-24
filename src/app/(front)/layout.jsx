"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "./components/Header";
import TabBarWrapper from "./components/TabBarWrapper";

export default function Layout({ children }) {
  const pathname = usePathname();

const isGiveawayDetail = /^\/giveaway\/[a-zA-Z0-9_-]+$/.test(pathname);

  return (
    <div className="max-w-[480px] w-full mx-auto bg-[#e6ecf4] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {!isGiveawayDetail && <TabBarWrapper />}
    </div>
  );
}
