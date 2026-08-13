"use client";

import { useAdminLang } from "./AdminLangContext";
import { useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

/**
 * این component وقتی زبان در context عوض میشه،
 * URL رو با ?lang=X آپدیت می‌کنه تا صفحه server-side
 * داده جدید رو بگیره.
 */
export default function LangAwarePageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang }     = useAdminLang();
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const prevLang     = useRef(lang);

  useEffect(() => {
    if (prevLang.current !== lang) {
      prevLang.current = lang;
      const params = new URLSearchParams(searchParams.toString());
      params.set("lang", String(lang));
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [lang, pathname, router, searchParams]);

  return <>{children}</>;
}
