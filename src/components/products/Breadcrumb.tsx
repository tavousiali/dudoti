import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="border-b border-white bg-[#f92f25] py-1.5 md:py-[7px]" aria-label="breadcrumb">
      <div className="mx-auto max-w-[1140px] px-4">
        <ol className="m-0 flex list-none items-center p-0">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={item.href}
                className={`relative inline-block ${
                  isLast ? "" : "ml-5 md:ml-[30px]"
                }`}
              >
                <Link
                  href={item.href}
                  className="block p-0 text-[10px] text-white transition-colors hover:text-black md:text-xs"
                >
                  {item.label}
                </Link>
                {!isLast && (
                  <span
                    className="absolute left-[-15px] top-0 text-[10px] text-white md:left-[-20px] md:text-xs"
                    style={{ fontFamily: "icomoon" }}
                    aria-hidden
                  >
                    {"\ue917"}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
