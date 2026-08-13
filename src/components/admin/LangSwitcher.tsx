"use client";

import { useAdminLang, type LangId } from "./AdminLangContext";

const langs: { id: LangId; label: string }[] = [
  { id: 1, label: "فارسی" },
  { id: 2, label: "انگلیسی" },
  { id: 3, label: "فرانسه" },
];

export default function LangSwitcher() {
  const { lang, setLang } = useAdminLang();

  return (
    <div style={{
      padding: "12px 16px",
      borderBottom: "1px solid #3a3a3a",
      display: "flex",
      gap: "6px",
      justifyContent: "center",
    }}>
      {langs.map((l) => {
        const active = lang === l.id;
        return (
          <button
            key={l.id}
            onClick={() => setLang(l.id)}
            style={{
              flex: 1,
              padding: "7px 4px",
              borderRadius: "6px",
              border: active ? "none" : "1px solid #444",
              background: active ? "#f90" : "#333",
              color: active ? "#fff" : "#aaa",
              fontSize: "12px",
              fontWeight: active ? 700 : 400,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
