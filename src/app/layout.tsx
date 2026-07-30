import "./globals.css";
import RootLayoutClient from "@/components/layout/RootLayoutClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <RootLayoutClient>{children}</RootLayoutClient>
    </html>
  );
}
