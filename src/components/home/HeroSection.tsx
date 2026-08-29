import Image from "next/image";
import PageTitle from "../layout/PageTitle";

export default function HeroSection() {
  return (
    <section
      className="
        flex
        min-h-[calc(100vh-73px)]
        md:min-h-[55vh]
        items-center
        overflow-hidden
        bg-[radial-gradient(circle,_rgba(255,215,0,1)_0%,_rgba(255,140,0,1)_48%,_rgba(255,140,0,1)_100%)]
      "
    >
      <div
        className="
          mx-auto
          flex
          flex-col
          md:flex-row
          w-full
          max-w-screen-2xl
          items-center
          justify-between
          gap-12
          px-5
          py-10
          md:px-10
          md:py-0
          lg:px-16
          xl:px-24
        "
      >

        {/* Hero Image */}
        <div
          className="
            flex
            flex-1
            justify-center
            items-center
          "
        >
          <Image
            src="/images/home/hero.png"
            alt="Hero"
            width={900}
            height={900}
            priority
            className="
              h-auto
              w-120
              md:w-140
              p-0
              md:p-3
              lg:p-10
            "
          />
        </div>

        {/* Text */}
        <div
          className="
            flex-1
            text-center
            flex
            flex-col
            items-center
            justify-center
            gap-4
          "
        >
          <PageTitle
            as="h1"
            title="دودوتی"
            className="relative flex items-center "
            iconClassName="text-white text-[4vw]!"
            titleClassName="text-white font-bold text-6xl md:text-5xl lg:text-6xl xl:text-7xl" />
          <p
            className="
              mt-5
              text-center
              font-bold
              leading-9
              text-black
              max-w-lg
              text-xl
              xl:text-2xl
            "
          >
            تولیدکننده محصولاتی برای زندگی آسوده و سلامت با سگ‌ها، گربه‌ها و
            جوندگان خانگی
          </p>
        </div>

      </div>
    </section>
  );
}