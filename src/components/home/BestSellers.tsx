"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const AUTOPLAY_DELAY = 5000;
const TRANSITION_DURATION = 500;

interface Product {
  Id: number;
  Title: string | null;
  SubTitle: string | null;
  Pic1: string | null;
  urlTitle: string | null;
  CurrentPrice: number | null;
  CurrentOffPrice: number | null;
}

function ProductCard({ product }: { product: Product }) {
  const imageSrc = product.Pic1
    ? product.Pic1.startsWith("/")
      ? product.Pic1
      : `/images/products/${product.Pic1}`
    : "/images/products/dog.png";

  return (
    <Link
      href={product.urlTitle ? `/products/${product.urlTitle}` : "#"}
      className="flex flex-col items-center group px-4"
    >
      <div className="flex h-48 w-48 items-center justify-center rounded-full border-2 border-black bg-white overflow-clip transition-all duration-300 group-hover:border-[#ff2f2f] group-hover:shadow-lg">
        <Image
          src={imageSrc}
          alt={product.Title ?? "محصول"}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
      <h3 className="mt-5 text-lg font-bold text-black text-center line-clamp-2">
        {product.Title}
      </h3>
      {product.SubTitle && (
        <p className="mt-1 text-sm text-gray-500 text-center line-clamp-2">
          {product.SubTitle}
        </p>
      )}
      {product.CurrentOffPrice ? (
        <div className="mt-2 flex flex-col items-center gap-0.5">
          <span className="text-xs text-gray-400 line-through">
            {product.CurrentPrice?.toLocaleString("fa-IR")} تومان
          </span>
          <span className="text-sm font-bold text-[#ff2f2f]">
            {product.CurrentOffPrice.toLocaleString("fa-IR")} تومان
          </span>
        </div>
      ) : product.CurrentPrice ? (
        <span className="mt-2 text-sm font-bold text-black">
          {product.CurrentPrice.toLocaleString("fa-IR")} تومان
        </span>
      ) : null}
    </Link>
  );
}

export default function BestSellers() {
  // ── all hooks unconditionally at the top ──────────────────────────────────
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Respond to screen size changes
  useEffect(() => {
    const update = () => setVisibleCount(window.innerWidth >= 768 ? 4 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Fetch products
  useEffect(() => {
    fetch("/api/products/best-sellers?limit=20")
      .then((r) => r.json())
      .then((json) => { if (json.success) setProducts(json.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Reset slider — start at baseOffset so prepended clones are off-screen to the left
  useEffect(() => {
    setActiveIndex(visibleCount);
    setTransitionEnabled(true);
  }, [products, visibleCount]);

  // In RTL: clone the last `visibleCount` items at the BEGINNING of the track
  // so when we scroll past index 0 we can loop back to the end
  const extendedProducts = useMemo(
    () =>
      products.length > 0
        ? [
          ...products.slice(products.length - visibleCount),
          ...products,
        ]
        : [],
    [products, visibleCount]
  );

  // activeIndex now starts at `visibleCount` (offset for the prepended clones)
  const baseOffset = visibleCount;
  const maxIndex = products.length + baseOffset; // index after last real item

  const itemWidthPercent = 100 / visibleCount;
  // In RTL layout the track moves right (positive) to reveal the next item
  const translatePercent = activeIndex * itemWidthPercent;
  const dotIndex = products.length > 0 ? (activeIndex - visibleCount + products.length) % products.length : 0;

  // RTL: "next" = index increases (moves right), "prev" = index decreases
  const nextSlide = useCallback(() => {
    setTransitionEnabled(true);
    setActiveIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setTransitionEnabled(true);
    setActiveIndex((prev) => prev - 1);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (products.length === 0) return;
    const base = visibleCount;
    const max = products.length + base;
    // Went past the end → snap to start
    if (activeIndex >= max) {
      setTransitionEnabled(false);
      setActiveIndex(base);
    }
    // Went before the start → snap to end
    if (activeIndex < base) {
      setTransitionEnabled(false);
      setActiveIndex(max - 1);
    }
  }, [activeIndex, products.length, visibleCount]);

  // Autoplay — guard inside the effect, hook is always declared
  useEffect(() => {
    if (products.length === 0) return;
    timerRef.current = setInterval(nextSlide, AUTOPLAY_DELAY);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [products, visibleCount, nextSlide]);
  // ── end of hooks ──────────────────────────────────────────────────────────

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

      {loading && (
        <div className="flex justify-center py-16">
          <span className="text-gray-400 text-lg">در حال بارگذاری...</span>
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="flex justify-center py-16">
          <span className="text-gray-400">محصولی یافت نشد</span>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="relative max-w-5xl mx-auto">
          {/* prev arrow */}
          <button
            onClick={prevSlide}
            aria-label="قبلی"
            className="absolute left-0 top-[40%] z-10 -translate-y-1/2 -translate-x-2 text-black hover:text-[#ff2f2f] focus:outline-none"
          >
            <span style={{ fontFamily: "icomoon" }} className="text-4xl">
              {"\ue917"}
            </span>
          </button>

          {/* next arrow */}
          <button
            onClick={nextSlide}
            aria-label="بعدی"
            className="absolute right-0 top-[40%] z-10 -translate-y-1/2 translate-x-2 text-black hover:text-[#ff2f2f] focus:outline-none"
          >
            <span style={{ fontFamily: "icomoon" }} className="text-4xl">
              {"\ue911"}
            </span>
          </button>

          {/* slider track */}
          <div className="overflow-hidden mx-8">
            <div
              className="flex"
              style={{
                transform: `translateX(${translatePercent}%)`,
                transition: transitionEnabled
                  ? `transform ${TRANSITION_DURATION}ms ease-in-out`
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedProducts.map((product, i) => (
                <div
                  key={`${product.Id}-${i}`}
                  style={{ minWidth: `${itemWidthPercent}%` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
