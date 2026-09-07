"use client";

import Image from "next/image";
import PageTitle from "@/components/layout/PageTitle";
import { useLocale } from "@/components/layout/LocaleContext";

const content = {
  fa: {
    title: "محصولات",
    p1: "رویکرد دودوتی مبتنی بر تولید محصولاتی است که نه‌تنها نیازهای تغذیه‌ای و بهداشتی حیوانات خانگی را تأمین کند، بلکه به بهبود کیفیت همزیستی میان انسان و حیوان نیز کمک نماید. باور بنیادین این برند بر این اصل استوار است که حیوانات خانگی بخشی از خانواده هستند و شایسته دریافت محصولاتی با کیفیت هستند.",
    p2: "سبد محصولات دودوتی شامل انواع بیسکوییت‌های تخصصی سگ در طعم‌های متنوع، تشویقی‌های سلامت‌محور، محصولات بهداشتی و مراقبتی، بسترهای بهداشتی، اسباب‌بازی‌های تقویت سلامت دندان جوندگان، محصولات گیاهی طبیعی ویژه گربه‌ها و سایر اقلام کاربردی در حوزه نگهداری حیوانات خانگی است.",
    imgAlt: "محصولات دودوتی",
  },
  en: {
    title: "Products",
    p1: "Dudoti's approach is centered on creating products that not only meet the nutritional and hygiene needs of pets, but also help improve the quality of coexistence between humans and animals. The brand's core belief is that pets are part of the family and deserve quality products.",
    p2: "Dudoti's product range includes specialized dog biscuits in various flavors, health-oriented treats, hygiene and care products, hygienic bedding, rodent dental health toys, natural herbal products for cats, and other practical items for pet care.",
    imgAlt: "Dudoti Products",
  },
  fr: {
    title: "Produits",
    p1: "L'approche de Dudoti est centrée sur la création de produits qui non seulement répondent aux besoins nutritionnels et hygiéniques des animaux de compagnie, mais contribuent également à améliorer la qualité de la coexistence entre l'humain et l'animal.",
    p2: "La gamme de produits Dudoti comprend des biscuits spécialisés pour chiens en diverses saveurs, des friandises axées sur la santé, des produits d'hygiène et de soins, des litières hygiéniques, des jouets pour la santé dentaire des rongeurs et des produits à base de plantes naturelles pour chats.",
    imgAlt: "Produits Dudoti",
  },
} as const;

export default function AboutProducts() {
  const { locale, dir } = useLocale();
  const c = content[locale];

  return (
    <section
      dir={dir}
      className="bg-[#f9e0a4]"
      style={{
        height: "45rem",
        paddingTop: "15rem",
        margin: "0 auto",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        paddingLeft: "10rem",
      }}
    >
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="relative">

          {/* Red box */}
          <div
            className="w-full md:w-[65%] pt-14 pb-14 px-10 md:px-16"
            style={{
              textAlign: dir === "ltr" ? "left" : "right",
              backgroundImage: "url(/images/about/red-con.png)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              position: "absolute",
              left: 0,
              top: -90,
            }}
          >
            <PageTitle
              title={c.title}
              as="h2"
              iconClassName="text-white"
              className="[&_h2]:text-white"
            />
            <p className="mt-4 text-[14px] md:text-[16px] leading-9 text-white">{c.p1}</p>
            <p className="mt-4 text-[14px] md:text-[16px] leading-9 text-white">{c.p2}</p>
          </div>

          {/* Cat image */}
          <div className="hidden md:block absolute left-[60%] top-1/2 -translate-y-1/2 z-[10] w-[260px] lg:w-[300px]">
            <Image
              src="/images/about/cat-handup.png"
              alt={c.imgAlt}
              width={300}
              height={420}
              className="w-full h-auto object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
