"use client";

import Image from "next/image";
import PageTitle from "@/components/layout/PageTitle";
import { useLocale } from "@/components/layout/LocaleContext";

const content = {
  fa: {
    title: "درباره‌ی دودوتی",
    body: "دودوتی با هدف ارتقای استانداردهای تولید محصولات غذایی و بهداشتی حیوانات خانگی تأسیس شد. این برند با تمرکز بر کیفیت، نوآوری و رقابت‌پذیری بین‌المللی، فعالیت خود را در حوزه تولید محصولات تخصصی برای سگ‌ها، گربه‌ها و جوندگان آغاز کرد و امروز به عنوان برندی پویا در این صنعت شناخته می‌شود.",
    imgAlt: "درباره‌ی دودوتی",
  },
  en: {
    title: "About Dudoti",
    body: "Dudoti was founded with the goal of raising the standards of food and hygiene product manufacturing for pets. Focused on quality, innovation, and international competitiveness, the brand began producing specialized products for dogs, cats, and rodents, and is today recognized as a dynamic brand in the industry.",
    imgAlt: "About Dudoti",
  },
  fr: {
    title: "À propos de Dudoti",
    body: "Dudoti a été fondée dans le but d'améliorer les standards de fabrication de produits alimentaires et d'hygiène pour animaux de compagnie. Axée sur la qualité, l'innovation et la compétitivité internationale, la marque a commencé à produire des produits spécialisés pour chiens, chats et rongeurs.",
    imgAlt: "À propos de Dudoti",
  },
} as const;

export default function AboutIntro() {
  const { locale, dir } = useLocale();
  const c = content[locale];

  return (
    <section
      dir={dir}
      className="
        py-[40px]
        px-5
        md:px-10
        lg:px-16
        xl:px-24
        min-h-[40vw]
        flex
        items-center
      "
    >
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* Text */}
          <div className="w-full md:w-1/2" style={{ textAlign: dir === "ltr" ? "left" : "right" }}>
            <PageTitle title={c.title} as="h2" className="mb-6" />
            <p className="mt-5 text-[16px] md:text-[18px] leading-9 text-black">
              {c.body}
            </p>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/about/s2.png"
                alt={c.imgAlt}
                fill
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
