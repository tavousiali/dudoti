import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import ProductCategories from "@/components/home/ProductCategories";
import AboutSection from "@/components/home/AboutSection";
import BestSellers from "@/components/home/BestSellers";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <ProductCategories />
      <AboutSection />
      <BestSellers />
      <Footer />
    </>
  );
}
