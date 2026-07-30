import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل مدیریت دودوتی",
  description: "ورود به دشبورد مدیریت سایت دودوتی",
};

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
