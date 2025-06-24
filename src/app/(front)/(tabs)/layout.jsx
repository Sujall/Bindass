// src/app/(tabs)/layout.jsx
import { Header } from "@/components/Header";
import TabBarWrapper from "@/components/TabBarWrapper";

export default function TabsLayout({ children }) {
  return (
    <div className="max-w-full w-full mx-auto bg-[#e6ecf4] min-h-screen flex flex-col px-4 sm:px-8 md:max-w-[480px] md:w-full">
      <Header />
      <main className="flex-1 pb-16">{children}</main>
      <TabBarWrapper />
    </div>
  );
}
