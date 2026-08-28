import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import ProductsListPage from "@/components/products/ProductsListPage";

interface Props {
  params: Promise<{
    mainCategory: string;
    subCategory: string;
  }>;
}

export async function generateStaticParams() {
  const mainCats = await prisma.productCategory.findMany({
    where: { ParentId: 0, Deleted: false, Actice: true, Lang: 1 },
    select: { urlTitle: true, Id: true },
  });

  const params: { mainCategory: string; subCategory: string }[] = [];

  for (const main of mainCats) {
    if (!main.urlTitle) continue;
    const subs = await prisma.productCategory.findMany({
      where: { ParentId: main.Id, Deleted: false, Lang: 1 },
      select: { urlTitle: true },
    });
    for (const sub of subs) {
      if (!sub.urlTitle) continue;
      params.push({ mainCategory: main.urlTitle, subCategory: sub.urlTitle });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mainCategory, subCategory } = await params;

  const subCat = await prisma.productCategory.findFirst({
    where: { urlTitle: subCategory, Deleted: false, Lang: 1 },
    select: { Title: true, SeoTitle: true, SeoLead: true },
  });

  if (!subCat) return { title: "دودوتی" };

  const title = subCat.SeoTitle ?? `${subCat.Title} | دودوتی`;
  const description = subCat.SeoLead ?? `انواع ${subCat.Title} دودوتی`;
  const canonical = `https://dudoti.com/${mainCategory}/${subCategory}/`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, images: [{ url: "https://dudoti.com/img/dudotiLogo.png" }] },
  };
}

export default async function SubCategoryPage({ params }: Props) {
  const { mainCategory, subCategory } = await params;

  const mainCatExists = await prisma.productCategory.findFirst({
    where: { urlTitle: mainCategory, ParentId: 0, Deleted: false, Lang: 1 },
    select: { Id: true },
  });
  if (!mainCatExists) notFound();

  const subCatExists = await prisma.productCategory.findFirst({
    where: { urlTitle: subCategory, ParentId: mainCatExists.Id, Deleted: false, Lang: 1 },
    select: { Id: true },
  });
  if (!subCatExists) notFound();

  return <ProductsListPage mainUrlTitle={mainCategory} subCatUrlTitle={subCategory} />;
}
