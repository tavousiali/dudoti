import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import ProductsListPage from "@/components/products/ProductsListPage";

interface Props {
  params: Promise<{ mainCategory: string }>;
}

export async function generateStaticParams() {
  const mainCats = await prisma.productCategory.findMany({
    where: { ParentId: 0, Deleted: false, Actice: true, Lang: 1 },
    select: { urlTitle: true },
  });
  return mainCats
    .filter((c) => c.urlTitle)
    .map((c) => ({ mainCategory: c.urlTitle as string }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mainCategory } = await params;

  const mainCat = await prisma.productCategory.findFirst({
    where: { urlTitle: mainCategory, ParentId: 0, Deleted: false, Lang: 1 },
    select: { Title: true, SeoTitle: true, SeoLead: true },
  });

  if (!mainCat) return { title: "دودوتی" };

  const title = mainCat.SeoTitle ?? `${mainCat.Title} | دودوتی`;
  const description = mainCat.SeoLead ?? `انواع ${mainCat.Title} دودوتی`;
  const canonical = `https://dudoti.com/${mainCategory}/`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, images: [{ url: "https://dudoti.com/img/dudotiLogo.png" }] },
  };
}

export default async function MainCategoryPage({ params }: Props) {
  const { mainCategory } = await params;

  const mainCatExists = await prisma.productCategory.findFirst({
    where: { urlTitle: mainCategory, ParentId: 0, Deleted: false, Lang: 1 },
    select: { Id: true },
  });
  if (!mainCatExists) notFound();

  return <ProductsListPage mainUrlTitle={mainCategory} />;
}
