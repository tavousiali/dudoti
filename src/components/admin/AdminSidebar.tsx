"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const aboutSubMenus = [
  { label: "ویرایش متن درباره", href: "/AdminPanel/about" },
  { label: "کاراکترها", href: "/AdminPanel/characters" },
  { label: "ویرایش متن تماس", href: "/AdminPanel/contact" },
];

const settingsSubMenus = [
  { label: "اطلاعات صفحه اول", href: "/AdminPanel/main-page-settings" },
  { label: "شبکه‌های اجتماعی", href: "/AdminPanel/socials-settings" },
];

const productSubMenus = [
  { label: "سردسته‌های اصلی", href: "/AdminPanel/main-categories" },
  { label: "دسته‌بندی محصولات", href: "/AdminPanel/categories" },
  { label: "محصولات", href: "/AdminPanel/products" },
];

import LangSwitcher from "./LangSwitcher";

// ── Reusable accordion ───────────────────────────────────────
function AccordionMenu({
  icon, label, isActive, isOpen, onToggle, subMenus, pathname,
}: {
  icon: string;
  label: string;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  subMenus: { label: string; href: string }[];
  pathname: string;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: "10px",
          padding: "12px 20px",
          background: isActive ? "rgba(255,153,0,0.1)" : "transparent",
          border: "none",
          borderRight: isActive ? "3px solid #f90" : "3px solid transparent",
          color: isActive ? "#f90" : "#ccc",
          fontSize: "14px", fontWeight: isActive ? 600 : 400,
          cursor: "pointer", textAlign: "right",
          fontFamily: "inherit", transition: "all 0.15s", direction: "rtl",
        }}
      >
        <span style={{ fontSize: "16px" }}>{icon}</span>
        <span style={{ flex: 1, textAlign: "right" }}>{label}</span>
        <span style={{
          fontSize: "9px", color: "#888",
          transition: "transform 0.2s",
          transform: isOpen ? "rotate(-90deg)" : "rotate(90deg)",
          display: "inline-block",
        }}>❮</span>
      </button>

      {isOpen && (
        <div style={{ background: "#252525", borderBottom: "1px solid #333" }}>
          {subMenus.map((sub) => {
            const active = pathname === sub.href || pathname.startsWith(sub.href + "/");
            return (
              <Link
                key={sub.href}
                href={sub.href}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "10px 20px 10px 16px",
                  color: active ? "#f90" : "#aaa",
                  textDecoration: "none",
                  fontSize: "13px", fontWeight: active ? 600 : 400,
                  background: active ? "rgba(255,153,0,0.08)" : "transparent",
                  borderRight: active ? "2px solid #f90" : "2px solid transparent",
                  borderBottom: "1px solid #2a2a2a",
                  transition: "all 0.15s", direction: "rtl",
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
  );
}

// ── Main sidebar ─────────────────────────────────────────────
export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isProductsActive =
    pathname.startsWith("/AdminPanel/main-categories") ||
    pathname.startsWith("/AdminPanel/categories") ||
    pathname.startsWith("/AdminPanel/products");
  const isSettingsActive =
    pathname.startsWith("/AdminPanel/main-page-settings") ||
    pathname.startsWith("/AdminPanel/socials-settings");
  const isAboutActive =
    pathname.startsWith("/AdminPanel/about") ||
    pathname.startsWith("/AdminPanel/contact") ||
    pathname.startsWith("/AdminPanel/characters");

  const [productsOpen, setProductsOpen] = useState(isProductsActive);
  const [settingsOpen, setSettingsOpen] = useState(isSettingsActive);
  const [aboutOpen, setAboutOpen] = useState(isAboutActive);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/AdminPanel");
  };

  const NavLink = ({ href, label, icon }: { href: string; label: string; icon: string }) => {
    const exact = href === "/AdminPanel/dashboard";
    const active = exact ? pathname === href : pathname.startsWith(href);
    return (
      <Link href={href} style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "12px 20px",
        color: active ? "#f90" : "#ccc",
        textDecoration: "none",
        fontSize: "14px", fontWeight: active ? 600 : 400,
        background: active ? "rgba(255,153,0,0.1)" : "transparent",
        borderRight: active ? "3px solid #f90" : "3px solid transparent",
        transition: "all 0.15s",
      }}>
        <span style={{ fontSize: "16px" }}>{icon}</span>
        {label}
      </Link>
    );
  };

  return (
    <aside style={{
      width: "220px", minHeight: "100vh", background: "#2c2c2c",
      display: "flex", flexDirection: "column", flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ margin: "0 auto", padding: "20px 16px", borderBottom: "1px solid #3a3a3a", textAlign: "center" }}>
        <Link href="/AdminPanel/dashboard">
          <Image src="/images/logo.png" alt="دودوتی" width={120} height={46}
            style={{ objectFit: "contain" }} />
        </Link>
        <p style={{ color: "#f90", fontSize: "11px", margin: "8px 0 0", fontWeight: 500 }}>
          پنل مدیریت
        </p>
      </div>

      {/* Lang Switcher */}
      <LangSwitcher />

      {/* Menu */}
      <nav style={{ flex: 1, padding: "16px 0" }}>
        <NavLink href="/AdminPanel/dashboard" label="تنظیمات" icon="🏠" />

        <AccordionMenu
          icon="⚙️" label="تنظیمات صفحات"
          isActive={isSettingsActive} isOpen={settingsOpen}
          onToggle={() => setSettingsOpen((v) => !v)}
          subMenus={settingsSubMenus} pathname={pathname}
        />

        <AccordionMenu
          icon="📋" label="درباره و تماس"
          isActive={isAboutActive} isOpen={aboutOpen}
          onToggle={() => setAboutOpen((v) => !v)}
          subMenus={aboutSubMenus} pathname={pathname}
        />

        <AccordionMenu
          icon="📦" label="محصولات"
          isActive={isProductsActive} isOpen={productsOpen}
          onToggle={() => setProductsOpen((v) => !v)}
          subMenus={productSubMenus} pathname={pathname}
        />

        <NavLink href="/AdminPanel/dashboard/users" label="کاربران" icon="👤" />
      </nav>

      {/* Footer */}
      <div style={{ padding: "16px", borderTop: "1px solid #3a3a3a", textAlign: "center" }}>
        <button onClick={handleLogout} style={{
          background: "none", border: "none", color: "#888",
          fontSize: "12px", cursor: "pointer",
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: "6px",
          width: "100%", fontFamily: "inherit",
        }}>
          <span>🚪</span>خروج از پنل
        </button>
      </div>
    </aside>
  );
}
