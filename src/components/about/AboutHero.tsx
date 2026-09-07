"use client";

import Image from "next/image";
import PageTitle from "../layout/PageTitle";
import { useLocale } from "@/components/layout/LocaleContext";

const content = {
  fa: {
    titleLine1: "درباره‌ی",
    titleLine2: "دودوتی",
    desc: "تولیدکننده‌ی محصولاتی برای زندگی آسوده و سلامت با سگ‌ها، گربه‌ها و جوندگان خانگی",
    imgAlt: "درباره‌ی دودوتی",
  },
  en: {
    titleLine1: "About",
    titleLine2: "Dudoti",
    desc: "Producing products for a healthy and comfortable life with dogs, cats, and pet rodents",
    imgAlt: "About Dudoti",
  },
  fr: {
    titleLine1: "À propos de",
    titleLine2: "Dudoti",
    desc: "Fabricant de produits pour une vie confortable et saine avec des chiens, des chats et des rongeurs",
    imgAlt: "À propos de Dudoti",
  },
} as const;

export default function AboutHero() {
  const { locale } = useLocale();
  const c = content[locale];

  return (
    <section
      className="
        min-h-[40vw]
        flex
        items-center
        py-[30px]
        [background:radial-gradient(circle,_#9eb5d1_0%,_#6890c1_50%)]
      "
    >
      <div className="w-full flex flex-col md:flex-row items-center">

        {/* Text */}
        <div className="w-full md:w-1/2 text-center order-1 md:order-2 px-8">
          <PageTitle
            title={
              <>
                <span className="block text-[2.5vw] leading-[1]">{c.titleLine1}</span>
                <span className="block text-[5vw] leading-[1.1]">{c.titleLine2}</span>
              </>
            }
            iconClassName="text-white text-[4vw]!"
            titleClassName="text-white"
            className="justify-center"
          />
          <p className="mt-4 text-[1.5vw] font-bold text-black leading-relaxed w-3/4 flex justify-self-center sm:justify-center sm:pb-4">
            {c.desc}
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full md:w-1/2 h-[50vw] md:h-[40vw] order-2 md:order-1">
          <Image
            src="/images/about/s4.png"
            alt={c.imgAlt}
            fill
            className="object-contain object-center"
            priority
          />
        </div>

      </div>
    </section>
  );
}
