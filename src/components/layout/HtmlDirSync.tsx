"use client";

import { useEffect } from "react";
import type { Locale } from "./LocaleContext";

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

/**
 * Syncs dir and lang attributes on <html> for non-Persian locales.
 * Runs once on mount — no flicker since the server layout already
 * sets the correct values via the html tag in [locale]/layout.tsx.
 */
export default function HtmlDirSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.setAttribute("dir", LOCALE_TO_DIR[locale]);
    document.documentElement.setAttribute("lang", LOCALE_TO_HTML_LANG[locale]);
  }, [locale]);

  return null;
}
