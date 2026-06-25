import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-[#f6a000]">
      <div className="flex min-h-[calc(100vh-78px)] flex-col items-center justify-center px-5 py-10">
        <div className="w-full max-w-[370px]">
          <Image
            src="/images/Homepage-Hero.png"
            alt="Dudoti Hero"
            width={800}
            height={900}
            priority
            className="h-auto w-full"
          />
        </div>

        <div className="mt-4 text-center">
          <h1 className="text-[52px] font-bold text-white">دودوتی</h1>

          <p className="mx-auto mt-4 max-w-[300px] text-[18px] leading-8 font-medium text-black">
            تولیدکننده محصولاتی برای زندگی آسوده و سلامت سگ‌ها، گربه‌ها و
            جوندگان خانگی
          </p>
        </div>
      </div>
    </section>
  );
}
