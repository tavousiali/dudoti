import "./globals.css";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <RootLayoutClient footer={<Footer />}>{children}</RootLayoutClient>
    </html>
  );
}
