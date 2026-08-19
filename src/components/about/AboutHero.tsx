import Image from "next/image";

export default function AboutHero() {
  return (
    <section
      dir="rtl"
      className="
        min-h-[40vw]
        flex
        items-center
        py-[30px]
        [background:radial-gradient(circle,_#9eb5d1_0%,_#6890c1_50%)]
      "
    >
      <div className="w-full flex flex-col md:flex-row items-center">

        {/* ── Text — سمت چپ (در RTL: دومی در DOM) ── */}
        <div className="w-full md:w-1/2 text-center order-1 md:order-2 px-8">

          <h1 className="relative inline-block m-0">
            {/* bracket راست */}
            <span
              aria-hidden="true"
              className="absolute right-full top-1/2 -translate-y-1/2 mr-[15px] text-[4vw] text-white"
              style={{ fontFamily: "icomoon" }}
            >
              {"\ue910"}
            </span>

            {/* «درباره‌ی» چسبیده به «دودوتی»، سایز کوچک‌تر */}
            <span className="block text-[2.5vw] leading-[1] font-bold text-white">
              درباره‌ی
            </span>
            <span className="block text-[5vw] leading-[1.1] font-bold text-white">
              دودوتی
            </span>

            {/* bracket چپ */}
            <span
              aria-hidden="true"
              className="absolute left-full top-1/2 -translate-y-1/2 ml-[15px] text-[4vw] text-white"
              style={{ fontFamily: "icomoon" }}
            >
              {"\ue90c"}
            </span>
          </h1>

          <p className="mt-4 text-[1.5vw] font-bold text-black leading-relaxed w-3/4 flex justify-self-center sm:justify-center sm:pb-4">
            تولیدکننده‌ی محصولاتی برای زندگی آسوده و سلامت با سگ‌ها، گربه‌ها و جوندگان خانگی
          </p>
        </div>

        {/* ── عکس — سمت راست (در RTL: اولی در DOM) ── */}
        <div className="relative w-full md:w-1/2 h-[50vw] md:h-[40vw] order-2 md:order-1">
          <Image
            src="/images/about/s4.png"
            alt="درباره‌ی دودوتی"
            fill
            className="object-contain object-center"
            priority
          />
        </div>

      </div>
    </section>
  );
}
