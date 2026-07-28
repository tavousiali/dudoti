"use client";
import clsx from "clsx";
import { useState } from "react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <html lang="fa" dir="rtl">
      <body className={clsx(isSideBarOpen && "oh")}>
        <Header
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
