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
  // Strip existing locale prefix to get the bare path (always starts with /)
  let bare = current;
  for (const prefix of LOCALE_PREFIXES) {
    if (bare === `/${prefix}`) { bare = "/"; break; }
    // /en/about → /about  (keep the leading slash of the rest)
    if (bare.startsWith(`/${prefix}/`)) { bare = bare.slice(prefix.length + 1); break; }
  }
  // bare is now "/", "/about", "/dog", etc.

  if (next === "fa") return bare;
  // /en + /about → /en/about   but  /en + / → /en
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
