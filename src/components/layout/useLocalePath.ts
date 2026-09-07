"use client";

import { useLocale } from "./LocaleContext";
import type { Locale } from "./LocaleContext";

const PREFIX: Record<Locale, string> = { fa: "", en: "/en", fr: "/fr" };

/**
 * Returns a function that prepends the current locale prefix to any path.
 * e.g. lp("/about") → "/en/about"  when locale is "en"
 *      lp("/")      → "/en"        when locale is "en"
 *      lp("/about") → "/about"     when locale is "fa"
 */
export function useLocalePath() {
  const { locale } = useLocale();
  const prefix = PREFIX[locale];

  return function lp(path: string): string {
    if (!prefix) return path;
    if (path === "/") return prefix;
    return `${prefix}${path}`;
  };
}
