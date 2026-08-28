import ProductsListPage from "@/components/products/ProductsListPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصولات جوندگان | دودوتی",
  description: "انواع محصولات جوندگان دودوتی؛ اسباب‌بازی تقویت سلامت دندان و محصولات بهداشتی",
  alternates: { canonical: "https://dudoti.com/rodent/" },
  openGraph: {
    title: "محصولات جوندگان | دودوتی",
    description: "انواع محصولات جوندگان دودوتی",
    url: "https://dudoti.com/rodent/",
    images: [{ url: "https://dudoti.com/img/dudotiLogo.png" }],
  },
};

export default function RodentPage() {
  return <ProductsListPage mainUrlTitle="rodent" />;
}
