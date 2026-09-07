import { LocaleProvider } from "@/components/layout/LocaleContext";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import HtmlDirSync from "@/components/layout/HtmlDirSync";
import Footer from "@/components/layout/Footer";

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider locale="fr">
      <HtmlDirSync locale="fr" />
      <RootLayoutClient footer={<Footer />}>{children}</RootLayoutClient>
    </LocaleProvider>
  );
}
