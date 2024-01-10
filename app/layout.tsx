import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Date Calculator",
  description: "",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="lemonade">
      <head></head>
      <body className={inter.className}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
