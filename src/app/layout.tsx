import "./globals.css";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import Footer from "@/components/layout/Footer";
import { LocaleProvider } from "@/components/layout/LocaleContext";
import HtmlDirSync from "@/components/layout/HtmlDirSync";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // lang/dir defaults to fa/rtl for Persian (root) routes.
  // When navigating to /en or /fr, HtmlDirSync in [locale]/layout
  // overrides these attributes client-side.
  return (
    <html lang="fa" dir="rtl">
      <LocaleProvider locale="fa">
        <HtmlDirSync locale="fa" />
        <RootLayoutClient footer={<Footer />}>{children}</RootLayoutClient>
      </LocaleProvider>
    </html>
  );
}
