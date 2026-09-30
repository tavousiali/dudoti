import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutProducts from "@/components/about/AboutProducts";
import AboutCharacters from "@/components/about/AboutCharacters";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "About Dudoti | Dudoti",
  alternates: { canonical: "https://dudoti.com/en/about/" },
};

export default async function EnAboutPage() {
  const characters = await prisma.character.findMany({
    where: { Lang: 2 },
    orderBy: [{ Priority: "asc" }, { Id: "asc" }],
    select: { Id: true, Name: true, Desc: true, Img1: true, Img2: true, BgColor: true, CSSClass: true },
  });

  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <AboutIntro />
      <AboutProducts />
      <AboutCharacters characters={characters} />
    </main>
  );
}
