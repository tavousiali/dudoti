import Image from "next/image";
import PageTitle from "@/components/layout/PageTitle";

export default function AboutIntro() {
  return (
    <section
      dir="rtl"
      className="
        py-[40px]
        px-5
        md:px-10
        lg:px-16
        xl:px-24
        min-h-[40vw]
        flex
        items-center
      "
    >
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* ── Right: Text ── */}
          <div className="w-full md:w-1/2 text-right">
            <PageTitle title="درباره‌ی دودوتی" as="h2" className="mb-6" />

            <p className="mt-5 text-[16px] md:text-[18px] leading-9 text-black">
              دودوتی با هدف ارتقای استانداردهای تولید محصولات غذایی و بهداشتی حیوانات خانگی تأسیس شد. این برند با تمرکز بر کیفیت، نوآوری و رقابت‌پذیری بین‌المللی، فعالیت خود را در حوزه تولید محصولات تخصصی برای سگ‌ها، گربه‌ها و جوندگان آغاز کرد و امروز به عنوان برندی پویا در این صنعت شناخته می‌شود.
            </p>
          </div>

          {/* ── Left: Image ── */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/about/s2.png"
                alt="درباره‌ی دودوتی"
                fill
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
