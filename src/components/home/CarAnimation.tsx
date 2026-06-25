"use client";

import Image from "next/image";

export default function CarAnimation() {
  return (
    <div className="relative">
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
          bottom-[7%]
          left-1/2
          z-10
          w-[88%]
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
          bottom-[15.2%]
          left-[19.8%]
          z-20
          w-[11.5%]
          animate-[spin_2s_linear_infinite_reverse]
        "
      />

      <Image
        src="/images/about-wheel1.png"
        alt=""
        width={100}
        height={100}
        className="
          absolute
          bottom-[15.2%]
          right-[19.8%]
          z-20
          w-[11.5%]
          animate-[spin_2s_linear_infinite_reverse]
        "
      />
    </div>
  );
}
