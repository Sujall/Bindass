import React from "react";
import Header from "./components/Header";
import TabBarWrapper from "./components/TabBarWrapper";

export default function layout({ children }) {
  return (
    <div className="max-w-[480px] w-full mx-auto bg-[#e6ecf4] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <TabBarWrapper />
    </div>
  );
}
