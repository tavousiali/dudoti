"use client";

import { useEffect, useState } from "react";
import PageTitle from "../layout/PageTitle";
import { useLocale } from "@/components/layout/LocaleContext";

interface Character {
  Id: number;
  Name: string;
  Desc: string | null;
  Img1: string | null;
  Img2: string | null;
  BgColor: string | null;
  CSSClass: string | null;
}

export default function AboutCharacters() {
  const { langId, dir } = useLocale();
  const isRtl = dir === "rtl";
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    fetch(`/api/characters?lang=${langId}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          setCharacters(json.data);
          setActiveIndex(0);
          setFadeKey((k) => k + 1);
        }
      })
      .catch(console.error);
  }, [langId]);

  if (characters.length === 0) {
    return (
      <section
        className="relative flex items-center justify-center overflow-hidden h-[405px]"
        style={{ backgroundColor: "#00c9e9" }}
      />
    );
  }

  const current = characters[activeIndex];
  const bg = current.BgColor ?? "#00c9e9";

  const prevSlide = () => {
    setActiveIndex((i) => (i - 1 + characters.length) % characters.length);
    setFadeKey((k) => k + 1);
  };
  const nextSlide = () => {
    setActiveIndex((i) => (i + 1) % characters.length);
    setFadeKey((k) => k + 1);
  };

  const img1 = current.Img1 ?? "/images/about/cat-1.png";
  const img2 = current.Img2 ?? null;
  const cssClass = current.CSSClass ?? "cat";

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden py-10 transition-colors duration-500"
      style={{ backgroundColor: bg }}
    >
      {/* ── wrapper: 1170px، padding 15px هر طرف ── */}
      <div className="w-full max-w-[1170px] mx-auto px-[15px]">

        {/* ── row: فلش + محتوا + فلش ── */}
        <div className="flex items-center gap-0">

          {/* فلش اول — RTL: راست (next) | LTR: چپ (prev) */}
          <button
            onClick={isRtl ? nextSlide : prevSlide}
            aria-label={isRtl ? "Next character" : "Previous character"}
            className="
              shrink-0 w-[60px] flex items-center justify-center
              text-white cursor-pointer
              transition-all duration-200
              hover:text-black hover:scale-150
            "
          >
            <span style={{ fontFamily: "icomoon" }} className="text-3xl">
              {isRtl ? "\ue900" : "\ue902"}
            </span>
          </button>

          {/* محتوای اصلی — fade با key */}
          <div
            key={fadeKey}
            className="char-about-fade flex-1 flex flex-col md:flex-row items-center gap-0"
          >

            {/* ── ستون متن — RTL: اول | LTR: دوم ── */}
            {isRtl && (
              <div className="w-full md:w-1/2 text-center md:text-right px-4 py-6">
                <PageTitle
                  as="h2"
                  title={current.Name}
                  iconClassName="text-[#ff2f2f]"
                  titleClassName="text-black"
                />
                <p className="text-[15px] md:text-[16px] leading-9 text-black whitespace-pre-line mt-4">
                  {current.Desc}
                </p>
              </div>
            )}

            {/* ── ستون عکس ── */}
            <div className="w-full md:w-1/2 flex items-end justify-center overflow-hidden">
              <div className={`char-animate ${cssClass}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img1} alt={current.Name} className="char-1" />
                {img2 && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img2} alt="" className="char-2" aria-hidden="true" />
                )}
              </div>
            </div>

            {/* ── ستون متن — LTR: دوم ── */}
            {!isRtl && (
              <div className="w-full md:w-1/2 text-center md:text-left px-4 py-6">
                <PageTitle
                  as="h2"
                  title={current.Name}
                  iconClassName="text-[#ff2f2f]"
                  titleClassName="text-black"
                />
                <p className="text-[15px] md:text-[16px] leading-9 text-black whitespace-pre-line mt-4">
                  {current.Desc}
                </p>
              </div>
            )}

          </div>

          {/* فلش دوم — RTL: چپ (prev) | LTR: راست (next) */}
          <button
            onClick={isRtl ? prevSlide : nextSlide}
            aria-label={isRtl ? "Previous character" : "Next character"}
            className="
              shrink-0 w-[60px] flex items-center justify-center
              text-white cursor-pointer
              transition-all duration-200
              hover:text-black hover:scale-150
            "
          >
            <span style={{ fontFamily: "icomoon" }} className="text-3xl">
              {isRtl ? "\ue902" : "\ue900"}
            </span>
          </button>

        </div>
      </div>
    </section>
  );
}
