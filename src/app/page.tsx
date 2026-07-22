import HeroSection from "@/components/home/HeroSection";
import ProductCategories from "@/components/home/ProductCategories";
import AboutSection from "@/components/home/AboutSection";
import BestSellers from "@/components/home/BestSellers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصولات دودوتی",
  description: "غذای تشویقی سگ، جوندگان و محصولات گربه",
  keywords: [
    "غذای تشویقی سگ",
    "غذای تشویقی گربه",
    "غذای تشویقی جوندگان",
  ],

  alternates: {
    canonical: "https://dudoti.com/",
  },

  openGraph: {
    title: "محصولات دودوتی",
    description: "غذای تشویقی سگ، جوندگان و محصولات گربه",
    url: "https://dudoti.com/",
    images: [
      {
        url: "https://dudoti.com/img/dudotiLogo.png",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductCategories />
      <AboutSection />
      <BestSellers />
    </>
  );
}
