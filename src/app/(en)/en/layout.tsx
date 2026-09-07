import { LocaleProvider } from "@/components/layout/LocaleContext";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import HtmlDirSync from "@/components/layout/HtmlDirSync";
import Footer from "@/components/layout/Footer";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider locale="en">
      <HtmlDirSync locale="en" />
      <RootLayoutClient footer={<Footer />}>{children}</RootLayoutClient>
    </LocaleProvider>
  );
}
