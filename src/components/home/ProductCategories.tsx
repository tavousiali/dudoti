"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCharacter from "./ProductCharacter";

const AUTOPLAY_DELAY = 5000;

// Map CSSClass from DB to background color and image translate offset
const CLASS_CONFIG: Record<string, { bg: string; className: string }> = {
  dog: { bg: "#c19ade", className: "translate-y-30" },
  cat: { bg: "#00c9e9", className: "translate-y-20" },
  rabbit: { bg: "#00bda4", className: "translate-y-10" },
};

const DEFAULT_CONFIG = { bg: "#c19ade", className: "translate-y-20" };

interface Category {
  Id: number;
  Title: string;
  Pic1: string | null;
  urlTitle: string | null;
  CSSClass: string | null;
}

export default function ProductCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    fetch("/api/categories?lang=1")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          setCategories(json.data);
        }
      })
      .catch(console.error);
  }, []);

  // timerKey در dependency هست — هر بار که کاربر روی فلش کلیک کنه
  // timerKey عوض می‌شه و تایمر از صفر شروع می‌کنه
  useEffect(() => {
    if (categories.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [categories, timerKey]);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
    setTimerKey((k) => k + 1);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % categories.length);
    setTimerKey((k) => k + 1);
  };

  if (categories.length === 0) {
    // skeleton while loading
    return (
      <section
        className="relative flex items-center justify-center overflow-hidden h-[85vw] min-h-[340px] max-h-[500px]"
        style={{ backgroundColor: "#c19ade" }}
      />
    );
  }

  const current = categories[activeIndex];
  const cssClass = current.CSSClass ?? "";
  const { bg, className } = CLASS_CONFIG[cssClass] ?? DEFAULT_CONFIG;

  const imageSrc = current.Pic1
    ? current.Pic1.startsWith("/")
      ? current.Pic1
      : `/images/products/${current.Pic1}`
    : "/images/home/dog.png";

  const href = current.urlTitle ? `/${current.urlTitle}` : "#";

  return (
    <section
      className="
        relative
        flex
        items-center
        justify-center
        overflow-hidden
        transition-colors
        duration-500
        h-[85vw]
        min-h-[340px]
        max-h-[500px]
      "
      style={{ backgroundColor: bg }}
    >
      <button
        onClick={prevSlide}
        aria-label="Previous"
        className="
          absolute
          left-4
          sm:left-[calc(50vw-16rem)]
          top-1/2
          z-20
          -translate-y-1/2
          text-white
          cursor-pointer
          transition-all
          duration-200
          hover:text-black
          hover:scale-150
        "
      >
        <span style={{ fontFamily: "icomoon" }} className="text-3xl">
          {"\ue902"}
        </span>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next"
        className="
          absolute
          right-4
          sm:right-[calc(50vw-16rem)]
          top-1/2
          z-20
          -translate-y-1/2
          text-white
          cursor-pointer
          transition-all
          duration-200
          hover:text-black
          hover:scale-150
        "
      >
        <span style={{ fontFamily: "icomoon" }} className="text-3xl">
          {"\ue900"}
        </span>
      </button>

      <div className="flex flex-col items-center">
        <Link href={href} className="cursor-pointer">
          <ProductCharacter
            image={imageSrc}
            title={current.Title}
            className={className}
          />
        </Link>

        <Link href={href}>
          <h2 className="mt-4 text-2xl font-bold text-white hover:underline">
            {current.Title}
          </h2>
        </Link>
      </div>
    </section>
  );
}
