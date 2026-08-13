"use client";

import { useState, useEffect } from "react";
import { useAdminLang } from "./AdminLangContext";
import EditCategoryForm from "./EditCategoryForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Cat = any;

interface Props {
  initialCategory: Cat;
}

export default function EditCategoryLangWrapper({ initialCategory }: Props) {
  const { lang } = useAdminLang();
  const [category, setCategory] = useState<Cat>(initialCategory);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // اگه زبان با زبان رکورد فعلی یکی بود، نیازی به re-fetch نیست
    if (lang === initialCategory.Lang) {
      setCategory(initialCategory);
      setNotFound(false);
      return;
    }

    // با urlTitle رکورد معادل رو در زبان جدید پیدا کن
    const urlTitle = initialCategory.urlTitle;
    if (!urlTitle) {
      setNotFound(true);
      return;
    }

    setLoading(true);
    setNotFound(false);

    fetch(`/api/admin/product-categories?lang=${lang}&urlTitle=${encodeURIComponent(urlTitle)}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          setCategory(json.data[0]);
        } else {
          setNotFound(true);
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
          محتوای این دسته‌بندی برای زبان انتخابی هنوز ایجاد نشده است.
        </div>
      </div>
    );
  }

  return <EditCategoryForm key={`${lang}-${category.Id}`} category={category} />;
}
