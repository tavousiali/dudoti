import "./globals.css";

// Root layout — only provides the <html> shell.
// Each locale route group ((fa), (en)/en, (fr)/fr) has its own
// nested layout that supplies LocaleProvider + RootLayoutClient.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      {children}
    </html>
  );
}
