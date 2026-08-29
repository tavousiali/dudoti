"use client";
import clsx from "clsx";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";

export default function RootLayoutClient({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const pathname = usePathname();

  const isAdminPanel = pathname?.startsWith("/AdminPanel");

  if (isAdminPanel) {
    return <body>{children}</body>;
  }

  return (
    <body className={clsx(isSideBarOpen && "oh")}>
      <Header
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      {children}
      {footer}
    </body>
  );
}
