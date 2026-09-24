"use client";

import clsx from "clsx";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";

export default function RootLayoutClient({
  children,
  footer,
  dir = "rtl",
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
  /** Page direction — supplied by each locale's server layout so the body
   *  gets the correct dir attribute on the very first server render,
   *  with no reliance on client-side context. */
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
      />
      {children}
      {footer}
    </body>
  );
}
