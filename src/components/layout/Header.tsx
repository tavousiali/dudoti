import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import MenuIcon from "./MenuIcon";
import MainSidebar from "./sidebar/MainSidebar";

type HeaderProp = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Header({ isSideBarOpen, setIsSideBarOpen }: HeaderProp) {
  return (
    <header className="bg-white" dir="ltr">
      <div className="relative flex h-16 items-center justify-between px-4">
        <button
          className={clsx("flex h-8 w-8 items-center justify-center menu-icon", isSideBarOpen && "open")}
          id="menu_btn"
          aria-label="menu"
          onClick={() => setIsSideBarOpen((old) => !old)}
        >
          <MenuIcon />
        </button>

        <div className="absolute left-1/2 top-10 -translate-x-1/2">
          <Image
            src="/images/logo.svg"
            alt="Dudoti"
            width={140}
            height={56}
            priority
          />
        </div>

        <div className="flex gap-4 font-bold uppercase">
          <span>FR</span>
          <span>EN</span>
        </div>
      </div>

      <div className="h-[9px] bg-[#ff2f2f]" />

      <MainSidebar isSideBarOpen={isSideBarOpen} />
    </header>
  );
}
