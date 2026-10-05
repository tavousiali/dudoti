import React from 'react';
import Link from 'next/link';

interface ProductCardProps {
  title: string;
  titleEn?: string;
  imagePath: string;
  flavorImagePath?: string;
  /** OverClass from DB: "pr-flv" = slide-out effect, "pr-img-2" = fade effect */
  overClass?: string;
  link?: string;
  useNextLink?: boolean;
}


const ProductCard: React.FC<ProductCardProps> = ({
  title,
  titleEn,
  imagePath,
  flavorImagePath,
  overClass,
  link = '#',
  useNextLink = false
}) => {
  const isFade = overClass === 'pr-img-2';

  const content = (
    <div className="group mb-[15px] text-center">
      {/* img container */}
      <div className="relative w-full overflow-visible">

        {isFade ? (
          // ── pr-img-2: fade-out main image, fade-in overlay image ──
          <>
            {/* main image fades out on hover */}
            <img
              src={imagePath}
              alt={title}
              title={title}
              loading="lazy"
              className="relative z-[3] w-full transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            />
            {/* overlay image fades in on hover */}
            {flavorImagePath && (
              <img
                src={flavorImagePath}
                alt={title}
                title={title}
                loading="lazy"
                className="pointer-events-none absolute inset-0 z-[4] w-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          // ── pr-flv (default): slide-out flavor image from behind ──
          <>
            <img
              src={imagePath}
              alt={title}
              title={title}
              loading="lazy"
              className="relative z-[3] w-full"
            />
            {flavorImagePath && (
              <img
                src={flavorImagePath}
                alt={title}
                title={title}
                loading="lazy"
                className="pointer-events-none absolute left-[20%] top-[40%] z-[2] w-[30%] opacity-0 transition-all duration-500 ease-in-out group-hover:left-[-10%] group-hover:top-[20%] group-hover:w-[50%] group-hover:opacity-100"
              />
            )}
          </>
        )}
      </div>

      {/* head */}
      <h2 className="m-0 p-[15px_0] text-xl text-black transition-colors duration-300 group-hover:text-[#f92f25] font-bold">
        {title}
        {titleEn && (
          <span className="mt-[5px] block text-base font-normal text-black transition-colors duration-300 group-hover:text-[#f92f25]">
            {titleEn}
          </span>
        )}
      </h2>
    </div>
  );

  if (useNextLink) {
    return (
      <Link href={link} className="block">
        {content}
      </Link>
    );
  }

  return (
    <a href={link} className="block">
      {content}
    </a>
  );
};

export default ProductCard;
