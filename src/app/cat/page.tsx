import ProductsListPage from "@/components/products/ProductsListPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصولات گربه | دودوتی",
  description: "انواع محصولات گربه دودوتی؛ ظرف خاک، وود پلت، جای خواب، اسکرچر، اسباب‌بازی و بذرهای گیاهی",
  alternates: { canonical: "https://dudoti.com/cat/" },
  openGraph: {
    title: "محصولات گربه | دودوتی",
    description: "انواع محصولات گربه دودوتی",
    url: "https://dudoti.com/cat/",
    images: [{ url: "https://dudoti.com/img/dudotiLogo.png" }],
  },
};

export default function CatPage() {
  return <ProductsListPage mainUrlTitle="cat" />;
}
