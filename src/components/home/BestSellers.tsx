"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const AUTOPLAY_DELAY = 5000;
const TRANSITION_DURATION = 500;

const products = [
  {
    id: 1,
    title: "بذر",
    subtitle: "دفع توپ مویی",
    image: "/images/products/Product2_1.png",
  },
  {
    id: 2,
    title: "بذر",
    subtitle: "دفع توپ مویی",
    image: "/images/products/Product2_1.png",
  },
];

const slides = [...products, products[0]];

export default function BestSellers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const nextSlide = () => {
    setActiveIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (activeIndex === 0) {
      setTransitionEnabled(false);
      setActiveIndex(products.length - 1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });

      return;
    }

    setActiveIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeIndex === products.length) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setActiveIndex(0);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransitionEnabled(true);
          });
        });
      }, TRANSITION_DURATION);

      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  return (
    <section className="bg-white px-4 py-14">
      <h2 className="mb-10 text-center text-3xl font-bold text-black">
        <span className="mx-3 text-[#ff2f2f]" style={{ fontFamily: "icomoon" }}>
          {"\ue90c"}
        </span>
        محصولات پرفروش
        <span className="mx-3 text-[#ff2f2f]" style={{ fontFamily: "icomoon" }}>
          {"\ue910"}
        </span>
      </h2>

      <div className="relative">
        <button
          onClick={prevSlide}
          className="
    absolute
    left-4
    top-[42%]
    z-10
    -translate-y-1/2
    text-black
    focus:text-[#ff2f2f]
    focus:outline-none
  "
        >
          <span style={{ fontFamily: "icomoon" }} className="text-4xl">
            {"\ue917"}
          </span>
        </button>

        <button
          onClick={nextSlide}
          className="
    absolute
    right-4
    top-[42%]
    z-10
    -translate-y-1/2
    text-black
    focus:text-[#ff2f2f]
    focus:outline-none
  "
        >
          <span style={{ fontFamily: "icomoon" }} className="text-4xl">
            {"\ue911"}
          </span>
        </button>
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(${activeIndex * 100}%)`,
              transition: transitionEnabled
                ? `transform ${TRANSITION_DURATION}ms ease-in-out`
                : "none",
            }}
          >
            {slides.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="min-w-full flex flex-col items-center"
              >
                <div
                  className="
                    flex
                    h-56
                    w-56
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-black
                    bg-white
                  "
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={90}
                    height={90}
                    className="object-contain"
                  />
                </div>

                <h3 className="mt-6 text-3xl font-bold text-black">
                  {product.title}
                </h3>

                <p className="mt-2 text-lg text-black">{product.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
