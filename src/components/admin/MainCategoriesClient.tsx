"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAdminLang } from "./AdminLangContext";

interface Category {
  Id: number;
  Title: string;
  TitleEn: string | null;
  Pic1: string | null;
  ParentId: number;
  SeoTitle: string | null;
  urlTitle: string | null;
}

export default function MainCategoriesClient() {
  const { lang } = useAdminLang();

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCountMap, setSubCountMap] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/admin/product-categories?lang=${lang}&parentId=0`).then((r) => r.json()),
      fetch(`/api/admin/product-categories?lang=${lang}`).then((r) => r.json()),
    ]).then(([mainJson, allJson]) => {
      if (mainJson.success) setCategories(mainJson.data);
      if (allJson.success) {
        const map: Record<number, number> = {};
        allJson.data.forEach((c: { ParentId: number }) => {
          if (c.ParentId !== 0) map[c.ParentId] = (map[c.ParentId] ?? 0) + 1;
        });
        setSubCountMap(map);
      }
    }).finally(() => setLoading(false));
  }, [lang]);

  if (loading) {
    return (
      <div style={{ background: "#fff", borderRadius: "10px", padding: "60px", textAlign: "center", color: "#aaa" }}>
        در حال بارگذاری...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div style={{ background: "#fff", borderRadius: "10px", padding: "60px", textAlign: "center", color: "#aaa" }}>
        هیچ سردسته‌ای ثبت نشده است.
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "right" }}>
          <thead>
            <tr style={{ background: "#f8f8f8", borderBottom: "2px solid #eee" }}>
              {["شناسه", "عنوان", "تصویر", "زیردسته‌ها", "ویرایش", "حذف"].map((h) => (
                <th key={h} style={{ padding: "14px 18px", fontWeight: 600, color: "#666", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={cat.Id} style={{ borderBottom: "1px solid #f0f0f0", background: idx % 2 === 0 ? "#fff" : "#fafafa" }}>
                {/* شناسه */}
                <td style={{ padding: "14px 18px", color: "#999", fontWeight: 500, width: "70px" }}>{cat.Id}</td>

                {/* عنوان */}
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ fontWeight: 600, color: "#333", marginBottom: "2px" }}>{cat.Title}</div>
                  {cat.TitleEn && <div style={{ fontSize: "11px", color: "#aaa", direction: "ltr" }}>{cat.TitleEn}</div>}
                </td>

                {/* تصویر */}
                <td style={{ padding: "10px 18px", width: "90px" }}>
                  {cat.Pic1 ? (
                    <Image src={cat.Pic1} alt={cat.Title} width={54} height={54}
                      style={{ objectFit: "contain", borderRadius: "6px", background: "#f5f5f5", padding: "4px" }} />
                  ) : (
                    <div style={{ width: "54px", height: "54px", background: "#f0f0f0", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>📦</div>
                  )}
                </td>

                {/* زیردسته‌ها */}
                <td style={{ padding: "14px 18px", width: "130px" }}>
                  <Link href={`/AdminPanel/categories?parentId=${cat.Id}`}
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#fff8ee", color: "#f90", border: "1px solid #f90", padding: "5px 12px", borderRadius: "6px", textDecoration: "none", fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap" }}>
                    زیردسته‌ها
                    <span style={{ background: "#f90", color: "#fff", borderRadius: "10px", padding: "1px 7px", fontSize: "11px" }}>
                      {subCountMap[cat.Id] ?? 0}
                    </span>
                  </Link>
                </td>

                {/* ویرایش */}
                <td style={{ padding: "14px 18px", width: "90px" }}>
                  <Link href={`/AdminPanel/main-categories/${cat.Id}/edit`}
                    style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#2980b9", textDecoration: "none", fontSize: "13px", fontWeight: 500, background: "#eaf4fb", padding: "5px 12px", borderRadius: "6px" }}>
                    ✏️ ویرایش
                  </Link>
                </td>

                {/* حذف */}
                <td style={{ padding: "14px 18px", width: "80px" }}>
                  <DeleteBtn id={cat.Id} title={cat.Title}
                    onDeleted={() => setCategories((prev) => prev.filter((c) => c.Id !== cat.Id))} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DeleteBtn({ id, title, onDeleted }: { id: number; title: string; onDeleted: () => void }) {
  const [pending, startTransition] = useTransition();
  const handleClick = () => {
    if (!confirm(`آیا از حذف "${title}" مطمئن هستید؟`)) return;
    startTransition(async () => {
      const res = await fetch(`/api/admin/product-categories/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) onDeleted();
      else alert(json.message ?? "خطا در حذف");
    });
  };
  return (
    <button onClick={handleClick} disabled={pending} style={{
      display: "inline-flex", alignItems: "center", gap: "4px",
      background: pending ? "#f5f5f5" : "#fdecea",
      color: pending ? "#aaa" : "#e74c3c", border: "none",
      padding: "5px 12px", borderRadius: "6px", fontSize: "13px",
      fontWeight: 500, cursor: pending ? "not-allowed" : "pointer",
      fontFamily: "inherit", whiteSpace: "nowrap",
    }}>
      {pending ? "..." : "🗑️ حذف"}
    </button>
  );
}
