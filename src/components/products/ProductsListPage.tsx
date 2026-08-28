import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";
import PageTitle from "@/components/layout/PageTitle";
import type { CatCategory } from "@/data/cat-products";

interface Props {
  mainUrlTitle: string; // "cat" | "dog" | "rodent"
  subCatUrlTitle?: string; // اگر روی یه زیردسته خاص هستیم
}

export default async function ProductsListPage({ mainUrlTitle, subCatUrlTitle }: Props) {
  // ۱. دسته اصلی را پیدا کن
  const mainCat = await prisma.productCategory.findFirst({
    where: { urlTitle: mainUrlTitle, ParentId: 0, Deleted: false, Lang: 1 },
  });

  if (!mainCat) {
    return (
      <main className="min-h-screen bg-white" dir="rtl">
        <div className="mx-auto max-w-[1140px] px-4 py-16 text-center text-gray-500">
          دسته‌بندی یافت نشد
        </div>
      </main>
    );
  }

  // ۲. زیردسته‌ها
  const subCats = await prisma.productCategory.findMany({
    where: { ParentId: mainCat.Id, Deleted: false, Lang: 1 },
    orderBy: [{ Priority: "desc" }, { Id: "asc" }],
    select: { Id: true, Title: true, urlTitle: true },
  });

  // ساخت لیست فیلتر برای CategoryFilter
  const filterCategories: CatCategory[] = [
    ...subCats
      .filter((c) => c.urlTitle)
      .map((c) => ({
        label: c.Title,
        href: `/${mainUrlTitle}/${c.urlTitle}/`,
      })),
    { label: `همه محصولات`, href: `/${mainUrlTitle}/` },
  ];

  // ۳. محصولات — اگر زیردسته انتخاب شده، فقط اون زیردسته؛ وگرنه همه
  let catIdFilter: number | undefined;
  let currentLabel = "همه محصولات";

  if (subCatUrlTitle) {
    const subCat = subCats.find((c) => c.urlTitle === subCatUrlTitle);
    if (subCat) {
      catIdFilter = subCat.Id;
      currentLabel = subCat.Title;
    }
  }

  const products = await prisma.product.findMany({
    where: {
      Deleted: false,
      Lang: 1,
      MainUrlTitle: mainUrlTitle,
      ...(catIdFilter ? { CatId: catIdFilter } : {}),
    },
    orderBy: [{ Priority: "desc" }, { Id: "asc" }],
    select: {
      Id: true,
      Title: true,
      SubTitle: true,
      urlTitle: true,
      urlTitlteCat: true,
      ListImageMain: true,
      ListImageOver: true,
    },
  });

  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <div className="mx-auto max-w-[1140px] px-4 py-8 md:py-12">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between md:mb-12">
          <PageTitle title={mainCat.Title} as="h1" className="" />
          {filterCategories.length > 1 && (
            <CategoryFilter
              categories={filterCategories}
              currentLabel={currentLabel}
            />
          )}
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <p className="py-16 text-center text-gray-400">محصولی یافت نشد</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {products.map((product) => {
              // ساخت آدرس محصول: /cat/cat-soil/thin-seed
              const href = product.urlTitlteCat && product.urlTitle
                ? `/${mainUrlTitle}/${product.urlTitlteCat}/${product.urlTitle}/`
                : `/${mainUrlTitle}/${product.urlTitle ?? product.Id}/`;

              return (
                <ProductCard
                  key={product.Id}
                  title={product.Title ?? ""}
                  titleEn={product.SubTitle ?? undefined}
                  imagePath={product.ListImageMain ?? "/images/logo.png"}
                  flavorImagePath={product.ListImageOver ?? undefined}
                  link={href}
                  useNextLink={true}
                />
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}
