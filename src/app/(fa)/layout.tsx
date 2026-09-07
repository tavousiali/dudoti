import { LocaleProvider } from "@/components/layout/LocaleContext";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import HtmlDirSync from "@/components/layout/HtmlDirSync";
import Footer from "@/components/layout/Footer";

export default function FaLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider locale="fa">
      <HtmlDirSync locale="fa" />
      <RootLayoutClient footer={<Footer />}>{children}</RootLayoutClient>
    </LocaleProvider>
  );
}
