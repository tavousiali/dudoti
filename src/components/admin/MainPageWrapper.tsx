"use client";

import { useState, useEffect } from "react";
import { useAdminLang } from "./AdminLangContext";
import MainPageForm from "./MainPageForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecordData = any;

export default function MainPageWrapper() {
  const { lang } = useAdminLang();
  const [record,  setRecord]  = useState<RecordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setRecord(null);
    fetch(`/api/admin/main-page/${lang}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setRecord(json.data);
        else setError(json.message ?? "خطا در دریافت اطلاعات");
      })
      .catch(() => setError("خطا در ارتباط با سرور"))
      .finally(() => setLoading(false));
  }, [lang]);

  if (loading) {
    return (
      <div style={{
        background: "#fff", borderRadius: "10px",
        padding: "60px", textAlign: "center", color: "#aaa",
      }}>
        در حال بارگذاری...
      </div>
    );
  }

  if (error || !record) {
    return (
      <div style={{
        background: "#fdecea", borderRadius: "10px",
        padding: "24px", textAlign: "center", color: "#e74c3c", fontSize: "13px",
      }}>
        {error ?? "رکوردی یافت نشد."}
      </div>
    );
  }

  // key={lang} باعث میشه MainPageForm کامل remount بشه و form reset شه
  return <MainPageForm key={lang} record={record} langId={lang} />;
}
