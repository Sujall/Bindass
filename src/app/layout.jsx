import "./globals.css";
import Header from '@/app/components/Header'; // This now matches the default export
import TabBarWrapper from "../app/components/TabBarWrapper";

export const metadata = {
  title: "Binadda",
  description: "Binadda Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#1a3144] min-h-screen">
        <div className="max-w-[480px] w-full mx-auto bg-[#e6ecf4] min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <TabBarWrapper />
        </div>
      </body>
    </html>
  );
}