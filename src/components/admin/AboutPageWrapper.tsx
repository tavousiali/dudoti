"use client";

import { useState, useEffect } from "react";
import { useAdminLang } from "./AdminLangContext";
import AboutForm from "./AboutForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageData = any;

export default function AboutPageWrapper() {
  const { lang } = useAdminLang();
  const [records,  setRecords]  = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setRecords([]);

    // هر دو رکورد about و about2 رو برای این زبان می‌گیریم
    Promise.all([
      fetch(`/api/admin/pages?lang=${lang}&urlTitle=about`).then((r) => r.json()),
      fetch(`/api/admin/pages?lang=${lang}&urlTitle=about2`).then((r) => r.json()),
    ])
      .then(([r1, r2]) => {
        const list: PageData[] = [];
        if (r1.success && r1.data.length > 0) list.push(r1.data[0]);
        if (r2.success && r2.data.length > 0) list.push(r2.data[0]);
        if (list.length === 0) {
          setError("رکوردی برای این زبان یافت نشد.");
        } else {
          setRecords(list);
        }
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

  if (error || records.length === 0) {
    return (
      <div style={{
        background: "#fdecea", borderRadius: "10px",
        padding: "24px", textAlign: "center", color: "#e74c3c", fontSize: "13px",
      }}>
        {error ?? "رکوردی یافت نشد."}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {records.map((rec) => (
        <AboutForm key={`${lang}-${rec.Id}`} record={rec} />
      ))}
    </div>
  );
}
