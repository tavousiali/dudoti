"use client";

import { useState, useEffect } from "react";
import { useAdminLang } from "./AdminLangContext";
import ContactForm from "./ContactForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageData = any;

export default function ContactPageWrapper() {
  const { lang }  = useAdminLang();
  const [record,  setRecord]  = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setRecord(null);

    fetch(`/api/admin/pages?lang=${lang}&urlTitle=contact`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data.length > 0) {
          setRecord(json.data[0]);
        } else {
          setError("رکوردی برای این زبان یافت نشد.");
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

  return <ContactForm key={`${lang}-${record.Id}`} record={record} />;
}
