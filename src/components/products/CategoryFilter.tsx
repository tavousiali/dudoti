"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CatCategory } from "@/data/cat-products";

type CategoryFilterProps = {
  categories: CatCategory[];
  currentLabel?: string;
};

export default function CategoryFilter({
  categories,
  currentLabel = "همه محصولات گربه",
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative z-50 text-center md:text-left">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-[5] inline-block min-w-[170px] cursor-pointer appearance-none border-0 bg-transparent bg-[length:100%_100%] bg-no-repeat px-11 py-2.5 text-xs text-black outline-none md:min-w-[225px] md:px-[60px] md:text-base"
        style={{ backgroundImage: "url(/images/ui/con1.png)" }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xl md:right-[15px] md:text-2xl"
          style={{ fontFamily: "icomoon" }}
          aria-hidden
        >
          {"\ue906"}
        </span>
        {currentLabel}
        <span
          className={`absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-[#f92f25] transition-transform duration-300 md:left-[15px] md:text-base ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{ fontFamily: "icomoon" }}
          aria-hidden
        >
          {"\ue919"}
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-1/2 z-50 mt-[-6px] w-[170px] -translate-x-1/2 list-none bg-[length:100%_100%] bg-no-repeat p-[15px] text-right text-xs md:left-0 md:mt-[-7px] md:w-[225px] md:translate-x-0 md:text-base"
          style={{ backgroundImage: "url(/images/ui/con2.png)" }}
        >
          {categories.map((category) => (
            <li key={category.href}>
              <Link
                href={category.href}
                className="block p-[5px] text-black transition-colors hover:bg-transparent hover:text-[#f92f25]"
                onClick={() => setIsOpen(false)}
              >
                {category.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
