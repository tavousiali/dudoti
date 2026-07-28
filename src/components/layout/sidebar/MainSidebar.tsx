"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef } from "react";
import SidebarCat from "@/components/svg/SidebarCat";
import SidebarDog from "@/components/svg/SidebarDog";
import SidebarMask from "@/components/svg/SidebarMask";
import SidebarRodent from "@/components/svg/SidebarRodent";
import "./main-sidebar.css";

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
      <div ref={sidebarRef} className={clsx("menu-col", isSideBarOpen && "in")}>
        <div className="menu-col-con">
          <div className="menu-con">
            <div className="row menu-pr-row">
              <div className="menu-pr-col">
                <div className="pr-char pr-dog">
                  <Link href="/dog/all/" onClick={onClose}>
                    <SidebarDog />
                    <div className="head">محصولات سگ</div>
                  </Link>
                </div>
              </div>
              <div className="menu-pr-col">
                <div className="pr-char pr-cat">
                  <Link href="/cat/all/" onClick={onClose}>
                    <SidebarCat />
                    <div className="head">محصولات گربه</div>
                  </Link>
                </div>
              </div>
              <div className="menu-pr-col">
                <div className="pr-char pr-rabbit">
                  <Link href="/rodent/all/" onClick={onClose}>
                    <SidebarRodent />
                    <div className="head">محصولات جوندگان</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row menu-bottom-row text-center">
              <ul>
                <li>
                  <Link href="/about/" onClick={onClose}>درباره‌ی دودوتی</Link>
                </li>
                <li>
                  <Link href="/contact/" onClick={onClose}>تماس با ما</Link>
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
