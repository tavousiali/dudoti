import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutProducts from "@/components/about/AboutProducts";
import AboutCharacters from "@/components/about/AboutCharacters";

export default function EnAboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <AboutIntro />
      <AboutProducts />
      <AboutCharacters />
    </main>
  );
}
