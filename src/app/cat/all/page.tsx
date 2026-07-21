import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";
import Breadcrumb from "@/components/products/Breadcrumb";
import { catCategories, catProducts } from "@/data/cat-products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "انواع محصولات گربه | دودوتی",
  description: "انواع محصولات گربه دودوتی؛ ظرف خاک، وود پلت، جای خواب، اسکرچر، اسباب‌بازی و بذرهای گیاهی",
  keywords: [
    "محصولات گربه",
    "ظرف خاک گربه",
    "وود پلت",
    "جای خواب گربه",
    "اسکرچر گربه",
    "دودوتی",
  ],
  alternates: {
    canonical: "https://dudoti.com/cat/all/",
  },
  openGraph: {
    title: "انواع محصولات گربه | دودوتی",
    description: "انواع محصولات گربه دودوتی؛ ظرف خاک، وود پلت، جای خواب، اسکرچر، اسباب‌بازی و بذرهای گیاهی",
    url: "https://dudoti.com/cat/all/",
    images: [
      {
        url: "https://dudoti.com/img/dudotiLogo.png",
      },
    ],
  },
};

export default function CatProductsPage() {
  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-123px)] bg-white" dir="rtl">
        <div className="mx-auto max-w-[1140px] px-4">
          <div className="flex flex-col gap-6 py-8 md:flex-row md:items-start md:justify-between md:gap-8 md:py-[45px]">
            <h1 className="relative m-0 mb-0 inline-block px-9 text-[22px] font-bold text-black md:mb-5 md:px-[45px] md:text-4xl">
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[30px] text-[#f92f25] md:text-[40px]"
                style={{ fontFamily: "icomoon" }}
                aria-hidden
              >
                {"\ue90c"}
              </span>
              محصولات گربه
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 text-[30px] text-[#f92f25] md:text-[40px]"
                style={{ fontFamily: "icomoon" }}
                aria-hidden
              >
                {"\ue910"}
              </span>
            </h1>

            <CategoryFilter categories={catCategories} />
          </div>

          <div className="mb-0 grid grid-cols-2 gap-[15px] md:mb-[90px] md:grid-cols-3 md:gap-5">
            {catProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Breadcrumb
        items={[
          { label: "صفحه اصلی", href: "/" },
          { label: "محصولات گربه", href: "/cat/all/" },
        ]}
      />

      <Footer />
    </>
  );
}
