import Image from "next/image";
import PageTitle from "@/components/layout/PageTitle";

export default function AboutProducts() {
  return (
    <section
      dir="rtl"
      className="
        relative
        overflow-hidden
        py-[90px]
        px-5
        md:px-10
        lg:px-16
        xl:px-24
        min-h-[40vw]
        flex
        items-center
        bg-white
      "
    >
      <div className="mx-auto w-full max-w-screen-xl">
        {/* Outer wrapper: red blob left, image sticking out right */}
        <div className="relative flex items-start justify-start">

          {/* ── Red shaped box with text ── */}
          <div
            className="
              relative
              z-[2]
              w-full
              md:w-[calc(100%-300px)]
              lg:w-[calc(100%-360px)]
              mt-[90px]
              pt-[70px]
              pb-[70px]
              pr-[60px]
              pl-[60px]
              md:pr-[80px]
              text-white
              rounded-[60px_0_60px_60px]
              bg-[#f92f25]
            "
          >
            {/* Custom inline title — white brackets on red bg */}
            <h2 className="mb-6 text-[30px] font-bold text-white flex items-center gap-3">
              <span
                aria-hidden="true"
                className="relative top-[6px] text-white"
                style={{ fontFamily: "icomoon" }}
              >
                {"\ue90c"}
              </span>
              <span>محصولات</span>
              <span
                aria-hidden="true"
                className="relative top-[6px] text-white"
                style={{ fontFamily: "icomoon" }}
              >
                {"\ue910"}
              </span>
            </h2>

            <p className="mt-4 text-[15px] md:text-[16px] leading-9 text-white">
              رویکرد دودوتی مبتنی بر تولید محصولاتی است که نه‌تنها نیازهای تغذیه‌ای و
              بهداشتی حیوانات خانگی را تأمین کند، بلکه به بهبود کیفیت همزیستی میان انسان
              و حیوان نیز کمک نماید. باور بنیادین این برند بر این اصل استوار است که
              حیوانات خانگی بخشی از خانواده هستند و شایسته دریافت محصولاتی با کیفیت
              هستند.
            </p>

            <p className="mt-4 text-[15px] md:text-[16px] leading-9 text-white">
              سبد محصولات دودوتی شامل انواع بیسکوییت‌های تخصصی سگ در طعم‌های متنوع،
              تشویقی‌های سلامت‌محور، محصولات بهداشتی و مراقبتی، بسترهای بهداشتی،
              اسباب‌بازی‌های تقویت سلامت دندان جوندگان، محصولات گیاهی طبیعی ویژه گربه‌ها
              و سایر اقلام کاربردی در حوزه نگهداری حیوانات خانگی است.
            </p>
          </div>

          {/* ── Image: sticks out above the red box on the left ── */}
          <div
            className="
              hidden
              md:block
              absolute
              left-0
              top-[-110px]
              z-[3]
              w-[300px]
              lg:w-[360px]
            "
          >
            <Image
              src="/images/about/cat-1.png"
              alt="محصولات دودوتی"
              width={360}
              height={480}
              className="w-full h-auto object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
