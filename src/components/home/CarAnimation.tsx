"use client";

import Image from "next/image";
import styles from "./CarAnimation.module.css";

export default function CarAnimation() {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/images/home/about-bg.png"
        alt=""
        width={3000}
        height={1000}
        className={styles.bg}
      />

      <Image
        src="/images/home/about-car.png"
        alt=""
        width={900}
        height={500}
        className={styles.car}
      />

      <Image
        src="/images/home/about-wheel1.png"
        alt=""
        width={120}
        height={120}
        className={styles.wheelLeft}
      />

      <Image
        src="/images/home/about-wheel1.png"
        alt=""
        width={120}
        height={120}
        className={styles.wheelRight}
      />
    </div>
  );
}
