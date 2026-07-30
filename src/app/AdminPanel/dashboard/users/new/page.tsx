import { Metadata } from "next";
import Link from "next/link";
import UserForm from "@/components/admin/UserForm";

export const metadata: Metadata = {
  title: "افزودن کاربر - پنل دودوتی",
};

export default function NewUserPage() {
  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "20px", fontSize: "13px", color: "#aaa" }}>
        <Link href="/AdminPanel/dashboard" style={{ color: "#aaa", textDecoration: "none" }}>
          داشبورد
        </Link>
        {" / "}
        <Link href="/AdminPanel/dashboard/users" style={{ color: "#aaa", textDecoration: "none" }}>
          کاربران
        </Link>
        {" / "}
        <span style={{ color: "#f90" }}>افزودن کاربر جدید</span>
      </div>

      <div
        style={{
          borderBottom: "2px solid #f90",
          paddingBottom: "10px",
          marginBottom: "28px",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#333", margin: 0 }}>
          افزودن کاربر جدید
        </h1>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "8px",
          padding: "28px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        <UserForm mode="create" />
      </div>
    </div>
  );
}
