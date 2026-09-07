"use client";

import { useLocale } from "./LocaleContext";
import { usePathname } from "next/navigation";
import type { Locale } from "./LocaleContext";

const LANGS: { locale: Locale; short: string; long: string }[] = [
  { locale: "fa", short: "FA", long: "فارسی" },
  { locale: "en", short: "EN", long: "English" },
  { locale: "fr", short: "FR", long: "Français" },
];

const LOCALE_PREFIXES = ["en", "fr"] as const;

function buildHref(current: string, next: Locale): string {
  // Strip existing prefix from pathname
  let bare = current;
  for (const prefix of LOCALE_PREFIXES) {
    if (bare === `/${prefix}`) { bare = "/"; break; }
    if (bare.startsWith(`/${prefix}/`)) { bare = bare.slice(prefix.length + 1); break; }
  }

  if (next === "fa") return bare;
  return `/${next}${bare === "/" ? "" : bare}`;
}

export default function Languages() {
  const { locale } = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex gap-4 font-bold text-xl">
      {LANGS.filter((l) => l.locale !== locale).map(({ locale: l, short, long }) => (
        <a
          key={l}
          href={buildHref(pathname, l)}
          className="lang cursor-pointer hover:opacity-70 transition-opacity"
          aria-label={long}
        >
          <span className="hidden sm:block">{long}</span>
          <span className="sm:hidden">{short}</span>
        </a>
      ))}
    </div>
  );
}
