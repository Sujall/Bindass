import "./globals.css";

export const metadata = {
  title: "Bindaas Giveaways",
  description: "Join Bindaas Giveaways and win exciting prizes every day!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Optional theme color */}
        <meta name="theme-color" content="#1a3144" />
      </head>

      <body className="bg-[#1a3144] min-h-screen">{children}</body>
    </html>
  );
}
