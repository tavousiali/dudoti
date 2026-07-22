import PageTitle from "@/components/layout/PageTitle";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";
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

const categories = [
  { href: "/cat/litter-box", label: "ظرف خاک" },
  { href: "/cat/wood-pellet", label: "وود پلت" },
  { href: "/cat/bed", label: "جای خواب" },
  { href: "/cat/scratcher", label: "اسکرچر گربه" },
  { href: "/cat/toys", label: "اسباب بازی گربه" },
  { href: "/cat/plant-seeds", label: "بذرهای گیاهی" },
  { href: "/cat/natural-medicine", label: "پدر طبیعی" },
  { href: "/cat/all", label: "همه محصولات گربه" },
];

const testProducts = [
  {
    id: 1,
    title: "بذر نازک",
    titleEn: "دفع توپ مویی",
    imagePath: "/images/products/ProductL_21.png",
    flavorImagePath: "/images/products/ProductLO_21.png",
    link: "/cat/products/thin-seed"
  },
  {
    id: 2,
    title: "جای خواب گربه",
    titleEn: "Cat Bed",
    imagePath: "/images/products/ProductL_22.png",
    flavorImagePath: "/images/products/ProductLO_22.png",
    link: "/cat/products/cat-bed"
  },
  {
    id: 3,
    title: "اسکرچر گربه",
    titleEn: "Cat Scratcher",
    imagePath: "/images/products/ProductL_23.png",
    flavorImagePath: "/images/products/ProductLO_23.png",
    link: "/cat/products/scratcher"
  }
];

export default function CatProductsPage() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <div className="mx-auto max-w-[1140px] px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between md:mb-12">
          <PageTitle title="محصولات گربه" as="h2" />
          <CategoryFilter
            categories={categories}
            currentLabel="همه محصولات گربه"
          />
        </div>

        {/* Layout Container */}
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {testProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  titleEn={product.titleEn}
                  imagePath={product.imagePath}
                  flavorImagePath={product.flavorImagePath}
                  link={product.link}
                  useNextLink={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
