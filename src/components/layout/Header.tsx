"use client";

import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MenuIcon from "./MenuIcon";
import MainSidebar from "./sidebar/MainSidebar";
import type { SidebarCategory } from "./sidebar/MainSidebar";
import Link from "next/link";
import Languages from "./Languages";
import { useLocalePath } from "./useLocalePath";
import { useLocale } from "./LocaleContext";

type HeaderProp = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
  categories: SidebarCategory[];
};

export default function Header({ isSideBarOpen, setIsSideBarOpen, categories }: HeaderProp) {
  const [scrolled, setScrolled] = useState(false);
  const lp = useLocalePath();
  const { dir } = useLocale();
  const isLtr = dir === "ltr";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-[60] bg-white transition-all duration-300",
        scrolled ? "shadow-md" : ""
      )}
      dir="ltr"
    >
      {/*
        RTL (fa):  hamburger-left  | logo-center | langs-right
        LTR (en/fr): langs-left   | logo-center | hamburger-right
        flex-row-reverse flips the two side items visually.
      */}
      <div
        className={clsx(
          "relative flex items-center justify-between md:px-14 transition-all duration-300",
          scrolled ? "h-14" : "h-[72px]",
          "max-md:h-[51px]",
          isLtr ? "flex-row-reverse" : "flex-row"
        )}
      >
        <button
          className={clsx(
            "relative z-[102] flex h-10 w-10 max-md:w-[30px] max-md:h-[30px] items-center justify-center menu-icon cursor-pointer transition-all duration-300",
            "max-md:ms-[15px]",
            isSideBarOpen && "open"
          )}
          id="menu_btn"
          aria-label="menu"
          onClick={() => setIsSideBarOpen((old) => !old)}
        >
          <MenuIcon />
        </button>

        <div className="absolute left-1/2 bottom-0 translate-y-[55%] -translate-x-1/2">
          <Link href={lp("/")}>
            <Image
              src="/images/logo.svg"
              alt="Dudoti"
              width={200}
              height={64}
              priority
              className="w-[200px] max-md:w-[120px]"
            />
          </Link>
        </div>

        <div className="max-md:me-[15px] max-md:text-[1rem]">
          <Languages />
        </div>
      </div>

      <div className="h-[16px] max-md:h-[9px] bg-[#ff2f2f]" />

      <MainSidebar
        isSideBarOpen={isSideBarOpen}
        onClose={() => setIsSideBarOpen(false)}
        categories={categories}
      />
    </header>
  );
}
