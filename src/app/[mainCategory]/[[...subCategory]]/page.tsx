import { notFound } from "next/navigation";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import ProductsListPage from "@/components/products/ProductsListPage";

interface Props {
  params: Promise<{
    mainCategory: string;
    subCategory?: string[];
  }>;
}

// تولید همه مسیرهای معتبر هنگام build
export async function generateStaticParams() {
  const mainCats = await prisma.productCategory.findMany({
    where: { ParentId: 0, Deleted: false, Actice: true, Lang: 1 },
    select: { urlTitle: true, Id: true },
  });

  const params: { mainCategory: string; subCategory?: string[] }[] = [];

  for (const main of mainCats) {
    if (!main.urlTitle) continue;

    // صفحه اصلی دسته: /cat
    params.push({ mainCategory: main.urlTitle });

    // زیردسته‌ها: /cat/cat-soil
    const subs = await prisma.productCategory.findMany({
      where: { ParentId: main.Id, Deleted: false, Lang: 1 },
      select: { urlTitle: true },
    });

    for (const sub of subs) {
      if (!sub.urlTitle) continue;
      params.push({ mainCategory: main.urlTitle, subCategory: [sub.urlTitle] });
    }
  }

  return params;
}

// متادیتا داینامیک
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mainCategory, subCategory } = await params;
  const subCatSlug = subCategory?.[0];

  const mainCat = await prisma.productCategory.findFirst({
    where: { urlTitle: mainCategory, ParentId: 0, Deleted: false, Lang: 1 },
    select: { Title: true, SeoTitle: true, SeoLead: true },
  });

  if (!mainCat) return { title: "دودوتی" };

  let title = mainCat.SeoTitle ?? `${mainCat.Title} | دودوتی`;
  let description = mainCat.SeoLead ?? `انواع ${mainCat.Title} دودوتی`;
  const canonical = subCatSlug
    ? `https://dudoti.com/${mainCategory}/${subCatSlug}/`
    : `https://dudoti.com/${mainCategory}/`;

  if (subCatSlug) {
    const subCat = await prisma.productCategory.findFirst({
      where: { urlTitle: subCatSlug, Deleted: false, Lang: 1 },
      select: { Title: true, SeoTitle: true, SeoLead: true },
    });
    if (subCat) {
      title = subCat.SeoTitle ?? `${subCat.Title} | دودوتی`;
      description = subCat.SeoLead ?? `انواع ${subCat.Title} دودوتی`;
    }
  }

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: "https://dudoti.com/img/dudotiLogo.png" }],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { mainCategory, subCategory } = await params;
  const subCatSlug = subCategory?.[0];

  // فقط یک سطح زیردسته مجاز است
  if (subCategory && subCategory.length > 1) notFound();

  // بررسی معتبر بودن دسته اصلی
  const mainCatExists = await prisma.productCategory.findFirst({
    where: { urlTitle: mainCategory, ParentId: 0, Deleted: false, Lang: 1 },
    select: { Id: true },
  });

  if (!mainCatExists) notFound();

  return (
    <ProductsListPage
      mainUrlTitle={mainCategory}
      subCatUrlTitle={subCatSlug}
    />
  );
}
