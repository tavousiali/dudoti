import AboutButton from "./AboutButton";
import CarAnimation from "./CarAnimation";

export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-[#f9e0a4] px-10 lg:px-30 xl:px-70 py-14 md:flex md:items-center md:gap-10">
      <div className="text-right md:w-1/2">
        <h2 className="text-[30px] font-bold text-black">
          <span
            className="relative top-2 text-[#ff2f2f]"
            style={{ fontFamily: "icomoon" }}
          >
            {"\ue90c"}
          </span>
          <span className="mx-3">درباره دودوتی</span>
          <span
            className="relative top-2 text-[#ff2f2f]"
            style={{ fontFamily: "icomoon" }}
          >
            {"\ue910"}
          </span>
        </h2>

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
          <AboutButton />
        </div>
      </div>

      <div className="mt-4 md:mt-0 md:w-1/2">
        <CarAnimation />
      </div>
    </section>
  );
}
