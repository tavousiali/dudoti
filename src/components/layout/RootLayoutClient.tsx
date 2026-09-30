"use client";

import clsx from "clsx";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import type { SidebarCategory } from "@/components/layout/sidebar/MainSidebar";

export default function RootLayoutClient({
  children,
  footer,
  categories,
  dir = "rtl",
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
  categories: SidebarCategory[];
  /** Page direction — supplied by each locale's server layout */
  dir?: "rtl" | "ltr";
}) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const pathname = usePathname();

  const isAdminPanel = pathname?.startsWith("/AdminPanel");

  if (isAdminPanel) {
    return <body>{children}</body>;
  }

  return (
    <body dir={dir} className={clsx(isSideBarOpen && "oh")}>
      <Header
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        categories={categories}
      />
      {children}
      {footer}
    </body>
  );
}
