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

  // در فارسی: گربه چپ، قرمز راست  →  order: گربه order-1، قرمز order-2
  // در انگلیسی/فرانسه: گربه راست، قرمز چپ  →  order: گربه order-2، قرمز order-1
  const isFa = locale === "fa";

  return (
    <section className="bg-[#f9e0a4] py-[60px] md:py-[110px] lg:pt-[150px]">
      {/* کانتینر اصلی با padding 15px از دو طرف */}
      <div className="mx-auto px-[15px] w-full md:max-w-[750px] lg:max-w-[970px]">
        <div className="flex items-start gap-0">

          {/* بنر قرمز — فارسی: راست (order-2)، انگلیسی/فرانسه: چپ (order-1) */}
          <div
            className={`
              flex-1 min-h-[200px] md:min-h-[280px] lg:min-h-[320px]
              py-8 md:py-10 lg:py-14
              px-6 md:px-10 lg:px-14
              ${isFa ? "order-2" : "order-1"}
            `}
            dir={dir}
            style={{
              textAlign: dir === "ltr" ? "left" : "right",
              backgroundImage: "url(/images/about/red-con.png)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <PageTitle
              title={c.title}
              as="h2"
              iconClassName="text-white"
              className="[&_h2]:text-white"
            />
            <p className="mt-3 text-[14px] md:text-[16px] lg:text-[18px] leading-[20px] md:leading-9 text-white">
              {c.p1}
            </p>
            <p className="mt-3 text-[14px] md:text-[16px] lg:text-[18px] leading-[20px] md:leading-9 text-white">
              {c.p2}
            </p>
          </div>

          {/* عکس گربه — فارسی: چپ (order-1)، انگلیسی/فرانسه: راست (order-2) */}
          <div
            className={`
              flex-shrink-0
              w-[120px] md:w-[240px] lg:w-[360px]
              mt-[-20px]
              md:mt-[-70px]
              lg:mt-[-110px]
              relative
              ${isFa ? "order-1 right-[10px]" : "order-2 left-[10px]"}
            `}
          >
            <Image
              src="/images/about/cat-handup.png"
              alt={c.imgAlt}
              width={360}
              height={500}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
