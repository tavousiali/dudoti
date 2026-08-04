"use client";

import { useState, useEffect } from "react";
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

interface Props {
  onSelectCategory?: (cat: Category | null) => void;
  selectedCategoryId?: number | null;
}

type MenuKey = "main-cats" | "sub-cats" | "products";

export default function ProductAccordionSidebar({
  onSelectCategory,
  selectedCategoryId,
}: Props) {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>("main-cats");
  const [mainCats, setMainCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/admin/product-categories?lang=1&parentId=0")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setMainCats(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleMenu = (key: MenuKey) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  const menus: { key: MenuKey; label: string }[] = [
    { key: "main-cats", label: "سردسته‌های اصلی" },
    { key: "sub-cats",  label: "دسته‌بندی محصولات" },
    { key: "products",  label: "محصولات" },
  ];

  return (
    <aside
      style={{
        width: "230px",
        background: "#1e1e1e",
        borderLeft: "1px solid #2e2e2e",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #2e2e2e",
          textAlign: "center",
        }}
      >
        <span style={{ color: "#f90", fontWeight: 700, fontSize: "13px" }}>
          مدیریت محصولات
        </span>
      </div>

      {/* Accordion */}
      <nav style={{ flex: 1, overflowY: "auto" }}>
        {menus.map((menu) => {
          const isOpen = openMenu === menu.key;
          return (
            <div key={menu.key} style={{ borderBottom: "1px solid #2a2a2a" }}>
              {/* Header button */}
              <button
                onClick={() => toggleMenu(menu.key)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "13px 16px",
                  background: isOpen ? "rgba(255,153,0,0.1)" : "transparent",
                  border: "none",
                  borderRight: isOpen ? "3px solid #f90" : "3px solid transparent",
                  color: isOpen ? "#f90" : "#bbb",
                  fontSize: "13px",
                  fontWeight: isOpen ? 700 : 400,
                  cursor: "pointer",
                  textAlign: "right",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                  direction: "rtl",
                }}
              >
                <span style={{ flex: 1, textAlign: "right" }}>{menu.label}</span>
                <span
                  style={{
                    fontSize: "9px",
                    color: isOpen ? "#f90" : "#555",
                    transition: "transform 0.2s",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                >
                  ◀
                </span>
              </button>

              {/* Body */}
              {isOpen && (
                <div style={{ background: "#161616" }}>
                  {menu.key === "main-cats" && (
                    <MainCatsList
                      cats={mainCats}
                      loading={loading}
                      selectedId={selectedCategoryId ?? null}
                      onSelect={onSelectCategory}
                    />
                  )}
                  {menu.key === "sub-cats" && (
                    <PlaceholderMsg text="یک سردسته را ابتدا انتخاب کنید" />
                  )}
                  {menu.key === "products" && (
                    <PlaceholderMsg text="یک دسته‌بندی را ابتدا انتخاب کنید" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

// ── Sub-components ──────────────────────────────────────────

function PlaceholderMsg({ text }: { text: string }) {
  return (
    <div
      style={{
        padding: "20px 16px",
        color: "#555",
        fontSize: "12px",
        textAlign: "center",
        direction: "rtl",
      }}
    >
      {text}
    </div>
  );
}

function MainCatsList({
  cats,
  loading,
  selectedId,
  onSelect,
}: {
  cats: Category[];
  loading: boolean;
  selectedId: number | null;
  onSelect?: (cat: Category | null) => void;
}) {
  if (loading) {
    return (
      <div
        style={{
          padding: "20px",
          color: "#555",
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        در حال بارگذاری...
      </div>
    );
  }

  if (cats.length === 0) {
    return <PlaceholderMsg text="موردی یافت نشد" />;
  }

  return (
    <>
      {cats.map((cat) => {
        const isSelected = selectedId === cat.Id;
        return (
          <button
            key={cat.Id}
            onClick={() => onSelect?.(isSelected ? null : cat)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              background: isSelected ? "rgba(255,153,0,0.13)" : "transparent",
              border: "none",
              borderRight: isSelected ? "2px solid #f90" : "2px solid transparent",
              borderBottom: "1px solid #1e1e1e",
              color: isSelected ? "#f90" : "#aaa",
              fontSize: "13px",
              fontWeight: isSelected ? 600 : 400,
              cursor: "pointer",
              textAlign: "right",
              fontFamily: "inherit",
              transition: "all 0.15s",
              direction: "rtl",
            }}
          >
            {cat.Pic1 ? (
              <Image
                src={cat.Pic1}
                alt={cat.Title}
                width={30}
                height={30}
                style={{ objectFit: "contain", flexShrink: 0, borderRadius: "4px" }}
              />
            ) : (
              <span
                style={{
                  width: "30px",
                  height: "30px",
                  background: "#2a2a2a",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  flexShrink: 0,
                }}
              >
                📦
              </span>
            )}
            <span style={{ flex: 1 }}>{cat.Title}</span>
          </button>
        );
      })}
    </>
  );
}
