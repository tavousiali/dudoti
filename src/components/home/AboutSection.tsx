import AboutButton from "./AboutButton";
import CarAnimation from "./CarAnimation";

export default function AboutSection() {
  return (
    <section className="bg-[#ead8a5] px-6 pt-14">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-black">
          <span
            className="mx-3 text-[#ff2f2f]"
            style={{ fontFamily: "icomoon" }}
          >
            {"\ue90c"}
          </span>
          درباره دودوتی
          <span
            className="mx-3 text-[#ff2f2f]"
            style={{ fontFamily: "icomoon" }}
          >
            {"\ue910"}
          </span>
        </h2>

        <div className="mt-8 space-y-6 text-lg leading-9 text-black">
          <p>
            دودوتی یه برند جدید ایرانیه که محصولات غذایی و بهداشتی خیلی باکیفیت
            برای حیوان‌های خونگی تولید می‌کنه.
          </p>

          <p>
            دودوتی می‌دونه که این روزها هزینه‌های نگهداری از حیوان خونگی چقدر
            سرسام‌آور شدن، برای همین محصولاتش رو با قیمتی مناسب عرضه می‌کنه...
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <AboutButton />
        </div>
      </div>

      <div className="mt-8">
        <CarAnimation />
      </div>
    </section>
  );
}
