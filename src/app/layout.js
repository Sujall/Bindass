// src/app/layout.js
import "./globals.css";
import { Header } from "./(front)/components/Header";
import TabBarWrapper from "./(front)/components/TabBarWrapper"; // ✅ use the wrapper

export const metadata = {
  title: "Bindaas",
  description: "Bindaas Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#1a3144] min-h-screen">
        <div className="max-w-[480px] w-full mx-auto bg-[#e6ecf4] min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pb-16">{children}</main>
          <TabBarWrapper /> {/* ✅ now safe */}
        </div>
      </body>
    </html>
  );
}
