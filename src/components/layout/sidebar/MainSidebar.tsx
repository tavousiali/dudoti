"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef } from "react";
import SidebarCat from "@/components/svg/SidebarCat";
import SidebarDog from "@/components/svg/SidebarDog";
import SidebarMask from "@/components/svg/SidebarMask";
import SidebarRodent from "@/components/svg/SidebarRodent";

type MainSidebarProp = {
  isSideBarOpen: boolean;
  onClose: () => void;
};

const MainSidebar = ({ isSideBarOpen, onClose }: MainSidebarProp) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSideBarOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if click is on menu button or inside it
      const menuButton = document.getElementById("menu_btn");
      if (menuButton && (menuButton === target || menuButton.contains(target))) {
        return; // Don't close if clicking on menu button
      }

      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(target)
      ) {
        onClose();
      }
    };

    // Add a small delay to prevent immediate closing when opening
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideBarOpen, onClose]);

  return (
    <nav>
      {/* menu-col */}
      <div
        ref={sidebarRef}
        className={clsx(
          "fixed top-0 z-[100] h-screen w-[50vw] bg-[#f9e0a4] shadow-[3px_0px_12px_2px_rgba(0,0,0,0.33)] transition-all duration-500",
          isSideBarOpen ? "left-0 delay-0" : "-left-[50vw] delay-500",
          "max-xl:w-[66vw] max-xl:-left-[70vw]",
          "max-lg:w-[75vw] max-lg:-left-[80vw]",
          "max-md:w-full max-md:-left-[105vw]",
          isSideBarOpen && "max-xl:left-0 max-lg:left-0 max-md:left-0"
        )}
        style={{ height: "-webkit-fill-available" }}
      >
        {/* menu-col-con */}
        <div
          className={clsx(
            "h-full w-full px-[90px] py-[45px] transition-all duration-300",
            isSideBarOpen ? "opacity-100 delay-500 px-[45px]" : "opacity-0 delay-100 px-[90px]",
            "max-md:px-[45px] max-md:py-[45px]",
            isSideBarOpen && "max-md:px-[15px]"
          )}
        >
          {/* menu-con */}
          <div className="relative flex h-full w-full flex-wrap items-end">
            {/* menu-pr-row */}
            <div className="flex w-full max-lg:flex-wrap">
              {/* Dog */}
              <div className="flex-grow p-[15px] max-lg:w-full max-lg:text-center max-md:p-0 max-md:pb-5">
                <div className="pr-char pr-dog group flex justify-center">
                  <Link href="/dog/all/" onClick={onClose}>
                    <div className="w-full max-lg:max-w-[160px] max-md:max-w-[100px]">
                      <SidebarDog />
                    </div>
                    <div className="m-0 p-[15px_0] text-2xl font-bold text-black transition-all duration-300 group-hover:text-[#f92f25] max-xl:text-lg max-lg:text-xl max-lg:p-[10px_0] max-md:text-base max-md:p-[5px_0]">
                      محصولات سگ
                    </div>
                  </Link>
                </div>
              </div>

              {/* Cat */}
              <div className="flex-grow p-[15px] max-lg:w-full max-lg:text-center max-md:p-0 max-md:pb-5">
                <div className="pr-char pr-cat group flex justify-center">
                  <Link href="/cat/all/" onClick={onClose}>
                    <div className="w-full max-lg:max-w-[160px] max-md:max-w-[100px]">
                      <SidebarCat />
                    </div>
                    <div className="m-0 p-[15px_0] text-2xl font-bold text-black transition-all duration-300 group-hover:text-[#f92f25] max-xl:text-lg max-lg:text-xl max-lg:p-[10px_0] max-md:text-base max-md:p-[5px_0]">
                      محصولات گربه
                    </div>
                  </Link>
                </div>
              </div>

              {/* Rodent */}
              <div className="flex-grow p-[15px] max-lg:w-full max-lg:text-center max-md:p-0 max-md:pb-5">
                <div className="pr-char pr-rabbit group flex justify-center">
                  <Link href="/rodent/all/" onClick={onClose}>
                    <div className="w-full max-lg:max-w-[160px] max-md:max-w-[100px]">
                      <SidebarRodent />
                    </div>
                    <div className="m-0 p-[15px_0] text-2xl font-bold text-black transition-all duration-300 group-hover:text-[#f92f25] max-xl:text-lg max-lg:text-xl max-lg:p-[10px_0] max-md:text-base max-md:p-[5px_0]">
                      محصولات جوندگان
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* menu-bottom-row */}
            <div className="w-full self-end">
              <ul className="m-0 flex justify-center list-none p-0">
                <li className="mx-5 inline-block">
                  <Link
                    href="/about/"
                    onClick={onClose}
                    className="block text-xl text-black transition-all duration-300 hover:text-[#f92f25] max-xl:text-lg max-md:text-base"
                  >
                    درباره‌ی دودوتی
                  </Link>
                </li>
                <li className="mx-5 inline-block">
                  <Link
                    href="/contact/"
                    onClick={onClose}
                    className="block text-xl text-black transition-all duration-300 hover:text-[#f92f25] max-xl:text-lg max-md:text-base"
                  >
                    تماس با ما
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <SidebarMask />
      </div>
    </nav>
  );
};

export default MainSidebar;
