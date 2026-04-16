import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paykar | Clear Wallet Transfers",
  description:
    "A polished wallet experience for signup, balance checks, user search, and protected money transfers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
