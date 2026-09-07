"use client";

import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

export type Locale = "fa" | "en" | "fr";
export type LangId = 1 | 2 | 3; // 1 = Persian, 2 = English, 3 = French

interface LocaleContextValue {
  locale: Locale;
  langId: LangId;
  dir: "rtl" | "ltr";
  setLocale: (l: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "fa",
  langId: 1,
  dir: "rtl",
  setLocale: () => { },
});

const LOCALE_TO_LANG_ID: Record<Locale, LangId> = { fa: 1, en: 2, fr: 3 };
const LOCALE_TO_DIR: Record<Locale, "rtl" | "ltr"> = {
  fa: "rtl",
  en: "ltr",
  fr: "ltr",
};
const LOCALE_TO_HTML_LANG: Record<Locale, string> = {
  fa: "fa",
  en: "en",
  fr: "fr",
};

// The non-FA locale prefixes that appear in the URL
const LOCALE_PREFIXES = ["en", "fr"] as const;
type LocalePrefix = (typeof LOCALE_PREFIXES)[number];

/**
 * Strip any known locale prefix from a pathname.
 * e.g. "/en/about" → "/about", "/fr/" → "/", "/about" → "/about"
 */
function stripLocalePrefix(pathname: string): string {
  for (const prefix of LOCALE_PREFIXES) {
    if (pathname === `/${prefix}`) return "/";
    if (pathname.startsWith(`/${prefix}/`))
      return pathname.slice(prefix.length + 1);
  }
  return pathname;
}

interface LocaleProviderProps {
  locale: Locale;
  children: ReactNode;
}

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = useCallback(
    (next: Locale) => {
      // Compute the path without any current locale prefix
      const bare = stripLocalePrefix(pathname);

      let target: string;
      if (next === "fa") {
        // Persian lives at root — no prefix
        target = bare;
      } else {
        // English / French get a prefix
        target = `/${next}${bare === "/" ? "" : bare}`;
      }

      router.push(target);
    },
    [pathname, router]
  );

  return (
    <LocaleContext.Provider
      value={{
        locale,
        langId: LOCALE_TO_LANG_ID[locale],
        dir: LOCALE_TO_DIR[locale],
        setLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

// Re-export helpers for use in layouts/middleware
export { LOCALE_TO_HTML_LANG, LOCALE_TO_DIR, stripLocalePrefix };
export type { LocalePrefix };
