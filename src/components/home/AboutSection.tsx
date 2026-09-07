"use client";

import Link from "next/link";
import Button from "../layout/Button";
import PageTitle from "../layout/PageTitle";
import CarAnimation from "./CarAnimation";
import { useLocale } from "@/components/layout/LocaleContext";
import { useLocalePath } from "@/components/layout/useLocalePath";

const content = {
  fa: {
    title: "درباره دودوتی",
    p1: "دودوتی یه برند جدید ایرانیه که محصولات غذایی و بهداشتی خیلی باکیفیت برای حیوان‌های خونگی تولید می‌کنه.",
    p2: "دودوتی می‌دونه که این روزها هزینه‌های نگهداری از حیوان خونگی چقدر سرسام‌آور شدن، برای همین محصولاتش رو با قیمتی مناسب عرضه می‌کنه...",
    btn: "بیشتر",
  },
  en: {
    title: "About Dudoti",
    p1: "Dudoti is a new Iranian brand producing high-quality food and hygiene products for pets.",
    p2: "Dudoti understands how expensive pet care has become, so it offers its products at affordable prices...",
    btn: "More",
  },
  fr: {
    title: "À propos de Dudoti",
    p1: "Dudoti est une nouvelle marque iranienne produisant des produits alimentaires et d'hygiène de haute qualité pour les animaux de compagnie.",
    p2: "Dudoti comprend à quel point les soins aux animaux de compagnie sont devenus coûteux, c'est pourquoi elle propose ses produits à des prix abordables...",
    btn: "En savoir plus",
  },
} as const;

export default function AboutSection() {
  const { locale, dir } = useLocale();
  const lp = useLocalePath();
  const c = content[locale];

  return (
    <section className="overflow-hidden bg-[#f9e0a4] px-10 lg:px-30 xl:px-70 py-14 md:flex md:items-center md:gap-10">
      <div
        className="md:w-1/2"
        style={{ textAlign: dir === "ltr" ? "left" : "right" }}
      >
        <PageTitle title={c.title} className="" />

        <div className="mt-8 space-y-5 text-[14px] leading-8 text-black">
          <p className="leading-4.5">{c.p1}</p>
          <p className="leading-4.5">{c.p2}</p>
        </div>

        <div className="mt-6 flex justify-start">
          <Link href={lp("/about")}>
            <Button text={c.btn} />
          </Link>
        </div>
      </div>

      <div className="mt-4 md:mt-0 md:w-1/2">
        <CarAnimation />
      </div>
    </section>
  );
}
