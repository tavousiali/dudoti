"use client";

import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MenuIcon from "./MenuIcon";
import MainSidebar from "./sidebar/MainSidebar";
import Link from "next/link";
import Languages from "./Languages";

type HeaderProp = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Header({ isSideBarOpen, setIsSideBarOpen }: HeaderProp) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-white transition-all duration-300",
        scrolled ? "shadow-md" : ""
      )}
      dir="ltr"
    >
      <div
        className={clsx(
          "relative flex items-center justify-between px-14 transition-all duration-300",
          scrolled ? "h-14" : "h-[72px]"
        )}
      >
        <button
          className={clsx(
            "relative z-[102] flex h-10 w-10 items-center justify-center menu-icon cursor-pointer transition-all duration-300",
            isSideBarOpen && "open"
          )}
          id="menu_btn"
          aria-label="menu"
          onClick={() => setIsSideBarOpen((old) => !old)}
        >
          <MenuIcon />
        </button>

        <div className="absolute left-1/2 bottom-0 translate-y-[55%] -translate-x-1/2">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Dudoti"
              width={200}
              height={64}
              priority
            />
          </Link>
        </div>

        <Languages />
      </div>

      <div className="h-[16px] bg-[#ff2f2f]" />

      <MainSidebar
        isSideBarOpen={isSideBarOpen}
        onClose={() => setIsSideBarOpen(false)}
      />
    </header>
  );
}
