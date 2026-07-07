import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="
        flex
        min-h-[calc(100vh-73px)]
        items-center
        justify-center
        bg-[radial-gradient(circle,_rgba(255,215,0,1)_0%,_rgba(255,140,0,1)_50%)]
      "
    >
      <div className="flex flex-col items-center px-5 py-10">
        <div className="w-full">
          <Image
            src="/images/home/hero.png"
            alt="Dudoti Hero"
            width={800}
            height={900}
            priority
            className="h-auto w-full"
          />
        </div>

        <div className="mt-2 text-center">
          <h1 className="relative inline-flex items-center justify-center text-4xl font-bold text-white">
            <span
              className="absolute right-full mr-4 text-[30px]"
              style={{
                fontFamily: "icomoon",
                fontWeight: "normal",
              }}
            >
              {"\ue910"}
            </span>
            دودوتی
            <span
              className="absolute left-full ml-4 text-[30px]"
              style={{
                fontFamily: "icomoon",
                fontWeight: "normal",
              }}
            >
              {"\ue90c"}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-96 text-lg leading-7 font-bold text-black">
            تولیدکننده محصولاتی برای زندگی آسوده و سلامت با سگ‌ها، گربه‌ها و
            جوندگان خانگی
          </p>
        </div>
      </div>
    </section>
  );
}
