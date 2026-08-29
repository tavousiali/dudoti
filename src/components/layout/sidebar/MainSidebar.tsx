"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SidebarMask from "@/components/svg/SidebarMask";
import SidebarCategoryIcon from "@/components/svg/SidebarCategoryIcon";

type Category = {
  Id: number;
  Title: string;
  Pic1: string | null;
  urlTitle: string | null;
};

type MainSidebarProp = {
  isSideBarOpen: boolean;
  onClose: () => void;
};

function buildRows(cats: Category[], perRow: number): Category[][] {
  if (cats.length <= perRow) return [cats];
  if (cats.length === 4 && perRow === 2) return [cats.slice(0, 2), cats.slice(2)];
  const rows: Category[][] = [];
  for (let i = 0; i < cats.length; i += perRow) rows.push(cats.slice(i, i + perRow));
  return rows;
}

function getCssClass(urlTitle: string | null): string {
  switch (urlTitle) {
    case "dog": return "pr-dog";
    case "cat": return "pr-cat";
    case "rodent": return "pr-rabbit";
    default: return "";
  }
}

const MainSidebar = ({ isSideBarOpen, onClose }: MainSidebarProp) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories?lang=1")
      .then((r) => r.json())
      .then((json) => { if (json.success) setCategories(json.data); })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!isSideBarOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const menuButton = document.getElementById("menu_btn");
      if (menuButton && (menuButton === target || menuButton.contains(target))) return;
      if (sidebarRef.current && !sidebarRef.current.contains(target)) onClose();
    };
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 100);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideBarOpen, onClose]);

  const desktopRows = buildRows(categories, 3); // ≥992px: 3 per row
  const tabletRows = buildRows(categories, 2); // 768–991px: 2 per row

  const renderItem = (cat: Category, key: string) => (
    <div key={key} className="flex flex-1 justify-center">
      <div className="group flex flex-col items-center">
        <Link
          href={`/${cat.urlTitle ?? cat.Id}/`}
          onClick={onClose}
          className="flex w-50 flex-col items-center"
        >
          <div className="w-full">
            <SidebarCategoryIcon
              imageSrc={cat.Pic1 ?? ""}
              alt={cat.Title}
              cssClass={getCssClass(cat.urlTitle)}
            />
          </div>
          <div className="mt-2 text-center text-2xl font-bold text-black transition-colors duration-300 group-hover:text-[#f92f25]">
            {cat.Title}
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <nav>
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
        <div className={clsx(
          "h-full w-full transition-all duration-300",
          isSideBarOpen ? "opacity-100 delay-500" : "opacity-0 delay-100"
        )}>
          <div className="relative flex h-full w-full flex-col items-center justify-center px-[45px] py-[45px]">

            {/* ── ≥992px: rows of 3, RTL, larger icons ── */}
            <div className="hidden min-[992px]:flex w-full flex-col items-center gap-10">
              {desktopRows.map((row, i) => (
                <div key={i} className="flex w-full flex-row-reverse items-center justify-center gap-4">
                  {row.map((cat) => renderItem(cat, `d-${cat.Id}`))}
                </div>
              ))}
            </div>

            {/* ── 768–991px: rows of 2, RTL, medium icons ── */}
            <div className="hidden max-[991px]:min-[768px]:flex w-full flex-col items-center gap-8">
              {tabletRows.map((row, i) => (
                <div key={i} className="flex w-full flex-row-reverse items-center justify-center gap-4">
                  {row.map((cat) => (
                    <div key={`t-${cat.Id}`} className="flex flex-1 justify-center">
                      <div className="group flex flex-col items-center">
                        <Link
                          href={`/${cat.urlTitle ?? cat.Id}/`}
                          onClick={onClose}
                          className="flex w-40 flex-col items-center"
                        >
                          <div className="w-full">
                            <SidebarCategoryIcon
                              imageSrc={cat.Pic1 ?? ""}
                              alt={cat.Title}
                              cssClass={getCssClass(cat.urlTitle)}
                            />
                          </div>
                          <div className="mt-2 text-center text-xl font-bold text-black transition-colors duration-300 group-hover:text-[#f92f25]">
                            {cat.Title}
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* ── <768px: all stacked, smaller icons ── */}
            <div className="flex max-[767px]:flex min-[768px]:hidden w-full flex-col items-center gap-5">
              {categories.map((cat) => (
                <div key={`m-${cat.Id}`} className="flex w-full justify-center">
                  <div className="group flex flex-col items-center">
                    <Link
                      href={`/${cat.urlTitle ?? cat.Id}/`}
                      onClick={onClose}
                      className="flex w-36 flex-col items-center"
                    >
                      <div className="w-full">
                        <SidebarCategoryIcon
                          imageSrc={cat.Pic1 ?? ""}
                          alt={cat.Title}
                          cssClass={getCssClass(cat.urlTitle)}
                        />
                      </div>
                      <div className="mt-1 text-center text-lg font-bold text-black transition-colors duration-300 group-hover:text-[#f92f25]">
                        {cat.Title}
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom links — pinned to bottom */}
            <div className="absolute bottom-[45px] left-0 w-full">
              <ul className="m-0 flex list-none justify-center gap-10 p-0">
                <li>
                  <Link
                    href="/contact/"
                    onClick={onClose}
                    className="text-xl text-black transition-colors duration-300 hover:text-[#f92f25] max-[768px]:text-base"
                  >
                    تماس با ما
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about/"
                    onClick={onClose}
                    className="text-xl text-black transition-colors duration-300 hover:text-[#f92f25] max-[768px]:text-base"
                  >
                    درباره‌ی دودوتی
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
