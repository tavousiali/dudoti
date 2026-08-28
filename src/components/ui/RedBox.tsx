import Image from "next/image";

interface RedBoxProps {
  text: string;
  imageSrc?: string | null;
  imageAlt?: string;
}

/**
 * باکس قرمز با red-con.png
 * RTL: عکس سمت راست، متن سمت چپ
 * (در DOM: عکس اول، متن دوم)
 */
export default function RedBox({ text, imageSrc, imageAlt = "" }: RedBoxProps) {
  return (
    <div
      dir="rtl"
      className="flex items-center gap-6 px-8 py-8 md:px-12 md:py-10 text-white"
      style={{
        backgroundImage: "url(/images/about/red-con.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* عکس — سمت راست (RTL: اول در DOM) */}
      {imageSrc && (
        <div className="shrink-0 w-[90px] md:w-[120px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={120}
            height={120}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* متن — سمت چپ (RTL: دوم در DOM) */}
      <p className="flex-1 text-[13px] md:text-[15px] leading-8 text-white text-right">
        {text}
      </p>
    </div>
  );
}
