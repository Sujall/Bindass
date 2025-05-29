import "./globals.css";

export const metadata = {
  title: "Bindaas",
  description: "Bindaas Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#1a3144] min-h-screen">{children}</body>
    </html>
  );
}
