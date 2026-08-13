"use client";

import { useState, useEffect } from "react";
import { useAdminLang } from "./AdminLangContext";
import ProductForm from "./ProductForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProductData = any;
interface Cat { Id: number; Title: string; ParentName: string | null; urlTitle: string | null; ParentId: number; }
interface MainCat { Id: number; Title: string; urlTitle: string | null; }

interface Props {
  initialProduct: ProductData;
  cats: Cat[];
  mainCats: MainCat[];
}

export default function EditProductLangWrapper({ initialProduct, cats: initialCats, mainCats: initialMainCats }: Props) {
  const { lang } = useAdminLang();
  const [product, setProduct] = useState<ProductData>(initialProduct);
  const [cats, setCats] = useState<Cat[]>(initialCats);
  const [mainCats, setMainCats] = useState<MainCat[]>(initialMainCats);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (lang === initialProduct.Lang) {
      setProduct(initialProduct);
      setCats(initialCats);
      setMainCats(initialMainCats);
      setNotFound(false);
      return;
    }

    const urlTitle = initialProduct.urlTitle;
    if (!urlTitle) { setNotFound(true); return; }

    setLoading(true);
    setNotFound(false);

    Promise.all([
      fetch(`/api/admin/products?lang=${lang}&urlTitle=${encodeURIComponent(urlTitle)}&limit=1`).then((r) => r.json()),
      fetch(`/api/admin/product-categories?lang=${lang}`).then((r) => r.json()),
    ])
      .then(([productJson, catsJson]) => {
        if (productJson.success && productJson.data.length > 0) {
          setProduct(productJson.data[0]);
        } else {
          setNotFound(true);
        }
        if (catsJson.success) {
          const allCats: Cat[] = catsJson.data;
          setCats(allCats.filter((c: { ParentId: number }) => c.ParentId !== 0));
          setMainCats(
            allCats
              .filter((c: { ParentId: number }) => c.ParentId === 0)
              .map((c: { Id: number; Title: string; urlTitle: string | null }) => ({ Id: c.Id, Title: c.Title, urlTitle: c.urlTitle }))
          );
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div style={{
        background: "#fff", borderRadius: "10px", padding: "60px",
        textAlign: "center", color: "#aaa", boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
      }}>
        در حال بارگذاری اطلاعات برای زبان انتخابی...
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={{
        background: "#fff8ee", border: "1px solid #ffe0a0", borderRadius: "10px",
        padding: "32px 24px", textAlign: "center", color: "#b87000",
      }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>🌐</div>
        <div style={{ fontWeight: 600, marginBottom: "6px" }}>رکوردی برای این زبان یافت نشد</div>
        <div style={{ fontSize: "13px", color: "#aaa" }}>
          محتوای این محصول برای زبان انتخابی هنوز ایجاد نشده است.
        </div>
      </div>
    );
  }

  return (
    <ProductForm
      key={`${lang}-${product.Id}`}
      mode="edit"
      product={product}
      cats={cats}
      mainCats={mainCats}
    />
  );
}
