import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutProducts from "@/components/about/AboutProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "درباره‌ی دودوتی | دودوتی",
  alternates: {
    canonical: "https://dudoti.com/about/",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <AboutIntro />
      <AboutProducts />
    </main>
  );
}
