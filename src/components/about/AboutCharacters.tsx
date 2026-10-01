"use client";

import { useState } from "react";
import PageTitle from "../layout/PageTitle";
import { useLocale } from "@/components/layout/LocaleContext";

export interface CharacterItem {
  Id: number;
  Name: string;
  Desc: string | null;
  Img1: string | null;
  Img2: string | null;
  BgColor: string | null;
  CSSClass: string | null;
}

interface Props {
  characters: CharacterItem[];
}

export default function AboutCharacters({ characters }: Props) {
  const { dir } = useLocale();
  const isRtl = dir === "rtl";
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

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
      className="relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: bg }}
    >
      {/* ── wrapper: padding 15px هر طرف، relative برای فلش‌های absolute ── */}
      <div className="relative w-full mx-auto px-[15px]">

        {/* فلش اول — absolute، وسط ارتفاع — RTL: راست (next) | LTR: چپ (prev) */}
        <button
          onClick={isRtl ? nextSlide : prevSlide}
          aria-label={isRtl ? "Next character" : "Previous character"}
          className="
            absolute top-1/2 -translate-y-1/2
            start-[15px]
            w-[45px] flex items-center justify-center
            text-white cursor-pointer z-10
            transition-all duration-200
            hover:text-black hover:scale-150
          "
        >
          <span style={{ fontFamily: "icomoon" }} className="text-[30px]">
            {isRtl ? "\ue900" : "\ue902"}
          </span>
        </button>

        {/* محتوای اصلی — fade با key، padding برای جای فلش‌ها */}
        <div
          key={fadeKey}
          className="char-about-fade flex flex-col items-center px-[45px]"
        >

          {/* ── بخش متن ── */}
          <div className="w-full mt-[90px]" dir={dir}>
            <PageTitle
              as="h2"
              title={current.Name}
              iconClassName="text-[#ff2f2f] text-[30px]"
              titleClassName="!text-[22px] text-black"
            />
            <p className="text-[14px] md:text-[15px] lg:text-[16px] text-black whitespace-pre-line leading-[20px] md:leading-9 mt-4 mb-4">
              {current.Desc}
            </p>
          </div>

          {/* ── عکس در زیر متن ── */}
          <div className="w-full flex items-end justify-center overflow-hidden mb-[90px]">
            <div className={`char-animate ${cssClass}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img1} alt={current.Name} className="char-1" />
              {img2 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img2} alt="" className="char-2" aria-hidden="true" />
              )}
            </div>
          </div>

        </div>

        {/* فلش دوم — absolute، وسط ارتفاع — RTL: چپ (prev) | LTR: راست (next) */}
        <button
          onClick={isRtl ? prevSlide : nextSlide}
          aria-label={isRtl ? "Previous character" : "Next character"}
          className="
            absolute top-1/2 -translate-y-1/2
            end-[15px]
            w-[45px] flex items-center justify-center
            text-white cursor-pointer z-10
            transition-all duration-200
            hover:text-black hover:scale-150
          "
        >
          <span style={{ fontFamily: "icomoon" }} className="text-[30px]">
            {isRtl ? "\ue902" : "\ue900"}
          </span>
        </button>

      </div>
    </section>
  );
}
