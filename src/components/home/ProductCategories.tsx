"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCharacter from "./ProductCharacter";

const AUTOPLAY_DELAY = 5000;

const categories = [
  {
    title: "محصولات سگ",
    image: "/images/dog.png",
    bg: "#c19ade",
    className: "translate-y-30",
  },
  {
    title: "محصولات گربه",
    image: "/images/cat.png",
    bg: "#00c9e9",
    className: "translate-y-20",
  },
  {
    title: "محصولات جوندگان",
    image: "/images/rodent.png",
    bg: "#00bda4",
    className: "translate-y-10",
  },
];

export default function ProductCategories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const changeSlide = (newIndex: number) => {
    setVisible(false);

    setTimeout(() => {
      setActiveIndex(newIndex);
      setVisible(true);
    }, 300);
  };

  const nextSlide = () => {
    changeSlide((activeIndex + 1) % categories.length);
  };

  const prevSlide = () => {
    changeSlide(activeIndex === 0 ? categories.length - 1 : activeIndex - 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const current = categories[activeIndex];

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
      style={{
        backgroundColor: current.bg,
      }}
    >
      <button
        onClick={prevSlide}
        aria-label="Previous"
        className="
          absolute
          left-4
          top-1/2
          z-20
          -translate-y-1/2
          text-white
          transition-colors
          active:text-black
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
          top-1/2
          z-20
          -translate-y-1/2
          text-white
          transition-colors
          active:text-black
        "
      >
        <span style={{ fontFamily: "icomoon" }} className="text-3xl">
          {"\ue900"}
        </span>
      </button>

      <div
        className={`
          flex
          flex-col
          items-center
        `}
      >
        <button onClick={nextSlide} className="cursor-pointer">
          <ProductCharacter
            image={current.image}
            title={current.title}
            className={current.className}
            visible={visible}
          />
        </button>

        <h2 className="mt-4 text-2xl font-bold text-white">{current.title}</h2>
      </div>
    </section>
  );
}
