import React from 'react';
import Link from 'next/link';

interface ProductCardProps {
  title: string;
  titleEn: string;
  imagePath: string;
  link?: string;
  useNextLink?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  titleEn,
  imagePath,
  link = '#',
  useNextLink = false
}) => {
  const content = (
    <>
      <div className="w-full aspect-square rounded-3xl overflow-hidden mb-4 bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={imagePath}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center px-2">
        <h3 className="font-iranSans text-lg font-bold text-gray-800 mb-1 leading-relaxed">
          {title}
        </h3>
        <p className="font-diodrum text-sm font-normal text-gray-600 capitalize leading-relaxed">
          {titleEn}
        </p>
      </div>
    </>
  );

  const sharedClasses = "block no-underline w-full max-w-[280px] transition-transform duration-300 ease-in-out hover:-translate-y-1.5 md:max-w-full";

  if (useNextLink) {
    return (
      <Link href={link} className={sharedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <a href={link} className={sharedClasses}>
      {content}
    </a>
  );
};

export default ProductCard;
