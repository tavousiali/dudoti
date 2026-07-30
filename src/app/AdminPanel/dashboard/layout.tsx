import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "داشبورد مدیریت - دودوتی",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6f9" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
