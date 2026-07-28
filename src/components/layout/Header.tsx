import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import MenuIcon from "./MenuIcon";
import MainSidebar from "./sidebar/MainSidebar";
import Link from "next/link";

type HeaderProp = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Header({ isSideBarOpen, setIsSideBarOpen }: HeaderProp) {
  return (
    <header className="bg-white" dir="ltr">
      <div className="relative flex h-16 items-center justify-between px-4">
        <button
          className={clsx("relative z-[102] flex h-8 w-8 items-center justify-center menu-icon cursor-pointer transition-all duration-300", isSideBarOpen && "open")}
          id="menu_btn"
          aria-label="menu"
          onClick={() => setIsSideBarOpen((old) => !old)}
        >
          <MenuIcon />
        </button>

        <div className="absolute left-1/2 top-10 -translate-x-1/2">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Dudoti"
              width={140}
              height={56}
              priority
            />
          </Link>
        </div>

        <div className="flex gap-4 font-bold uppercase">
          <a href="/en/" className="lang">
            <span className="lg">ENGLISH</span>
            <span className="sm">EN</span>
          </a>
          <a href="/fr/" className="lang">
            <span className="lg">FRENCH</span>
            <span className="sm">FR</span>
          </a>
        </div>
      </div>

      <div className="h-[9px] bg-[#ff2f2f]" />

      <MainSidebar
        isSideBarOpen={isSideBarOpen}
        onClose={() => setIsSideBarOpen(false)}
      />
    </header>
  );
}
