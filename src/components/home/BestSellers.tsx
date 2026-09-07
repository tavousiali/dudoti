"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PageTitle from "../layout/PageTitle";
import { useLocale } from "@/components/layout/LocaleContext";

const AUTOPLAY_DELAY = 5000;
const TRANSITION_DURATION = 500;

interface Product {
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

function ProductCard({ product, locale }: { product: Product; locale: "fa" | "en" | "fr" }) {
  const imageSrc = product.Pic1
    ? product.Pic1.startsWith("/")
      ? product.Pic1
      : `/images/products/${product.Pic1}`
    : "/images/products/dog.png";

  const href =
    product.MainUrlTitle && product.urlTitlteCat && product.urlTitle
      ? `/${product.MainUrlTitle}/${product.urlTitlteCat}/${product.urlTitle}`
      : "#";

  const formatPrice = (n: number) =>
    locale === "fa"
      ? `${n.toLocaleString("fa-IR")} تومان`
      : locale === "fr"
        ? `${n.toLocaleString("fr-FR")} Toman`
        : `${n.toLocaleString("en-US")} Toman`;

  return (
    <Link href={href} className="flex flex-col items-center group px-4">
      <div className="flex h-48 w-48 items-center justify-center rounded-full border-2 border-black bg-white overflow-clip transition-all duration-300 group-hover:border-[#ff2f2f] group-hover:shadow-lg">
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

export default function BestSellers() {
  const { langId, locale, dir } = useLocale();
  const isRtl = dir === "rtl";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Respond to screen size changes
  useEffect(() => {
    const update = () => setVisibleCount(window.innerWidth >= 768 ? 4 : 1);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Fetch products when language changes
  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/best-sellers?limit=20&lang=${langId}`)
      .then((r) => r.json())
      .then((json) => { if (json.success) setProducts(json.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [langId]);

  // Reset slider when products or visibleCount changes
  useEffect(() => {
    setActiveIndex(visibleCount);
    setTransitionEnabled(true);
  }, [products, visibleCount]);

  // Clone last N items at start (for infinite loop)
  const extendedProducts = useMemo(
    () =>
      products.length > 0
        ? [...products.slice(products.length - visibleCount), ...products]
        : [],
    [products, visibleCount]
  );

  const baseOffset = visibleCount;
  const maxIndex = products.length + baseOffset;

  const itemWidthPercent = 100 / visibleCount;

  // RTL: translate positive (track slides right) to show next item
  // LTR: translate negative (track slides left) to show next item
  const translatePercent = isRtl
    ? activeIndex * itemWidthPercent
    : -(activeIndex * itemWidthPercent);

  const dotIndex =
    products.length > 0
      ? (activeIndex - visibleCount + products.length) % products.length
      : 0;

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
    if (activeIndex >= maxIndex) {
      setTransitionEnabled(false);
      setActiveIndex(baseOffset);
    }
    if (activeIndex < baseOffset) {
      setTransitionEnabled(false);
      setActiveIndex(maxIndex - 1);
    }
  }, [activeIndex, maxIndex, baseOffset, products.length]);

  // Autoplay
  useEffect(() => {
    if (products.length === 0 || isPaused) return;
    timerRef.current = setInterval(nextSlide, AUTOPLAY_DELAY);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [products, visibleCount, nextSlide, isPaused]);

  const title = locale === "fa" ? "محصولات پرفروش" : locale === "fr" ? "Meilleures ventes" : "Best Sellers";
  const loadingText = locale === "fa" ? "در حال بارگذاری..." : locale === "fr" ? "Chargement..." : "Loading...";
  const emptyText = locale === "fa" ? "محصولی یافت نشد" : locale === "fr" ? "Aucun produit trouvé" : "No products found";
  const prevLabel = locale === "fa" ? "قبلی" : locale === "fr" ? "Précédent" : "Previous";
  const nextLabel = locale === "fa" ? "بعدی" : locale === "fr" ? "Suivant" : "Next";

  return (
    <section className="bg-white px-4 py-14">
      <PageTitle as="h2" title={title} className="justify-center mb-10" />

      {loading && (
        <div className="flex justify-center py-16">
          <span className="text-gray-400 text-lg">{loadingText}</span>
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="flex justify-center py-16">
          <span className="text-gray-400">{emptyText}</span>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="relative max-w-5xl mx-auto">
          {/* prev arrow — visually left side */}
          <button
            onClick={prevSlide}
            aria-label={prevLabel}
            className="absolute left-0 top-[40%] z-10 -translate-y-1/2 -translate-x-2 text-black hover:text-[#ff2f2f] focus:outline-none"
          >
            <span style={{ fontFamily: "icomoon" }} className="text-4xl">
              {"\ue917"}
            </span>
          </button>

          {/* next arrow — visually right side */}
          <button
            onClick={nextSlide}
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
