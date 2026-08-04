"use client";

import { useState } from "react";
import ProductAccordionSidebar from "@/components/admin/ProductAccordionSidebar";
import Image from "next/image";

interface Category {
  Id: number;
  Title: string;
  Pic1: string | null;
  Lang: number;
  ParentId: number;
  ParentName: string | null;
  TitleEn: string | null;
  SeoTitle: string | null;
  urlTitle: string | null;
}

export default function ProductsPage() {
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);

  return (
    <div
      style={{
        display: "flex",
        gap: 0,
        minHeight: "calc(100vh - 48px)",
        background: "#f4f6f9",
        margin: "-24px",
        direction: "rtl",
      }}
    >
      {/* Accordion Sidebar */}
      <ProductAccordionSidebar
        selectedCategoryId={selectedCat?.Id ?? null}
        onSelectCategory={setSelectedCat}
      />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "28px 24px", overflowY: "auto" }}>
        {/* Page Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 100%)",
            borderRadius: "10px",
            padding: "20px 24px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            direction: "rtl",
          }}
        >
          <div>
            <h1
              style={{
                color: "#f90",
                fontSize: "18px",
                fontWeight: 700,
                margin: 0,
              }}
            >
              {selectedCat ? selectedCat.Title : "مدیریت محصولات"}
            </h1>
            <p style={{ color: "#aaa", fontSize: "12px", margin: "6px 0 0" }}>
              {selectedCat
                ? `نمایش اطلاعات دسته‌بندی: ${selectedCat.Title}`
                : "از منوی سمت راست یک دسته را انتخاب کنید"}
            </p>
          </div>
          {selectedCat && (
            <button
              onClick={() => setSelectedCat(null)}
              style={{
                background: "rgba(255,153,0,0.15)",
                border: "1px solid #f90",
                color: "#f90",
                padding: "6px 16px",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              بازگشت
            </button>
          )}
        </div>

        {/* Content Area */}
        {!selectedCat ? (
          <EmptyState />
        ) : (
          <CategoryDetail cat={selectedCat} />
        )}
      </div>
    </div>
  );
}

// ── Empty State ──────────────────────────────────────────────

function EmptyState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "300px",
        color: "#aaa",
        gap: "16px",
        direction: "rtl",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          background: "#e8e8e8",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "36px",
        }}
      >
        📦
      </div>
      <p style={{ fontSize: "15px", fontWeight: 600, color: "#555", margin: 0 }}>
        هیچ دسته‌بندی انتخاب نشده
      </p>
      <p style={{ fontSize: "13px", color: "#aaa", margin: 0, textAlign: "center" }}>
        از منوی آکاردئون سمت راست، روی «سردسته‌های اصلی» کلیک کنید
        <br />
        و یک دسته‌بندی را انتخاب نمایید
      </p>
    </div>
  );
}

// ── Category Detail ──────────────────────────────────────────

function CategoryDetail({ cat }: { cat: Category }) {
  const infoRows: { label: string; value: string | number | null }[] = [
    { label: "شناسه",           value: cat.Id },
    { label: "عنوان",           value: cat.Title },
    { label: "عنوان انگلیسی",   value: cat.TitleEn },
    { label: "عنوان SEO",       value: cat.SeoTitle },
    { label: "URL",             value: cat.urlTitle },
    { label: "زبان",            value: cat.Lang === 1 ? "فارسی" : cat.Lang === 2 ? "انگلیسی" : "فرانسوی" },
    { label: "دسته پدر",        value: cat.ParentId === 0 ? "سردسته اصلی" : cat.ParentName },
  ];

  return (
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", direction: "rtl" }}>
      {/* Card: Image + Title */}
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          minWidth: "200px",
        }}
      >
        {cat.Pic1 ? (
          <Image
            src={cat.Pic1}
            alt={cat.Title}
            width={100}
            height={100}
            style={{ objectFit: "contain", borderRadius: "8px" }}
          />
        ) : (
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "#f0f0f0",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
            }}
          >
            📦
          </div>
        )}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontWeight: 700,
              fontSize: "16px",
              color: "#333",
              margin: "0 0 4px",
            }}
          >
            {cat.Title}
          </p>
          {cat.TitleEn && (
            <p style={{ fontSize: "12px", color: "#999", margin: 0, direction: "ltr" }}>
              {cat.TitleEn}
            </p>
          )}
        </div>
      </div>

      {/* Card: Info Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
          overflow: "hidden",
          flex: 1,
          minWidth: "280px",
        }}
      >
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid #f0f0f0",
            fontWeight: 700,
            fontSize: "13px",
            color: "#555",
          }}
        >
          اطلاعات دسته‌بندی
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <tbody>
            {infoRows.map((row) => (
              <tr key={row.label} style={{ borderBottom: "1px solid #f8f8f8" }}>
                <td
                  style={{
                    padding: "12px 20px",
                    color: "#999",
                    fontWeight: 500,
                    width: "130px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.label}
                </td>
                <td style={{ padding: "12px 20px", color: "#333" }}>
                  {row.value !== null && row.value !== undefined && row.value !== ""
                    ? String(row.value)
                    : <span style={{ color: "#ccc" }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "12px",
          marginTop: "4px",
          direction: "rtl",
        }}
      >
        <button
          style={{
            background: "#f90",
            color: "#fff",
            border: "none",
            padding: "10px 24px",
            borderRadius: "7px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          ✏️ ویرایش دسته‌بندی
        </button>
        <button
          style={{
            background: "#fff",
            color: "#e74c3c",
            border: "1px solid #e74c3c",
            padding: "10px 24px",
            borderRadius: "7px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          🗑️ حذف
        </button>
        <button
          style={{
            background: "#fff",
            color: "#27ae60",
            border: "1px solid #27ae60",
            padding: "10px 24px",
            borderRadius: "7px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          ➕ افزودن زیرمجموعه
        </button>
      </div>
    </div>
  );
}
