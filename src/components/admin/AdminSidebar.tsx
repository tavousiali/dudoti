"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  {
    label: "داشبورد",
    href: "/AdminPanel/dashboard",
    icon: "🏠",
  },
  {
    label: "کاربران",
    href: "/AdminPanel/dashboard/users",
    icon: "👤",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

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
        <p
          style={{
            color: "#f90",
            fontSize: "11px",
            margin: "8px 0 0",
            fontWeight: 500,
          }}
        >
          پنل مدیریت
        </p>
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, padding: "16px 0" }}>
        {menuItems.map((item) => {
          const isActive =
            item.href === "/AdminPanel/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 20px",
                color: isActive ? "#f90" : "#ccc",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: isActive ? 600 : 400,
                background: isActive ? "rgba(255,153,0,0.1)" : "transparent",
                borderRight: isActive ? "3px solid #f90" : "3px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #3a3a3a",
          textAlign: "center",
        }}
      >
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
            fontFamily: "Diodrum, sans-serif",
          }}
        >
          <span>🚪</span>
          خروج از پنل
        </button>
      </div>
    </aside>
  );
}
