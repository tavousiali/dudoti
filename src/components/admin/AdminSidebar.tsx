"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const productSubMenus = [
  { label: "سردسته‌های اصلی", href: "/AdminPanel/dashboard/products/main-categories" },
  { label: "دسته‌بندی محصولات", href: "/AdminPanel/dashboard/products/categories" },
  { label: "محصولات", href: "/AdminPanel/dashboard/products/list" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const isProductsActive = pathname.startsWith("/AdminPanel/dashboard/products");
  const [productsOpen, setProductsOpen] = useState(isProductsActive);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/AdminPanel");
  };

  return (
    <aside
      style={{
        width: "220px",
        minHeight: "100vh",
        background: "#2c2c2c",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px 16px",
          borderBottom: "1px solid #3a3a3a",
          textAlign: "center",
        }}
      >
        <Link href="/AdminPanel/dashboard">
          <Image
            src="/images/logo.png"
            alt="دودوتی"
            width={120}
            height={46}
            style={{ objectFit: "contain" }}
          />
        </Link>
        <p style={{ color: "#f90", fontSize: "11px", margin: "8px 0 0", fontWeight: 500 }}>
          پنل مدیریت
        </p>
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, padding: "16px 0" }}>
        {/* داشبورد */}
        <Link
          href="/AdminPanel/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            color: pathname === "/AdminPanel/dashboard" ? "#f90" : "#ccc",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: pathname === "/AdminPanel/dashboard" ? 600 : 400,
            background: pathname === "/AdminPanel/dashboard" ? "rgba(255,153,0,0.1)" : "transparent",
            borderRight: pathname === "/AdminPanel/dashboard" ? "3px solid #f90" : "3px solid transparent",
            transition: "all 0.15s",
          }}
        >
          <span style={{ fontSize: "16px" }}>🏠</span>
          داشبورد
        </Link>

        {/* محصولات — Accordion */}
        <div>
          <button
            onClick={() => setProductsOpen((v) => !v)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              background: isProductsActive ? "rgba(255,153,0,0.1)" : "transparent",
              border: "none",
              borderRight: isProductsActive ? "3px solid #f90" : "3px solid transparent",
              color: isProductsActive ? "#f90" : "#ccc",
              fontSize: "14px",
              fontWeight: isProductsActive ? 600 : 400,
              cursor: "pointer",
              textAlign: "right",
              fontFamily: "inherit",
              transition: "all 0.15s",
              direction: "rtl",
            }}
          >
            <span style={{ fontSize: "16px" }}>📦</span>
            <span style={{ flex: 1, textAlign: "right" }}>محصولات</span>
            <span
              style={{
                fontSize: "9px",
                color: "#888",
                transition: "transform 0.2s",
                transform: productsOpen ? "rotate(-90deg)" : "rotate(90deg)",
                display: "inline-block",
              }}
            >
              ❮
            </span>
          </button>

          {/* Sub-menu */}
          {productsOpen && (
            <div style={{ background: "#252525", borderBottom: "1px solid #333" }}>
              {productSubMenus.map((sub) => {
                const isActive = pathname === sub.href;
                return (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px 10px 16px",
                      color: isActive ? "#f90" : "#aaa",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 400,
                      background: isActive ? "rgba(255,153,0,0.08)" : "transparent",
                      borderRight: isActive ? "2px solid #f90" : "2px solid transparent",
                      borderBottom: "1px solid #2a2a2a",
                      transition: "all 0.15s",
                      direction: "rtl",
                    }}
                  >
                    <span style={{ color: "#555", fontSize: "10px" }}>◆</span>
                    {sub.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* کاربران */}
        <Link
          href="/AdminPanel/dashboard/users"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            color: pathname.startsWith("/AdminPanel/dashboard/users") ? "#f90" : "#ccc",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: pathname.startsWith("/AdminPanel/dashboard/users") ? 600 : 400,
            background: pathname.startsWith("/AdminPanel/dashboard/users") ? "rgba(255,153,0,0.1)" : "transparent",
            borderRight: pathname.startsWith("/AdminPanel/dashboard/users") ? "3px solid #f90" : "3px solid transparent",
            transition: "all 0.15s",
          }}
        >
          <span style={{ fontSize: "16px" }}>👤</span>
          کاربران
        </Link>
      </nav>

      {/* Footer */}
      <div style={{ padding: "16px", borderTop: "1px solid #3a3a3a", textAlign: "center" }}>
        <button
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            color: "#888",
            fontSize: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "100%",
            fontFamily: "inherit",
          }}
        >
          <span>🚪</span>
          خروج از پنل
        </button>
      </div>
    </aside>
  );
}
