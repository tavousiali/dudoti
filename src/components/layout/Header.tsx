import Image from "next/image";
import MenuIcon from "./MenuIcon";

export default function Header() {
  return (
    <header className="bg-white" dir="ltr">
      <div className="relative flex h-16 items-center justify-between px-4">
        <button
          className="flex h-8 w-8 items-center justify-center"
          aria-label="menu"
        >
          <MenuIcon />
        </button>

        <div className="absolute left-1/2 top-10 -translate-x-1/2">
          <Image
            src="/images/logo.svg"
            alt="Dudoti"
            width={140}
            height={56}
            priority
          />
        </div>

        <div className="flex gap-4 font-bold uppercase">
          <span>FR</span>
          <span>EN</span>
        </div>
      </div>

      <div className="h-[9px] bg-[#ff2f2f]" />
    </header>
  );
}
