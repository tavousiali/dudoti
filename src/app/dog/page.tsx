import ProductsListPage from "@/components/products/ProductsListPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصولات سگ | دودوتی",
  description: "انواع محصولات سگ دودوتی؛ بیسکوییت‌های تخصصی، تشویقی‌های سلامت‌محور و محصولات بهداشتی",
  alternates: { canonical: "https://dudoti.com/dog/" },
  openGraph: {
    title: "محصولات سگ | دودوتی",
    description: "انواع محصولات سگ دودوتی",
    url: "https://dudoti.com/dog/",
    images: [{ url: "https://dudoti.com/img/dudotiLogo.png" }],
  },
};

export default function DogPage() {
  return <ProductsListPage mainUrlTitle="dog" />;
}
