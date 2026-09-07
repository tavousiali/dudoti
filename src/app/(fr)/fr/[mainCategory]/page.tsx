import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import ProductsListPage from "@/components/products/ProductsListPage";

interface Props {
  params: Promise<{ mainCategory: string }>;
}

export async function generateStaticParams() {
  const cats = await prisma.productCategory.findMany({
    where: { ParentId: 0, Deleted: false, Actice: true, Lang: 3 },
    select: { urlTitle: true },
  });
  return cats.filter((c) => c.urlTitle).map((c) => ({ mainCategory: c.urlTitle as string }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mainCategory } = await params;
  const cat = await prisma.productCategory.findFirst({
    where: { urlTitle: mainCategory, ParentId: 0, Deleted: false, Lang: 3 },
    select: { Title: true, SeoTitle: true, SeoLead: true },
  });
  if (!cat) return { title: "Dudoti" };
  const title = cat.SeoTitle ?? `${cat.Title} | Dudoti`;
  const description = cat.SeoLead ?? `${cat.Title} - Dudoti`;
  const canonical = `https://dudoti.com/fr/${mainCategory}/`;
  return { title, description, alternates: { canonical } };
}

export default async function FrMainCategoryPage({ params }: Props) {
  const { mainCategory } = await params;
  const exists = await prisma.productCategory.findFirst({
    where: { urlTitle: mainCategory, ParentId: 0, Deleted: false, Lang: 3 },
    select: { Id: true },
  });
  if (!exists) notFound();
  return <ProductsListPage mainUrlTitle={mainCategory} langId={3} />;
}
