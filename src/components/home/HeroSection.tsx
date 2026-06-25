import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="
        flex min-h-[calc(100vh-73px)]
        items-center
        justify-center
        bg-[radial-gradient(circle,_rgba(255,215,0,1)_0%,_rgba(255,140,0,1)_50%)]
      "
    >
      <div className="flex flex-col items-center px-5 py-10">
        <div className="w-full max-w-85">
          <Image
            src="/images/Homepage-Hero.png"
            alt="Dudoti Hero"
            width={800}
            height={900}
            priority
            className="h-auto w-full"
          />
        </div>

        <div className="mt-3 text-center">
          <h1 className="text-[32px] font-bold text-white">دودوتی</h1>

          <p className="mx-auto mt-4 max-w-95 text-lg leading-7 font-bold text-black">
            تولیدکننده محصولاتی برای زندگی آسوده و سلامت با سگ‌ها، گربه‌ها و
            جوندگان خانگی
          </p>
        </div>
      </div>
    </section>
  );
}
