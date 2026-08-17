import Image from "next/image";

type PropType = {
  text: string
}

export default function Button({ text }: PropType) {
  return (
    <button className="relative h-12 w-26">
      <Image src="/images/btn.svg" alt="" fill className="object-contain" />

      <span
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          text-md
          text-black
        "
      >
        {text}
      </span>
    </button>
  );
}
