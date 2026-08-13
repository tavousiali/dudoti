"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export type LangId = 1 | 2 | 3;

interface LangContextValue {
  lang: LangId;
  setLang: (l: LangId) => void;
  langLabel: string;
}

const AdminLangContext = createContext<LangContextValue>({
  lang: 1,
  setLang: () => {},
  langLabel: "فارسی",
});

const LABELS: Record<LangId, string> = { 1: "فارسی", 2: "انگلیسی", 3: "فرانسه" };
const LS_KEY = "admin_lang";

export function AdminLangProvider({ children }: { children: ReactNode }) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  // اولویت: query param > localStorage > پیش‌فرض 1
  const [lang, setLangState] = useState<LangId>(() => {
    if (typeof window !== "undefined") {
      const qp = new URLSearchParams(window.location.search).get("lang");
      if (qp === "1" || qp === "2" || qp === "3") return Number(qp) as LangId;
      const ls = localStorage.getItem(LS_KEY);
      if (ls === "1" || ls === "2" || ls === "3") return Number(ls) as LangId;
    }
    return 1;
  });

  // sync از URL به state (برای وقتی کاربر مستقیم با ?lang= وارد میشه)
  useEffect(() => {
    const qp = searchParams.get("lang");
    if (qp === "1" || qp === "2" || qp === "3") {
      const id = Number(qp) as LangId;
      if (id !== lang) setLangState(id);
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const setLang = useCallback((l: LangId) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_KEY, String(l));
    }
    // URL رو آپدیت می‌کنیم بدون full reload
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", String(l));
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  return (
    <AdminLangContext.Provider value={{ lang, setLang, langLabel: LABELS[lang] }}>
      {children}
    </AdminLangContext.Provider>
  );
}

export function useAdminLang() {
  return useContext(AdminLangContext);
}
