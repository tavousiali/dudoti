import Image from "next/image";
import PageTitle from "@/components/layout/PageTitle";

export default function AboutProducts() {
  return (
    <section
      dir="rtl"
      className="bg-[#f9e0a4]" style={{
        "height": "45rem",
        "paddingTop": "15rem",
        "margin": "0 auto",
        "textAlign": "center",
        "display": "flex",
        "justifyContent": "center",
        "paddingLeft": "10rem",
      }}
    >
      <div className="mx-auto w-full max-w-screen-xl">

        {/* wrapper نسبی: باکس قرمز + گربه overlap سمت راست */}
        <div className="relative">

          {/* ── باکس قرمز ── */}
          <div
            className="w-full md:w-[65%] pt-14 pb-14 px-10 md:px-16 text-right"
            style={{
              backgroundImage: "url(/images/about/red-con.png)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              position: "absolute",
              left: 0,
              top: -90
            }}
          >
            {/* تیتر — PageTitle با override رنگ سفید */}
            <PageTitle
              title="محصولات"
              as="h2"
              iconClassName="text-white"
              className="[&_h2]:text-white"
            />

            <p className="mt-4 text-[14px] md:text-[16px] leading-9 text-white">
              رویکرد دودوتی مبتنی بر تولید محصولاتی است که نه‌تنها نیازهای تغذیه‌ای و
              بهداشتی حیوانات خانگی را تأمین کند، بلکه به بهبود کیفیت همزیستی میان انسان
              و حیوان نیز کمک نماید. باور بنیادین این برند بر این اصل استوار است که
              حیوانات خانگی بخشی از خانواده هستند و شایسته دریافت محصولاتی با کیفیت
              هستند.
            </p>

            <p className="mt-4 text-[14px] md:text-[16px] leading-9 text-white">
              سبد محصولات دودوتی شامل انواع بیسکوییت‌های تخصصی سگ در طعم‌های متنوع،
              تشویقی‌های سلامت‌محور، محصولات بهداشتی و مراقبتی، بسترهای بهداشتی،
              اسباب‌بازی‌های تقویت سلامت دندان جوندگان، محصولات گیاهی طبیعی ویژه گربه‌ها
              و سایر اقلام کاربردی در حوزه نگهداری حیوانات خانگی است.
            </p>
          </div>

          {/* ── گربه: absolute سمت چپ باکس (RTL چپ = left)، z بالاتر از باکس ── */}
          <div className="hidden md:block absolute left-[60%] top-1/2 -translate-y-1/2 z-[10] w-[260px] lg:w-[300px]">
            <Image
              src="/images/about/cat-handup.png"
              alt="محصولات دودوتی"
              width={300}
              height={420}
              className="w-full h-auto object-contain"
            />
          </div>

        </div>
      </div>
    </section >
  );
}
