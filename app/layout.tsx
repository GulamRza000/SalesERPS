import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "./componants/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "ERP System for product management",
  description: "ERP System for product management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
