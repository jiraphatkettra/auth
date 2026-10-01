import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "รายการสินค้า - Product Explorer",
  description: "ระบบจัดการและสำรวจรายการสินค้าด้วย React Hook Form, Zod และ External API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark">
      <body className="min-h-screen bg-black text-[#f5f5f7] antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
