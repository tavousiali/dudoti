import Link from "next/link";
import Button from "../layout/Button";
import PageTitle from "../layout/PageTitle";
import CarAnimation from "./CarAnimation";

export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-[#f9e0a4] px-10 lg:px-30 xl:px-70 py-14 md:flex md:items-center md:gap-10">
      <div className="text-right md:w-1/2">
        <PageTitle title="درباره دودوتی" className="" />

        <div className="mt-8 space-y-5 text-[14px] leading-8 text-black">
          <p className="leading-4.5">
            دودوتی یه برند جدید ایرانیه که محصولات غذایی و بهداشتی خیلی باکیفیت
            برای حیوان‌های خونگی تولید می‌کنه.
          </p>

          <p className="leading-4.5">
            دودوتی می‌دونه که این روزها هزینه‌های نگهداری از حیوان خونگی چقدر
            سرسام‌آور شدن، برای همین محصولاتش رو با قیمتی مناسب عرضه می‌کنه...
          </p>
        </div>

        <div className="mt-6 flex justify-start">
          <Link href="/about">
            <Button text="بیشتر" />
          </Link>
        </div>
      </div>

      <div className="mt-4 md:mt-0 md:w-1/2">
        <CarAnimation />
      </div>
    </section>
  );
}
