import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import prisma from "@/lib/prisma";
import PageTitle from "@/components/layout/PageTitle";
import RedBox from "@/components/ui/RedBox";

interface Props {
  params: Promise<{
    mainCategory: string;
    subCategory: string;
    product: string;
  }>;
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { Deleted: false, Lang: 3 },
    select: { urlTitle: true, urlTitlteCat: true, MainUrlTitle: true },
  });

  return products
    .filter((p) => p.urlTitle && p.urlTitlteCat && p.MainUrlTitle)
    .map((p) => ({
      mainCategory: p.MainUrlTitle as string,
      subCategory: p.urlTitlteCat as string,
      product: p.urlTitle as string,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mainCategory, subCategory, product } = await params;

  const p = await prisma.product.findFirst({
    where: {
      urlTitle: product,
      urlTitlteCat: subCategory,
      MainUrlTitle: mainCategory,
      Deleted: false,
      Lang: 3,
    },
    select: { Title: true, SEOTitle: true, SeoLead: true, SubTitle: true },
  });

  if (!p) return { title: "Dudoti" };

  const title = p.SEOTitle ?? `${p.Title} | Dudoti`;
  const description = p.SeoLead ?? p.SubTitle ?? `${p.Title} - Dudoti`;
  const canonical = `https://dudoti.com/fr/${mainCategory}/${subCategory}/${product}/`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: "https://dudoti.com/img/dudotiLogo.png" }],
    },
  };
}

export default async function FrProductPage({ params }: Props) {
  const { mainCategory, subCategory, product } = await params;

  const p = await prisma.product.findFirst({
    where: {
      urlTitle: product,
      urlTitlteCat: subCategory,
      MainUrlTitle: mainCategory,
      Deleted: false,
      Lang: 3,
    },
  });

  if (!p) notFound();

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1140px] px-4 py-10 md:py-[60px]">

        <div className="flex flex-col md:flex-row-reverse items-start gap-10 md:gap-16">

          {/* Colonne droite (visuellement) : titre + texte + boîte rouge */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 text-left">

            <PageTitle
              title={p.Title ?? ""}
              subtitle={p.SubTitle ?? undefined}
              as="h1"
              className=""
              titleClassName="text-black text-[36px]"
            />

            {p.Description && (
              <div
                className="text-[15px] md:text-[16px] leading-9 text-black"
                dangerouslySetInnerHTML={{ __html: p.Description }}
              />
            )}

            {p.Lead && (
              <RedBox
                text={p.Lead}
                imageSrc={p.Icon ?? null}
                imageAlt={p.Title ?? ""}
              />
            )}

          </div>

          {/* Colonne gauche (visuellement) : image du produit */}
          <div className="w-full md:w-1/2 flex items-start justify-center">
            {p.Pic1 && (
              <Image
                src={p.Pic1}
                alt={p.Title ?? ""}
                width={520}
                height={600}
                className="w-full max-w-[480px] h-auto object-contain"
                priority
              />
            )}
          </div>

        </div>

        {p.Video && (
          <div className="mt-14 md:mt-20">
            <video
              controls
              poster={p.VideoPic ?? undefined}
              className="w-full rounded-lg"
              preload="metadata"
            >
              <source src={p.Video} type="video/mp4" />
            </video>
          </div>
        )}

      </div>
    </main>
  );
}
