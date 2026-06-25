"use client";

import Image from "next/image";

export default function CarAnimation() {
  return (
    <div className="relative overflow-hidden">
      <Image
        src="/images/about-bg.png"
        alt=""
        width={1200}
        height={700}
        className="w-full"
      />

      <Image
        src="/images/about-car.png"
        alt=""
        width={700}
        height={400}
        className="
          absolute
          bottom-[6%]
          left-1/2
          w-[78%]
          -translate-x-1/2
        "
      />

      <Image
        src="/images/about-wheel1.png"
        alt=""
        width={100}
        height={100}
        className="
          absolute
          bottom-[14.5%]
          left-[25.5%]
          w-[11%]
          animate-[spin_2s_linear_infinite]
        "
      />

      <Image
        src="/images/about-wheel1.png"
        alt=""
        width={100}
        height={100}
        className="
          absolute
          bottom-[14.5%]
          right-[25.5%]
          w-[11%]
          animate-[spin_2s_linear_infinite]
        "
      />
    </div>
  );
}
