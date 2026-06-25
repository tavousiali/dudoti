import AboutButton from "./AboutButton";
import CarAnimation from "./CarAnimation";

export default function AboutSection() {
  return (
    <section className="bg-[#f9e0a4] px-4 py-14 overflow-hidden">
      <div className="text-right">
        <h2 className="text-[30px] font-bold text-black">
          <span
            className="text-[#ff2f2f] relative top-2"
            style={{ fontFamily: "icomoon" }}
          >
            {"\ue90c"}
          </span>
          <span className="mx-3">درباره دودوتی</span>
          <span
            className="text-[#ff2f2f] relative top-2"
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

      <div className="mt-4">
        <CarAnimation />
      </div>
    </section>
  );
}
