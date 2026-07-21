import Image from "next/image";
import Link from "next/link";
import type { CatProduct } from "@/data/cat-products";

type ProductCardProps = {
  product: CatProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group mb-4 text-center">
      <Link href={product.href} className="block">
        <div className="relative w-full">
          <Image
            src={product.image}
            alt={product.title}
            width={480}
            height={480}
            className="relative z-[3] h-auto w-full"
          />

          {product.hoverType === "swap" && product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt=""
              width={480}
              height={480}
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[4] h-auto w-full opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
            />
          )}

          {product.hoverType === "flavor" && product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt=""
              width={240}
              height={240}
              aria-hidden
              className="pointer-events-none absolute left-[20%] top-[40%] z-[2] w-[30%] opacity-0 transition-all duration-500 group-hover:left-[-10%] group-hover:top-[20%] group-hover:w-1/2 group-hover:opacity-100"
            />
          )}
        </div>

        <h2 className="m-0 py-4 text-base font-bold text-black transition-colors duration-300 group-hover:text-[#f92f25] md:text-xl">
          {product.title}
          <span className="mt-1 block text-sm font-normal md:text-base">
            {product.subtitle}
          </span>
        </h2>
      </Link>
    </article>
  );
}
