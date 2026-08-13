import type { Metadata } from "next";
import { Suspense } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { AdminLangProvider } from "@/components/admin/AdminLangContext";

export const metadata: Metadata = {
  title: "داشبورد مدیریت - دودوتی",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <AdminLangProvider>
        <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6f9" }}>
          <AdminSidebar />
          <main style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
            {children}
          </main>
        </div>
      </AdminLangProvider>
    </Suspense>
  );
}
