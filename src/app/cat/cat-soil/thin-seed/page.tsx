import Image from "next/image";
import { Metadata } from "next";
import Breadcrumb from "@/components/products/Breadcrumb";
import PageTitle from "@/components/layout/PageTitle";

export const metadata: Metadata = {
  title: "بذر نازک | دودوتی",
  description:
    "بذر علف گربه‌ی دودوتی، یک راه‌حل ساده و طبیعی برای بهبود مشکلات گوارش گربه‌ها و دفع گلوله‌های مویی است.",
  alternates: {
    canonical: "https://dudoti.com/cat/cat-soil/thin-seed/",
  },
  openGraph: {
    title: "بذر نازک | دودوتی",
    description:
      "بذر علف گربه‌ی دودوتی، یک راه‌حل ساده و طبیعی برای بهبود مشکلات گوارش گربه‌ها و دفع گلوله‌های مویی است.",
    url: "https://dudoti.com/cat/cat-soil/thin-seed/",
    images: [
      {
        url: "https://dudoti.com/img/dudotiLogo.png",
      },
    ],
  },
};

const breadcrumbItems = [
  { label: "صفحه اصلی", href: "/" },
  { label: "محصولات گربه", href: "/cat/all/" },
  { label: "ظرف خاک", href: "/cat/cat-soil/" },
  { label: "بذر نازک", href: "/cat/cat-soil/thin-seed/" },
];

export default function ThinSeedPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Content */}
      <section className="mx-auto max-w-[1140px] px-4 py-10 md:py-[45px]">
        {/* Title */}
        <div className="mb-8 text-center md:mb-12">
          <PageTitle title="بذر نازک" subtitle="دفع توپ مویی" as="h1" />
        </div>

        {/* Product Layout */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
          {/* Product Image */}
          <div className="w-full max-w-[400px] flex-shrink-0 md:w-[40%]">
            <Image
              src="/images/products/ProductM_21.jpg"
              alt="بذر نازک دودوتی"
              title="بذر نازک دودوتی"
              width={400}
              height={500}
              className="w-full"
              priority
            />
          </div>

          {/* Product Description */}
          <div className="w-full md:flex-1">
            <p className="mb-4 text-base leading-8 text-black md:text-lg md:leading-9">
              گربه‌ها به طور معمول در طول روز خودشان را لیس می‌زنند تا خود را
              تمیز کنند. در فرآیند تمیزکردن بخشی از موهای بدن خود را
              می‌بلعند. این موها در حالت طبیعی در سیستم گوارش گربه‌ها حرکت
              کرده و با مدفوع‌شان دفع می‌شوند. اما گاهی سیستم گوارش
              نمی‌تواند به‌خوبی آن‌ها را به حرکت درآورد و دفع نماید.
            </p>

            {/* Red Info Box */}
            <div className="relative mt-8 flex items-center gap-4 overflow-hidden rounded-lg px-6 py-8 md:mt-10 md:gap-6 md:px-8">
              {/* Red background shape */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: "url(/images/ui/red-con.png)",
                  backgroundSize: "100% 100%",
                }}
              />
              {/* Icon */}
              <div className="relative z-10 flex-shrink-0">
                <Image
                  src="/images/products/ProductLO_21.png"
                  alt="بذر نازک دودوتی"
                  title="بذر نازک دودوتی"
                  width={120}
                  height={120}
                  className="w-[80px] md:w-[120px]"
                />
              </div>
              {/* Text */}
              <p className="relative z-10 text-sm leading-7 text-white md:text-base md:leading-8">
                بذر علف گربه‌ی دودوتی، یک راه‌حل ساده و طبیعی برای بهبود
                مشکلات گوارش گربه‌ها و دفع گلوله‌های مویی است.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
