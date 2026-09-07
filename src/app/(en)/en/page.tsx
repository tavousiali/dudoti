import HeroSection from "@/components/home/HeroSection";
import ProductCategories from "@/components/home/ProductCategories";
import AboutSection from "@/components/home/AboutSection";
import BestSellers from "@/components/home/BestSellers";

export default function EnHomePage() {
  return (
    <>
      <HeroSection />
      <ProductCategories />
      <AboutSection />
      <BestSellers />
    </>
  );
}
