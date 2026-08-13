"use client";

import { useState, useTransition, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAdminLang } from "./AdminLangContext";

interface Category {
  Id: number;
  Title: string;
  TitleEn: string | null;
  Pic1: string | null;
  ParentId: number;
  ParentName: string | null;
  Priority: number;
  ShowMenu: boolean;
  Actice: boolean;
}

interface MainCat { Id: number; Title: string; }

interface Props {
  initialCategories: Category[];
  initialParentId: number | null;
  mainCats: MainCat[];
  productCountMap: Record<number, number>;
}

export default function CategoriesTable({
  initialCategories,
  initialParentId,
  mainCats: initialMainCats,
  productCountMap: initialProductCountMap,
}: Props) {
  const { lang } = useAdminLang();

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [mainCats, setMainCats] = useState<MainCat[]>(initialMainCats);
  const [productCountMap, setProductCountMap] = useState<Record<number, number>>(initialProductCountMap);
  const [selectedParentId, setSelectedParentId] = useState<number | null>(initialParentId);
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");

  // وقتی زبان تغییر کرد، همه چیز رو از API بگیر
  const fetchAll = useCallback(async (langId: number, parentId: number | null) => {
    setLoading(true);
    setSearchTitle("");

    const [catsRes, mainCatsRes] = await Promise.all([
      fetch(parentId !== null
        ? `/api/admin/product-categories?lang=${langId}&parentId=${parentId}`
        : `/api/admin/product-categories?lang=${langId}`),
      fetch(`/api/admin/product-categories?lang=${langId}&parentId=0`),
    ]);

    const [catsJson, mainJson] = await Promise.all([catsRes.json(), mainCatsRes.json()]);

    if (catsJson.success) {
      setCategories(
        parentId !== null
          ? catsJson.data
          : catsJson.data.filter((c: Category) => c.ParentId !== 0)
      );
    }
    if (mainJson.success) setMainCats(mainJson.data);

    // product counts
    const countRes = await fetch(`/api/admin/products?lang=${langId}&limit=1000&page=1`);
    const countJson = await countRes.json();
    if (countJson.success) {
      const map: Record<number, number> = {};
      countJson.data.forEach((p: { CatId: number | null }) => {
        if (p.CatId) map[p.CatId] = (map[p.CatId] ?? 0) + 1;
      });
      setProductCountMap(map);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll(lang, selectedParentId);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleParentChange = async (value: string) => {
    const pid = value === "" ? null : Number(value);
    setSelectedParentId(pid);
    setLoading(true);

    const url = pid !== null
      ? `/api/admin/product-categories?lang=${lang}&parentId=${pid}`
      : `/api/admin/product-categories?lang=${lang}`;

    const res = await fetch(url);
    const json = await res.json();
    if (json.success) {
      setCategories(
        pid !== null ? json.data : json.data.filter((c: Category) => c.ParentId !== 0)
      );
    }
    setLoading(false);
    window.history.replaceState(null, "",
      pid ? `/AdminPanel/dashboard/products/categories?parentId=${pid}`
        : `/AdminPanel/dashboard/products/categories`);
  };

  const filtered = categories.filter((c) =>
    searchTitle === "" ||
    c.Title.includes(searchTitle) ||
    (c.TitleEn ?? "").toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
      {/* Toolbar */}
      <div style={{
        padding: "14px 18px", borderBottom: "2px solid #eee",
        display: "flex", alignItems: "center", gap: "16px",
        flexWrap: "wrap", direction: "rtl", background: "#f8f8f8",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "#666", whiteSpace: "nowrap" }}>فیلتر سردسته:</span>
          <select value={selectedParentId ?? ""} onChange={(e) => handleParentChange(e.target.value)}
            style={{ padding: "7px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", color: "#333", background: "#fff", fontFamily: "inherit", cursor: "pointer", minWidth: "180px", outline: "none" }}>
            <option value="">همه دسته‌بندی‌ها</option>
            {mainCats.map((mc) => <option key={mc.Id} value={mc.Id}>{mc.Title}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "#666", whiteSpace: "nowrap" }}>جستجو:</span>
          <input type="text" placeholder="عنوان..." value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            style={{ padding: "7px 12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "13px", color: "#333", background: "#fff", fontFamily: "inherit", minWidth: "160px", outline: "none" }} />
        </div>
        <div style={{ marginRight: "auto", fontSize: "12px", color: "#aaa" }}>
          {loading ? "در حال بارگذاری..." : `${filtered.length} مورد`}
        </div>
      </div>

      {loading ? (
        <div style={{ padding: "60px", textAlign: "center", color: "#aaa" }}>در حال بارگذاری...</div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: "60px", textAlign: "center", color: "#aaa" }}>هیچ دسته‌بندی‌ای یافت نشد.</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "right" }}>
            <thead>
              <tr style={{ background: "#f8f8f8", borderBottom: "2px solid #eee" }}>
                {["شناسه", "عنوان", "تصویر", "سردسته", "محصولات", "ویرایش", "حذف"].map((h) => (
                  <th key={h} style={{ padding: "13px 18px", fontWeight: 600, color: "#666", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((cat, idx) => (
                <tr key={cat.Id} style={{ borderBottom: "1px solid #f0f0f0", background: idx % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "12px 18px", color: "#999", fontWeight: 500, width: "70px" }}>{cat.Id}</td>
                  <td style={{ padding: "12px 18px" }}>
                    <div style={{ fontWeight: 600, color: "#333" }}>{cat.Title}</div>
                    {cat.TitleEn && <div style={{ fontSize: "11px", color: "#aaa", direction: "ltr" }}>{cat.TitleEn}</div>}
                  </td>
                  <td style={{ padding: "8px 18px", width: "80px" }}>
                    {cat.Pic1 ? (
                      <Image src={cat.Pic1} alt={cat.Title} width={48} height={48}
                        style={{ objectFit: "contain", borderRadius: "6px", background: "#f5f5f5", padding: "3px" }} />
                    ) : (
                      <div style={{ width: "48px", height: "48px", background: "#f0f0f0", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>📦</div>
                    )}
                  </td>
                  <td style={{ padding: "12px 18px" }}>
                    <span style={{ background: "#fff8ee", color: "#f90", border: "1px solid #ffe0a0", padding: "3px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: 500, whiteSpace: "nowrap" }}>
                      {cat.ParentName ?? "—"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 18px", width: "110px" }}>
                    <Link href={`/AdminPanel/dashboard/products/list?catId=${cat.Id}`}
                      style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#eaf4fb", color: "#2980b9", border: "1px solid #b8d9ef", padding: "4px 11px", borderRadius: "6px", textDecoration: "none", fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap" }}>
                      محصولات
                      <span style={{ background: "#2980b9", color: "#fff", borderRadius: "10px", padding: "1px 6px", fontSize: "11px" }}>
                        {productCountMap[cat.Id] ?? 0}
                      </span>
                    </Link>
                  </td>
                  <td style={{ padding: "12px 18px", width: "90px" }}>
                    <Link href={`/AdminPanel/dashboard/products/categories/${cat.Id}/edit`}
                      style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#2980b9", textDecoration: "none", fontSize: "13px", fontWeight: 500, background: "#eaf4fb", padding: "5px 12px", borderRadius: "6px", whiteSpace: "nowrap" }}>
                      ✏️ ویرایش
                    </Link>
                  </td>
                  <td style={{ padding: "12px 18px", width: "80px" }}>
                    <DeleteBtn id={cat.Id} title={cat.Title}
                      onDeleted={() => setCategories((prev) => prev.filter((c) => c.Id !== cat.Id))} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
