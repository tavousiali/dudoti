import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/products/CategoryFilter";
import PageTitle from "@/components/layout/PageTitle";
import type { CatCategory } from "@/data/cat-products";
import type { LangId } from "@/components/layout/LocaleContext";

interface Props {
  mainUrlTitle: string;
  subCatUrlTitle?: string;
  langId?: LangId; // defaults to 1 (Persian) for the root routes
}

export default async function ProductsListPage({
  mainUrlTitle,
  subCatUrlTitle,
  langId = 1,
}: Props) {
  const dir = langId === 1 ? "rtl" : "ltr";

  // 1. Find the main category for this language
  const mainCat = await prisma.productCategory.findFirst({
    where: { urlTitle: mainUrlTitle, ParentId: 0, Deleted: false, Lang: langId },
  });

  if (!mainCat) {
    return (
      <main className="min-h-screen bg-white" dir={dir}>
        <div className="mx-auto max-w-[1140px] px-4 py-16 text-center text-gray-500">
          {langId === 1 ? "دسته‌بندی یافت نشد" : "Category not found"}
        </div>
      </main>
    );
  }

  // 2. Sub-categories
  const subCats = await prisma.productCategory.findMany({
    where: { ParentId: mainCat.Id, Deleted: false, Lang: langId },
    orderBy: [{ Priority: "desc" }, { Id: "asc" }],
    select: { Id: true, Title: true, urlTitle: true },
  });

  const allLabel =
    langId === 1
      ? `همه ${mainCat.Title}`
      : `All ${mainCat.Title}`;

  const filterCategories: CatCategory[] = [
    ...subCats
      .filter((c) => c.urlTitle)
      .map((c) => ({
        label: c.Title,
        href: `/${mainUrlTitle}/${c.urlTitle}/`,
      })),
    { label: allLabel, href: `/${mainUrlTitle}/` },
  ];

  // 3. Products
  let catIdFilter: number | undefined;
  let currentLabel = allLabel;

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
      Lang: langId,
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
    <main className="min-h-screen bg-white" dir={dir}>
      <div className="mx-auto max-w-[1140px] px-4 py-8 md:py-12">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between md:mb-12">
          <PageTitle title={mainCat.Title} as="h1" />
          {filterCategories.length > 1 && (
            <CategoryFilter
              categories={filterCategories}
              currentLabel={currentLabel}
            />
          )}
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <p className="py-16 text-center text-gray-400">
            {langId === 1 ? "محصولی یافت نشد" : "No products found"}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {products.map((product) => {
              const href =
                product.urlTitlteCat && product.urlTitle
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
