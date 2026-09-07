import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import ProductsListPage from "@/components/products/ProductsListPage";

interface Props {
  params: Promise<{ mainCategory: string; subCategory: string }>;
}

export async function generateStaticParams() {
  const params: { mainCategory: string; subCategory: string }[] = [];
  const mains = await prisma.productCategory.findMany({
    where: { ParentId: 0, Deleted: false, Actice: true, Lang: 3 },
    select: { urlTitle: true, Id: true },
  });
  for (const main of mains) {
    if (!main.urlTitle) continue;
    const subs = await prisma.productCategory.findMany({
      where: { ParentId: main.Id, Deleted: false, Lang: 3 },
      select: { urlTitle: true },
    });
    for (const sub of subs) {
      if (sub.urlTitle) params.push({ mainCategory: main.urlTitle, subCategory: sub.urlTitle });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mainCategory, subCategory } = await params;
  const cat = await prisma.productCategory.findFirst({
    where: { urlTitle: subCategory, Deleted: false, Lang: 3 },
    select: { Title: true, SeoTitle: true, SeoLead: true },
  });
  if (!cat) return { title: "Dudoti" };
  const title = cat.SeoTitle ?? `${cat.Title} | Dudoti`;
  const description = cat.SeoLead ?? `${cat.Title} - Dudoti`;
  const canonical = `https://dudoti.com/fr/${mainCategory}/${subCategory}/`;
  return { title, description, alternates: { canonical } };
}

export default async function FrSubCategoryPage({ params }: Props) {
  const { mainCategory, subCategory } = await params;
  const mainCat = await prisma.productCategory.findFirst({
    where: { urlTitle: mainCategory, ParentId: 0, Deleted: false, Lang: 3 },
    select: { Id: true },
  });
  if (!mainCat) notFound();
  const subCat = await prisma.productCategory.findFirst({
    where: { urlTitle: subCategory, ParentId: mainCat.Id, Deleted: false, Lang: 3 },
    select: { Id: true },
  });
  if (!subCat) notFound();
  return <ProductsListPage mainUrlTitle={mainCategory} subCatUrlTitle={subCategory} langId={3} />;
}
