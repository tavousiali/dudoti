"use client";

import { useState, useTransition } from "react";

interface Social {
  Id: number;
  Title: string | null;
  Link: string | null;
  Icon: string | null;
  Priority: number | null;
  FooterOrHeader: number | null;
}

interface Props {
  initialSocials: Social[];
}

// آیکون‌های رایج شبکه‌های اجتماعی
const iconOptions = [
  "icon-instagram2",
  "icon-telegram2",
  "icon-linkedin2",
  "icon-twitter2",
  "icon-youtube2",
  "icon-facebook2",
  "icon-whatsapp2",
];

export default function SocialsTable({ initialSocials }: Props) {
  const [socials, setSocials]     = useState<Social[]>(initialSocials);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    Title: string;
    Link: string;
    Priority: string;
    Icon: string;
  }>({ Title: "", Link: "", Priority: "", Icon: "" });

  // فیلترها
  const [filterTitle,    setFilterTitle]    = useState("");
  const [filterLink,     setFilterLink]     = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const [pending, startTransition] = useTransition();
  const [saveError, setSaveError]  = useState<string | null>(null);

  const startEdit = (s: Social) => {
    setEditingId(s.Id);
    setSaveError(null);
    setEditValues({
      Title:    s.Title    ?? "",
      Link:     s.Link     ?? "",
      Priority: String(s.Priority ?? ""),
      Icon:     s.Icon     ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSaveError(null);
  };

  const saveEdit = (id: number) => {
    setSaveError(null);
    startTransition(async () => {
      const res  = await fetch(`/api/admin/socials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Title:    editValues.Title    || null,
          Link:     editValues.Link     || null,
          Priority: editValues.Priority !== "" ? Number(editValues.Priority) : null,
          Icon:     editValues.Icon     || null,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSocials((prev) =>
          prev.map((s) => (s.Id === id ? json.data : s))
        );
        setEditingId(null);
      } else {
        setSaveError(json.message ?? "خطا در ذخیره");
      }
    });
  };

  const filtered = socials.filter((s) => {
    const t = (s.Title ?? "").toLowerCase();
    const l = (s.Link  ?? "").toLowerCase();
    const p = String(s.Priority ?? "");
    return (
      (!filterTitle    || t.includes(filterTitle.toLowerCase())) &&
      (!filterLink     || l.includes(filterLink.toLowerCase()))  &&
      (!filterPriority || p.includes(filterPriority))
    );
  });

  return (
    <div style={{
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      overflow: "hidden",
    }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "13px",
          textAlign: "right",
          direction: "rtl",
        }}>
          <thead>
            {/* عناوین ستون‌ها */}
            <tr style={{ background: "#e8e8e8", borderBottom: "1px solid #d0d0d0" }}>
              <th style={thS}>شناسه</th>
              <th style={{ ...thS, textAlign: "right" }}>عنوان</th>
              <th style={{ ...thS, textAlign: "right" }}>لینک</th>
              <th style={thS}>اولویت</th>
              <th style={thS}>ویرایش</th>
            </tr>

            {/* ردیف فیلترها */}
            <tr style={{ background: "#f2f2f2", borderBottom: "2px solid #ddd" }}>
              <td style={{ padding: "6px 10px", textAlign: "center" }} />
              <td style={{ padding: "6px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <input
                    type="text"
                    value={filterTitle}
                    onChange={(e) => setFilterTitle(e.target.value)}
                    style={filterInp}
                    placeholder=""
                  />
                  <span style={filterArrow}>▼</span>
                </div>
              </td>
              <td style={{ padding: "6px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <input
                    type="text"
                    value={filterLink}
                    onChange={(e) => setFilterLink(e.target.value)}
                    style={{ ...filterInp, width: "160px" }}
                    placeholder=""
                  />
                  <span style={filterArrow}>▼</span>
                </div>
              </td>
              <td style={{ padding: "6px 10px", textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
                  <input
                    type="text"
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    style={{ ...filterInp, width: "60px" }}
                    placeholder=""
                  />
                  <span style={filterArrow}>▼</span>
                </div>
              </td>
              <td />
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#aaa" }}>
                  موردی یافت نشد.
                </td>
              </tr>
            ) : (
              filtered.map((s, idx) => (
                <>
                  {/* ردیف اصلی */}
                  <tr
                    key={s.Id}
                    style={{
                      borderBottom: editingId === s.Id ? "none" : "1px solid #ececec",
                      background: idx % 2 === 0 ? "#fff" : "#f7f7f7",
                    }}
                  >
                    {/* شناسه */}
                    <td style={{ padding: "11px 14px", color: "#888", width: "70px", textAlign: "center" }}>
                      {s.Id}
                    </td>

                    {/* عنوان */}
                    <td style={{ padding: "11px 14px", fontWeight: 500, color: "#333" }}>
                      {s.Title ?? "—"}
                    </td>

                    {/* لینک */}
                    <td style={{ padding: "11px 14px", direction: "ltr", textAlign: "left" }}>
                      {s.Link ? (
                        <a href={s.Link} target="_blank" rel="noreferrer"
                          style={{ color: "#2980b9", textDecoration: "none", fontSize: "12px" }}>
                          {s.Link.length > 50 ? s.Link.slice(0, 50) + "…" : s.Link}
                        </a>
                      ) : (
                        <span style={{ color: "#ccc" }}>—</span>
                      )}
                    </td>

                    {/* اولویت */}
                    <td style={{ padding: "11px 14px", textAlign: "center", width: "80px" }}>
                      {s.Priority ?? "—"}
                    </td>

                    {/* ویرایش */}
                    <td style={{ padding: "11px 14px", textAlign: "center", width: "90px" }}>
                      {editingId === s.Id ? null : (
                        <button
                          onClick={() => startEdit(s)}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: "4px",
                            background: "none", border: "none",
                            color: "#e67e00", fontSize: "13px", fontWeight: 700,
                            cursor: "pointer", fontFamily: "inherit",
                          }}
                        >
                          ✏️ ویرایش
                        </button>
                      )}
                    </td>
                  </tr>

                  {/* ردیف inline edit — باز میشه زیر ردیف اصلی */}
                  {editingId === s.Id && (
                    <tr
                      key={`edit-${s.Id}`}
                      style={{
                        background: "#fffbf2",
                        borderBottom: "2px solid #f90",
                        borderTop: "1px solid #ffe0a0",
                      }}
                    >
                      <td colSpan={5} style={{ padding: "16px 20px" }}>
                        {saveError && (
                          <div style={{
                            background: "#fdecea", color: "#e74c3c",
                            padding: "8px 14px", borderRadius: "5px",
                            fontSize: "12px", marginBottom: "12px",
                          }}>{saveError}</div>
                        )}

                        <div style={{
                          display: "flex", gap: "20px", flexWrap: "wrap",
                          alignItems: "flex-end", direction: "rtl",
                        }}>
                          {/* عنوان */}
                          <EditField label="عنوان:">
                            <input
                              value={editValues.Title}
                              onChange={(e) => setEditValues((v) => ({ ...v, Title: e.target.value }))}
                              style={editInp}
                              placeholder="telegram"
                            />
                          </EditField>

                          {/* آیکون */}
                          <EditField label="آیکون:">
                            <select
                              value={editValues.Icon}
                              onChange={(e) => setEditValues((v) => ({ ...v, Icon: e.target.value }))}
                              style={{ ...editInp, cursor: "pointer" }}
                            >
                              <option value="">— انتخاب —</option>
                              {iconOptions.map((o) => (
                                <option key={o} value={o}>{o}</option>
                              ))}
                            </select>
                          </EditField>

                          {/* لینک */}
                          <EditField label="لینک:">
                            <input
                              value={editValues.Link}
                              onChange={(e) => setEditValues((v) => ({ ...v, Link: e.target.value }))}
                              style={{ ...editInp, width: "300px", direction: "ltr", textAlign: "left" }}
                              placeholder="https://..."
                            />
                          </EditField>

                          {/* اولویت */}
                          <EditField label="اولویت:">
                            <input
                              type="number"
                              min={0}
                              value={editValues.Priority}
                              onChange={(e) => setEditValues((v) => ({ ...v, Priority: e.target.value }))}
                              style={{ ...editInp, width: "80px" }}
                            />
                          </EditField>

                          {/* دکمه‌ها */}
                          <div style={{ display: "flex", gap: "8px", paddingBottom: "2px" }}>
                            <button
                              onClick={() => saveEdit(s.Id)}
                              disabled={pending}
                              style={{
                                background: pending ? "#ccc" : "#27ae60",
                                color: "#fff", border: "none",
                                width: "32px", height: "32px", borderRadius: "50%",
                                fontSize: "16px", cursor: pending ? "not-allowed" : "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}
                              title="ذخیره"
                            >
                              ✓
                            </button>
                            <button
                              onClick={cancelEdit}
                              disabled={pending}
                              style={{
                                background: "#e74c3c", color: "#fff", border: "none",
                                width: "32px", height: "32px", borderRadius: "50%",
                                fontSize: "16px", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}
                              title="لغو"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── helpers ──────────────────────────────────────────────────
function EditField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label style={{ fontSize: "11px", color: "#888", textAlign: "right" }}>{label}</label>
      {children}
    </div>
  );
}

const thS: React.CSSProperties = {
  padding: "12px 14px",
  fontWeight: 600,
  color: "#555",
  textAlign: "center",
  whiteSpace: "nowrap",
  borderLeft: "1px solid #d8d8d8",
};

const filterInp: React.CSSProperties = {
  padding: "4px 8px",
  border: "1px solid #ccc",
  borderRadius: "3px",
  fontSize: "12px",
  width: "90px",
  outline: "none",
  fontFamily: "inherit",
  background: "#fff",
};

const filterArrow: React.CSSProperties = {
  fontSize: "9px",
  color: "#999",
  flexShrink: 0,
};

const editInp: React.CSSProperties = {
  padding: "7px 10px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  fontSize: "13px",
  color: "#333",
  background: "#fff",
  fontFamily: "inherit",
  outline: "none",
  width: "160px",
  boxSizing: "border-box",
};
