import React from 'react';
import Link from 'next/link';

interface ProductCardProps {
  title: string;
  titleEn?: string;
  imagePath: string;
  flavorImagePath?: string;
  link?: string;
  useNextLink?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  titleEn,
  imagePath,
  flavorImagePath,
  link = '#',
  useNextLink = false
}) => {
  const content = (
    <div className="group mb-[15px] text-center">
      {/* img container */}
      <div className="relative w-full overflow-visible">
        {/* pr-img - main image */}
        <img
          src={imagePath}
          alt={title}
          title={title}
          loading="lazy"
          className="relative z-[3] w-full"
        />

        {/* pr-flv - flavor/overlay image */}
        {flavorImagePath && (
          <img
            src={flavorImagePath}
            alt={title}
            title={title}
            loading="lazy"
            className="pointer-events-none absolute left-[20%] top-[40%] z-[2] w-[30%] opacity-0 transition-all duration-500 ease-in-out group-hover:left-[-10%] group-hover:top-[20%] group-hover:w-[50%] group-hover:opacity-100"
          />
        )}
      </div>

      {/* head */}
      <h2 className="m-0 p-[15px_0] text-xl text-black transition-colors duration-300 group-hover:text-[#f92f25] font-bold">
        {title}
        {titleEn && (
          <span className="mt-[5px] block text-base font-normal">
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
