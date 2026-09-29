import HeroSection from "@/components/home/HeroSection";
import ProductCategories from "@/components/home/ProductCategories";
import AboutSection from "@/components/home/AboutSection";
import BestSellers from "@/components/home/BestSellers";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Dudoti Products",
  description: "Dog treats, cat treats, and rodent products",
  alternates: { canonical: "https://dudoti.com/en/" },
  openGraph: {
    title: "Dudoti Products",
    description: "Dog treats, cat treats, and rodent products",
    url: "https://dudoti.com/en/",
    images: [{ url: "https://dudoti.com/img/dudotiLogo.png" }],
  },
};

export default async function EnHomePage() {
  const [heroContent, categories, products] = await Promise.all([
    prisma.mainPage.findFirst({
      where: { Lang: 2 },
      select: { SloganTitle: true, Slogan: true },
    }),
    prisma.productCategory.findMany({
      where: { Lang: 2, ParentId: 0, Deleted: false, ShowMenu: true, Actice: true },
      orderBy: [{ Priority: "asc" }, { Id: "asc" }],
      select: { Id: true, Title: true, Pic1: true, urlTitle: true, CSSClass: true },
    }),
    prisma.product.findMany({
      where: { Deleted: false, Lang: 2 },
      orderBy: [{ Priority: "desc" }, { Id: "asc" }],
      take: 20,
      select: {
        Id: true,
        Title: true,
        SubTitle: true,
        Pic1: true,
        urlTitle: true,
        urlTitlteCat: true,
        MainUrlTitle: true,
        CurrentPrice: true,
        CurrentOffPrice: true,
      },
    }),
  ]);

  return (
    <>
      <HeroSection content={heroContent} locale="en" />
      <ProductCategories categories={categories} />
      <AboutSection />
      <BestSellers products={products} />
    </>
  );
}
