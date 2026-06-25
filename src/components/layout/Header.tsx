import Image from "next/image";
import MenuIcon from "./MenuIcon";

export default function Header() {
  return (
    <header className="bg-[#ececec]">
      <div className="relative flex h-[72px] items-center justify-between px-4">
        <button
          className="flex h-8 w-8 items-center justify-center"
          aria-label="menu"
        >
          <MenuIcon />
        </button>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/images/logo.svg"
            alt="Dudoti"
            width={120}
            height={40}
            priority
          />
        </div>

        <div className="flex flex-col items-end text-[10px] font-semibold leading-3">
          <span>ENGLISH</span>
          <span>FRANÇAIS</span>
        </div>
      </div>

      <div className="h-[6px] bg-[#ff3026]" />
    </header>
  );
}
