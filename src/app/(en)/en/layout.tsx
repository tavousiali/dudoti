import { LocaleProvider } from "@/components/layout/LocaleContext";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import HtmlDirSync from "@/components/layout/HtmlDirSync";
import Footer from "@/components/layout/Footer";
import prisma from "@/lib/prisma";

export default async function EnLayout({ children }: { children: React.ReactNode }) {
  const categories = await prisma.productCategory.findMany({
    where: { Lang: 2, ParentId: 0, Deleted: false, ShowMenu: true, Actice: true },
    orderBy: [{ Priority: "asc" }, { Id: "asc" }],
    select: { Id: true, Title: true, Pic1: true, urlTitle: true },
  });

  return (
    <LocaleProvider locale="en">
      <HtmlDirSync locale="en" />
      <RootLayoutClient
        dir="ltr"
        categories={categories}
        footer={<Footer locale="en" categories={categories} />}
      >
        {children}
      </RootLayoutClient>
    </LocaleProvider>
  );
}
