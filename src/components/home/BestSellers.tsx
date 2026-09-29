"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PageTitle from "../layout/PageTitle";
import { useLocale } from "@/components/layout/LocaleContext";
import { useLocalePath } from "@/components/layout/useLocalePath";

const AUTOPLAY_DELAY = 5000;
const TRANSITION_DURATION = 500;

export interface ProductItem {
  Id: number;
  Title: string | null;
  SubTitle: string | null;
  Pic1: string | null;
  urlTitle: string | null;
  urlTitlteCat: string | null;
  MainUrlTitle: string | null;
  CurrentPrice: number | null;
  CurrentOffPrice: number | null;
}

interface Props {
  products: ProductItem[];
}

function ProductCard({ product, locale }: { product: ProductItem; locale: "fa" | "en" | "fr" }) {
  const lp = useLocalePath();

  const imageSrc = product.Pic1
    ? product.Pic1.startsWith("/")
      ? product.Pic1
      : `/images/products/${product.Pic1}`
    : "/images/products/dog.png";

  const rawHref =
    product.MainUrlTitle && product.urlTitlteCat && product.urlTitle
      ? `/${product.MainUrlTitle}/${product.urlTitlteCat}/${product.urlTitle}`
      : "#";

  const href = rawHref === "#" ? "#" : lp(rawHref);

  const formatPrice = (n: number) =>
    locale === "fa"
      ? `${n.toLocaleString("fa-IR")} تومان`
      : locale === "fr"
        ? `${n.toLocaleString("fr-FR")} Toman`
        : `${n.toLocaleString("en-US")} Toman`;

  return (
    <Link href={href} className="flex flex-col items-center group px-4">
      <div className="flex h-48 w-48 md:h-36 md:w-36 lg:h-48 lg:w-48 items-center justify-center rounded-full border-2 border-black bg-white overflow-clip transition-all duration-300 group-hover:border-[#ff2f2f] group-hover:shadow-lg">
        <Image
          src={imageSrc}
          alt={product.Title ?? "product"}
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
            {formatPrice(product.CurrentPrice!)}
          </span>
          <span className="text-sm font-bold text-[#ff2f2f]">
            {formatPrice(product.CurrentOffPrice)}
          </span>
        </div>
      ) : product.CurrentPrice ? (
        <span className="mt-2 text-sm font-bold text-black">
          {formatPrice(product.CurrentPrice)}
        </span>
      ) : null}
    </Link>
  );
}

export default function BestSellers({ products }: Props) {
  const { locale, dir } = useLocale();
  const isRtl = dir === "rtl";

  const [visibleCount, setVisibleCount] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep a ref to activeIndex so handleTransitionEnd never reads stale value
  const activeIndexRef = useRef(activeIndex);
  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

  // Respond to screen size changes
  useEffect(() => {
    const update = () => setVisibleCount(window.innerWidth >= 768 ? 4 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Reset slider when products or visibleCount changes
  useEffect(() => {
    if (products.length > 0) {
      setTransitionEnabled(false);
      setActiveIndex(visibleCount);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransitionEnabled(true))
      );
    }
  }, [products, visibleCount]);

  /**
   * extendedProducts layout:
   *   [last N real items] + [all real items] + [first N real items]
   */
  const extendedProducts = useMemo(() => {
    if (products.length === 0) return [];
    const n = visibleCount;
    const head = products.slice(products.length - n);
    const tail = products.slice(0, n);
    return [...head, ...products, ...tail];
  }, [products, visibleCount]);

  const baseOffset = visibleCount;
  const lastRealIndex = visibleCount + products.length - 1;
  const itemWidthPercent = 100 / visibleCount;
  const translatePercent = -(activeIndex * itemWidthPercent);

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
    const idx = activeIndexRef.current;

    if (idx > lastRealIndex) {
      setTransitionEnabled(false);
      setActiveIndex(baseOffset + (idx - lastRealIndex - 1));
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransitionEnabled(true))
      );
    } else if (idx < baseOffset) {
      setTransitionEnabled(false);
      setActiveIndex(lastRealIndex - (baseOffset - idx - 1));
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransitionEnabled(true))
      );
    }
  }, [products.length, baseOffset, lastRealIndex]);

  // Autoplay
  useEffect(() => {
    if (products.length === 0 || isPaused) return;
    timerRef.current = setInterval(isRtl ? prevSlide : nextSlide, AUTOPLAY_DELAY);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [products, visibleCount, nextSlide, prevSlide, isPaused, isRtl]);

  const title = locale === "fa" ? "محصولات پرفروش" : locale === "fr" ? "Meilleures ventes" : "Best Sellers";
  const emptyText = locale === "fa" ? "محصولی یافت نشد" : locale === "fr" ? "Aucun produit trouvé" : "No products found";
  const prevLabel = locale === "fa" ? "قبلی" : locale === "fr" ? "Précédent" : "Previous";
  const nextLabel = locale === "fa" ? "بعدی" : locale === "fr" ? "Suivant" : "Next";

  return (
    <section className="bg-white px-4 py-14">
      <PageTitle as="h3" title={title} className="justify-center mb-10" />

      {products.length === 0 && (
        <div className="flex justify-center py-16">
          <span className="text-gray-400">{emptyText}</span>
        </div>
      )}

      {products.length > 0 && (
        <div className="relative max-w-5xl mx-auto">
          {/* prev arrow — visually left side */}
          <button
            onClick={isRtl ? prevSlide : nextSlide}
            aria-label={prevLabel}
            className="absolute left-0 top-[40%] z-10 -translate-y-1/2 -translate-x-2 text-black hover:text-[#ff2f2f] focus:outline-none"
          >
            <span style={{ fontFamily: "icomoon" }} className="text-4xl">
              {"\ue917"}
            </span>
          </button>

          {/* next arrow — visually right side */}
          <button
            onClick={isRtl ? nextSlide : prevSlide}
            aria-label={nextLabel}
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
              dir="ltr"
              style={{
                transform: `translateX(${translatePercent}%)`,
                transition: transitionEnabled
                  ? `transform ${TRANSITION_DURATION}ms ease-in-out`
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {extendedProducts.map((product, i) => (
                <div
                  key={`${product.Id}-${i}`}
                  style={{ minWidth: `${itemWidthPercent}%` }}
                >
                  <ProductCard product={product} locale={locale} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
