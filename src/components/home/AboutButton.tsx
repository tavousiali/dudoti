import Image from "next/image";

export default function AboutButton() {
  return (
    <button className="relative h-[48px] w-[140px]">
      <Image src="/images/btn.svg" alt="" fill className="object-contain" />

      <span
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          text-lg
          text-black
        "
      >
        بیشتر
      </span>
    </button>
  );
}
