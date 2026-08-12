"use client";

import { useState, useTransition, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  Id: number;
  Title: string | null;
  TitleEn: string | null;
  Pic1: string | null;
  CatId: number | null;
  CatName: string | null;
  Priority: number | null;
  IsNew: boolean;
  Av: number | null;
  CurrentPrice: number | null;
  CurrentOffPrice: number | null;
  Lead: string | null;
}

interface Cat {
  Id: number;
  Title: string;
  ParentName: string | null;
}

interface Props {
  initialProducts: Product[];
  initialCatId: number | null;
  initialTotal: number;
  allCats: Cat[];
}

export default function ProductsTable({
  initialProducts,
  initialCatId,
  initialTotal,
  allCats,
}: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [total, setTotal] = useState(initialTotal);
  const [selectedCatId, setSelectedCatId] = useState<number | null>(initialCatId);
  const [searchId, setSearchId] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const LIMIT = 50;

  const fetchProducts = useCallback(
    async (catId: number | null, sid: string, stitle: string, p: number) => {
      setLoading(true);
      const params = new URLSearchParams({ lang: "1", limit: String(LIMIT), page: String(p) });
      if (catId !== null) params.set("catId", String(catId));
      if (stitle) params.set("search", stitle);
      const res = await fetch(`/api/admin/products?${params}`);
      const json = await res.json();
      if (json.success) {
        // فیلتر شناسه سمت کلاینت
        const data = sid
          ? json.data.filter((x: Product) => String(x.Id).includes(sid))
          : json.data;
        setProducts(data);
        setTotal(json.total);
      }
      setLoading(false);
    },
    []
  );

  const handleCatChange = (val: string) => {
    const cid = val === "" ? null : Number(val);
    setSelectedCatId(cid);
    setPage(1);
    fetchProducts(cid, searchId, searchTitle, 1);
    window.history.replaceState(
      null, "",
      cid
        ? `/AdminPanel/dashboard/products/list?catId=${cid}`
        : `/AdminPanel/dashboard/products/list`
    );
  };

  const handlePage = (p: number) => {
    setPage(p);
    fetchProducts(selectedCatId, searchId, searchTitle, p);
  };

  const totalPages = Math.ceil(total / LIMIT);

  // فیلتر محلی روی شناسه
  const visible = searchId
    ? products.filter((p) => String(p.Id).includes(searchId))
    : products;

  return (
    <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", overflow: "hidden" }}>
      {/* ── جدول ── */}
      {loading ? (
        <div style={{ padding: "60px", textAlign: "center", color: "#aaa" }}>در حال بارگذاری...</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", direction: "rtl" }}>
            <thead>
              {/* ردیف عناوین ستون */}
              <tr style={{ background: "#e8e8e8", borderBottom: "1px solid #d0d0d0" }}>
                <th style={thStyle}>شناسه</th>
                <th style={{ ...thStyle, textAlign: "right" }}>عنوان</th>
                <th style={thStyle}>تصویر</th>
                <th style={thStyle}>ویرایش</th>
                <th style={thStyle}>حذف</th>
              </tr>

              {/* ردیف فیلترها */}
              <tr style={{ background: "#f2f2f2", borderBottom: "2px solid #ddd" }}>
                {/* فیلتر شناسه */}
                <td style={{ padding: "6px 10px", textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
                    <input
                      type="text"
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      style={filterInput}
                      placeholder=""
                    />
                    <span style={filterIcon}>▼</span>
                  </div>
                </td>

                {/* فیلتر عنوان */}
                <td style={{ padding: "6px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <input
                      type="text"
                      value={searchTitle}
                      onChange={(e) => {
                        setSearchTitle(e.target.value);
                        setPage(1);
                        fetchProducts(selectedCatId, searchId, e.target.value, 1);
                      }}
                      style={filterInput}
                      placeholder=""
                    />
                    <span style={filterIcon}>▼</span>
                  </div>
                </td>

                {/* فیلتر دسته روی ستون تصویر */}
                <td style={{ padding: "6px 10px", textAlign: "center" }}>
                  <select
                    value={selectedCatId ?? ""}
                    onChange={(e) => handleCatChange(e.target.value)}
                    style={{ ...filterInput, width: "120px", cursor: "pointer" }}
                  >
                    <option value="">همه</option>
                    {allCats.map((c) => (
                      <option key={c.Id} value={c.Id}>{c.Title}</option>
                    ))}
                  </select>
                </td>

                <td />
                <td />
              </tr>
            </thead>

            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "50px", textAlign: "center", color: "#aaa" }}>
                    محصولی یافت نشد.
                  </td>
                </tr>
              ) : (
                visible.map((p, idx) => (
                  <ProductRow
                    key={p.Id}
                    product={p}
                    idx={idx}
                    onDeleted={() => {
                      setProducts((prev) => prev.filter((x) => x.Id !== p.Id));
                      setTotal((t) => t - 1);
                    }}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div style={{
          padding: "12px 16px", borderTop: "1px solid #eee",
          display: "flex", alignItems: "center", gap: "6px",
          justifyContent: "center", direction: "ltr",
        }}>
          <button onClick={() => handlePage(page - 1)} disabled={page <= 1} style={pgBtn(page <= 1)}>«</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 2)
            .reduce<(number | string)[]>((acc, n, i, arr) => {
              if (i > 0 && (arr[i - 1] as number) !== n - 1) acc.push("…");
              acc.push(n);
              return acc;
            }, [])
            .map((n, i) =>
              n === "…" ? (
                <span key={`e${i}`} style={{ color: "#aaa", padding: "0 4px" }}>…</span>
              ) : (
                <button key={n} onClick={() => handlePage(n as number)} style={pgBtn(false, n === page)}>
                  {n}
                </button>
              )
            )}
          <button onClick={() => handlePage(page + 1)} disabled={page >= totalPages} style={pgBtn(page >= totalPages)}>»</button>
        </div>
      )}

      {/* ── وضعیت ── */}
      <div style={{
        padding: "8px 16px", borderTop: "1px solid #f0f0f0",
        fontSize: "12px", color: "#aaa", textAlign: "right", direction: "rtl",
      }}>
        {loading ? "در حال بارگذاری..." : `مجموع: ${total} محصول`}
      </div>
    </div>
  );
}

// ── ProductRow ───────────────────────────────────────────────
function ProductRow({
  product: p,
  idx,
  onDeleted,
}: {
  product: Product;
  idx: number;
  onDeleted: () => void;
}) {
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`آیا از حذف "${p.Title}" مطمئن هستید؟`)) return;
    startTransition(async () => {
      const res = await fetch(`/api/admin/products/${p.Id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) onDeleted();
      else alert(json.message ?? "خطا در حذف");
    });
  };

  return (
    <tr style={{
      borderBottom: "1px solid #ececec",
      background: idx % 2 === 0 ? "#ffffff" : "#f7f7f7",
    }}>
      {/* شناسه */}
      <td style={{ padding: "10px 14px", color: "#888", fontSize: "13px", textAlign: "center", width: "70px" }}>
        {p.Id}
      </td>

      {/* عنوان */}
      <td style={{ padding: "10px 14px", textAlign: "right" }}>
        <span style={{ fontWeight: 500, color: "#333", fontSize: "13px" }}>
          {p.Title ?? "—"}
        </span>
      </td>

      {/* تصویر */}
      <td style={{ padding: "6px 14px", textAlign: "center", width: "90px" }}>
        {p.Pic1 ? (
          <Image
            src={p.Pic1}
            alt={p.Title ?? ""}
            width={56}
            height={56}
            style={{
              objectFit: "contain",
              borderRadius: "4px",
              border: "1px solid #e8e8e8",
              background: "#fff",
              padding: "2px",
            }}
          />
        ) : (
          <div style={{
            width: "56px", height: "56px", margin: "0 auto",
            background: "#f0f0f0", borderRadius: "4px",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
          }}>
            🛍️
          </div>
        )}
      </td>

      {/* ویرایش */}
      <td style={{ padding: "10px 14px", textAlign: "center", width: "100px" }}>
        <Link
          href={`/AdminPanel/dashboard/products/list/${p.Id}/edit`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            color: "#2980b9", textDecoration: "none",
            fontSize: "13px", fontWeight: 500,
            background: "#eaf4fb",
            padding: "5px 12px", borderRadius: "6px",
            whiteSpace: "nowrap",
          }}
        >
          ✏️ ویرایش
        </Link>
      </td>

      {/* حذف */}
      <td style={{ padding: "10px 14px", textAlign: "center", width: "90px" }}>
        <button
          onClick={handleDelete}
          disabled={pending}
          style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            background: pending ? "#f5f5f5" : "#fdecea",
            color: pending ? "#aaa" : "#e74c3c",
            border: "none",
            padding: "5px 12px", borderRadius: "6px",
            fontSize: "13px", fontWeight: 500,
            cursor: pending ? "not-allowed" : "pointer",
            fontFamily: "inherit", whiteSpace: "nowrap",
          }}
        >
          {pending ? "..." : "🗑️ حذف"}
        </button>
      </td>
    </tr>
  );
}

// ── Styles ───────────────────────────────────────────────────
const thStyle: React.CSSProperties = {
  padding: "12px 14px",
  fontWeight: 600,
  color: "#555",
  textAlign: "center",
  whiteSpace: "nowrap",
  borderLeft: "1px solid #d8d8d8",
};

const filterInput: React.CSSProperties = {
  padding: "4px 8px",
  border: "1px solid #ccc",
  borderRadius: "3px",
  fontSize: "12px",
  width: "80px",
  outline: "none",
  fontFamily: "inherit",
  background: "#fff",
};

const filterIcon: React.CSSProperties = {
  fontSize: "9px",
  color: "#999",
  cursor: "pointer",
  flexShrink: 0,
};

const pgBtn = (disabled: boolean, active = false): React.CSSProperties => ({
  padding: "4px 10px", borderRadius: "4px", border: "1px solid #ddd",
  background: active ? "#f90" : disabled ? "#f5f5f5" : "#fff",
  color: active ? "#fff" : disabled ? "#ccc" : "#333",
  cursor: disabled ? "not-allowed" : "pointer",
  fontFamily: "inherit", fontSize: "13px",
});
