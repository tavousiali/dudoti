"use client";

import { useState, useTransition, Fragment, useEffect } from "react";
import { useAdminLang } from "./AdminLangContext";

interface Character {
  Id: number;
  Lang: number;
  Name: string;
  Desc: string | null;
  Img1: string | null;
  Img2: string | null;
  BgColor: string | null;
  CSSClass: string | null;
  Priority: number;
}

interface Props {
  initialCharacters: Character[];
}

function classColor(cls: string): string {
  if (cls === "cat")    return "#e67e22";
  if (cls === "dog")    return "#2980b9";
  if (cls === "rabbit") return "#8e44ad";
  return "#7f8c8d";
}

export default function CharactersTable({ initialCharacters }: Props) {
  const { lang } = useAdminLang();

  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [loadingData, setLoadingData]   = useState(false);
  const [editingId, setEditingId]       = useState<number | null>(null);
  const [editValues, setEditValues]     = useState({
    Name: "", Desc: "", Img1: "", Img2: "",
    BgColor: "", CSSClass: "", Priority: "0",
  });

  const [filterName, setFilterName]         = useState("");
  const [filterClass, setFilterClass]       = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const [pending, startTransition] = useTransition();
  const [saveError, setSaveError]  = useState<string | null>(null);

  /* ── زبان تغییر کرد ─────────────────────────────────────── */
  useEffect(() => {
    setLoadingData(true);
    setEditingId(null);
    setSaveError(null);
    setFilterName("");
    setFilterClass("");
    setFilterPriority("");
    fetch(`/api/admin/characters?lang=${lang}`)
      .then((r) => r.json())
      .then((json) => { if (json.success) setCharacters(json.data); })
      .finally(() => setLoadingData(false));
  }, [lang]);

  /* ── ویرایش ─────────────────────────────────────────────── */
  const startEdit = (c: Character) => {
    setEditingId(c.Id);
    setSaveError(null);
    setEditValues({
      Name:     c.Name       ?? "",
      Desc:     c.Desc       ?? "",
      Img1:     c.Img1       ?? "",
      Img2:     c.Img2       ?? "",
      BgColor:  c.BgColor    ?? "",
      CSSClass: c.CSSClass   ?? "",
      Priority: String(c.Priority ?? 0),
    });
  };

  const cancelEdit = () => { setEditingId(null); setSaveError(null); };

  const saveEdit = (id: number) => {
    setSaveError(null);
    startTransition(async () => {
      const res = await fetch(`/api/admin/characters/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name:     editValues.Name     || "",
          Desc:     editValues.Desc     || null,
          Img1:     editValues.Img1     || null,
          Img2:     editValues.Img2     || null,
          BgColor:  editValues.BgColor  || null,
          CSSClass: editValues.CSSClass || null,
          Priority: editValues.Priority !== "" ? Number(editValues.Priority) : 0,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setCharacters((prev) =>
          prev.map((c) => (c.Id === id ? json.data : c))
        );
        setEditingId(null);
      } else {
        setSaveError(json.message ?? "خطا در ذخیره");
      }
    });
  };

  /* ── فیلتر محلی ──────────────────────────────────────────── */
  const filtered = characters.filter((c) => {
    const name = (c.Name       ?? "").toLowerCase();
    const cls  = (c.CSSClass   ?? "").toLowerCase();
    const pri  = String(c.Priority ?? "");
    return (
      (!filterName     || name.includes(filterName.toLowerCase())) &&
      (!filterClass    || cls.includes(filterClass.toLowerCase())) &&
      (!filterPriority || pri.includes(filterPriority))
    );
  });

  /* ── render ──────────────────────────────────────────────── */
  return (
    <div style={{
      background: "#fff", borderRadius: "8px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)", overflow: "hidden",
    }}>
      {loadingData && (
        <div style={{
          padding: "14px 18px", background: "#fffbf2",
          borderBottom: "1px solid #ffe0a0",
          fontSize: "12px", color: "#e67e00", textAlign: "center",
        }}>
          در حال بارگذاری اطلاعات...
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%", borderCollapse: "collapse",
          fontSize: "13px", textAlign: "right", direction: "rtl",
        }}>
          <thead>
            <tr style={{ background: "#e8e8e8", borderBottom: "1px solid #d0d0d0" }}>
              <th style={thS}>شناسه</th>
              <th style={{ ...thS, textAlign: "right" }}>نام</th>
              <th style={thS}>اولویت</th>
              <th style={thS}>دسته</th>
              <th style={thS}>رنگ پس‌زمینه</th>
              <th style={{ ...thS, width: "220px", textAlign: "right" }}>توضیحات (خلاصه)</th>
              <th style={thS}>تصویر ۱</th>
              <th style={thS}>تصویر ۲</th>
              <th style={thS}>ویرایش</th>
            </tr>

            <tr style={{ background: "#f2f2f2", borderBottom: "2px solid #ddd" }}>
              <td style={{ padding: "6px 10px" }} />
              <td style={{ padding: "6px 10px" }}>
                <FilterCell>
                  <input type="text" value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    style={filterInp} placeholder="جستجو..." />
                </FilterCell>
              </td>
              <td style={{ padding: "6px 10px", textAlign: "center" }}>
                <FilterCell center>
                  <input type="text" value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    style={{ ...filterInp, width: "55px" }} />
                </FilterCell>
              </td>
              <td style={{ padding: "6px 10px", textAlign: "center" }}>
                <FilterCell center>
                  <input type="text" value={filterClass}
                    onChange={(e) => setFilterClass(e.target.value)}
                    style={{ ...filterInp, width: "70px" }} placeholder="cat..." />
                </FilterCell>
              </td>
              <td colSpan={5} />
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: "40px", textAlign: "center", color: "#aaa" }}>
                  {loadingData ? "در حال بارگذاری..." : "موردی یافت نشد."}
                </td>
              </tr>
            ) : (
              filtered.map((c, idx) => (
                <Fragment key={c.Id}>
                  {/* ── ردیف نمایش ── */}
                  <tr style={{
                    borderBottom: editingId === c.Id ? "none" : "1px solid #ececec",
                    background: idx % 2 === 0 ? "#fff" : "#f7f7f7",
                  }}>
                    <td style={{ padding: "11px 14px", color: "#888", width: "60px", textAlign: "center" }}>
                      {c.Id}
                    </td>
                    <td style={{ padding: "11px 14px", fontWeight: 600, color: "#333", minWidth: "100px" }}>
                      {c.Name || "—"}
                    </td>
                    <td style={{ padding: "11px 14px", textAlign: "center", width: "70px" }}>
                      {c.Priority}
                    </td>
                    <td style={{ padding: "11px 14px", textAlign: "center", width: "90px" }}>
                      {c.CSSClass ? (
                        <span style={{
                          display: "inline-block", padding: "2px 10px",
                          borderRadius: "10px", background: classColor(c.CSSClass),
                          color: "#fff", fontSize: "11px", fontWeight: 600,
                        }}>
                          {c.CSSClass}
                        </span>
                      ) : "—"}
                    </td>
                    <td style={{ padding: "11px 14px", textAlign: "center", width: "90px" }}>
                      {c.BgColor ? (
                        <span style={{
                          display: "inline-block", padding: "2px 10px",
                          borderRadius: "10px", background: c.BgColor,
                          color: "#fff", fontSize: "11px", fontFamily: "monospace",
                        }}>
                          {c.BgColor}
                        </span>
                      ) : "—"}
                    </td>
                    <td style={{ padding: "11px 14px", maxWidth: "220px" }}>
                      <span style={{
                        display: "block", overflow: "hidden",
                        textOverflow: "ellipsis", whiteSpace: "nowrap",
                        fontSize: "12px", color: "#555", direction: "rtl",
                      }}>
                        {c.Desc
                          ? c.Desc.slice(0, 80) + (c.Desc.length > 80 ? "…" : "")
                          : <span style={{ color: "#ccc" }}>—</span>}
                      </span>
                    </td>
                    <td style={{ padding: "11px 14px", textAlign: "center", width: "80px" }}>
                      <Thumb src={c.Img1} />
                    </td>
                    <td style={{ padding: "11px 14px", textAlign: "center", width: "80px" }}>
                      <Thumb src={c.Img2} />
                    </td>
                    <td style={{ padding: "11px 14px", textAlign: "center", width: "90px" }}>
                      {editingId !== c.Id && (
                        <button onClick={() => startEdit(c)} style={{
                          display: "inline-flex", alignItems: "center", gap: "4px",
                          background: "none", border: "none",
                          color: "#e67e00", fontSize: "13px", fontWeight: 700,
                          cursor: "pointer", fontFamily: "inherit",
                        }}>
                          ✏️ ویرایش
                        </button>
                      )}
                    </td>
                  </tr>

                  {/* ── ردیف ویرایش inline ── */}
                  {editingId === c.Id && (
                    <tr style={{
                      background: "#fffbf2",
                      borderBottom: "2px solid #f90",
                      borderTop: "1px solid #ffe0a0",
                    }}>
                      <td colSpan={9} style={{ padding: "20px 24px" }}>
                        {saveError && (
                          <div style={{
                            background: "#fdecea", color: "#e74c3c",
                            padding: "8px 14px", borderRadius: "5px",
                            fontSize: "12px", marginBottom: "14px",
                          }}>{saveError}</div>
                        )}

                        {/* ردیف ۱ — فیلدهای کوتاه */}
                        <div style={{
                          display: "flex", gap: "16px", flexWrap: "wrap",
                          alignItems: "flex-end", direction: "rtl", marginBottom: "14px",
                        }}>
                          <EditField label="نام:">
                            <input value={editValues.Name}
                              onChange={(e) => setEditValues((v) => ({ ...v, Name: e.target.value }))}
                              style={editInp} placeholder="نام کاراکتر" />
                          </EditField>

                          <EditField label="دسته (CSSClass):">
                            <input value={editValues.CSSClass}
                              onChange={(e) => setEditValues((v) => ({ ...v, CSSClass: e.target.value }))}
                              style={{ ...editInp, width: "110px", direction: "ltr" }}
                              placeholder="cat / dog / rabbit" />
                          </EditField>

                          <EditField label="رنگ پس‌زمینه:">
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <input type="color" value={editValues.BgColor || "#cccccc"}
                                onChange={(e) => setEditValues((v) => ({ ...v, BgColor: e.target.value }))}
                                style={{ width: "40px", height: "34px", padding: "2px", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer" }} />
                              <input value={editValues.BgColor}
                                onChange={(e) => setEditValues((v) => ({ ...v, BgColor: e.target.value }))}
                                style={{ ...editInp, width: "100px", direction: "ltr" }}
                                placeholder="#00c9e9" />
                            </div>
                          </EditField>

                          <EditField label="اولویت:">
                            <input type="number" min={0} value={editValues.Priority}
                              onChange={(e) => setEditValues((v) => ({ ...v, Priority: e.target.value }))}
                              style={{ ...editInp, width: "80px" }} />
                          </EditField>
                        </div>

                        {/* ردیف ۲ — مسیر تصاویر */}
                        <div style={{
                          display: "flex", gap: "16px", flexWrap: "wrap",
                          alignItems: "flex-end", direction: "rtl", marginBottom: "14px",
                        }}>
                          <EditField label="مسیر تصویر ۱ (Img1):">
                            <input value={editValues.Img1}
                              onChange={(e) => setEditValues((v) => ({ ...v, Img1: e.target.value }))}
                              style={{ ...editInp, width: "280px", direction: "ltr", textAlign: "left" }}
                              placeholder="/images/about/cat-1.png" />
                          </EditField>

                          <EditField label="مسیر تصویر ۲ (Img2):">
                            <input value={editValues.Img2}
                              onChange={(e) => setEditValues((v) => ({ ...v, Img2: e.target.value }))}
                              style={{ ...editInp, width: "280px", direction: "ltr", textAlign: "left" }}
                              placeholder="/images/about/cat-2.png" />
                          </EditField>
                        </div>

                        {/* ردیف ۳ — توضیحات */}
                        <div style={{
                          display: "flex", gap: "16px", flexWrap: "wrap",
                          alignItems: "flex-end", direction: "rtl", marginBottom: "16px",
                        }}>
                          <EditField label="توضیحات (Desc):">
                            <textarea
                              value={editValues.Desc}
                              onChange={(e) => setEditValues((v) => ({ ...v, Desc: e.target.value }))}
                              rows={6}
                              style={{
                                ...editInp, width: "620px",
                                maxWidth: "calc(100vw - 120px)",
                                height: "auto", resize: "vertical", lineHeight: "1.8",
                              }}
                              placeholder="توضیحات کاراکتر..."
                            />
                          </EditField>
                        </div>

                        {/* دکمه‌های ذخیره / لغو */}
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => saveEdit(c.Id)} disabled={pending}
                            style={{
                              background: pending ? "#ccc" : "#27ae60",
                              color: "#fff", border: "none",
                              width: "36px", height: "36px", borderRadius: "50%",
                              fontSize: "18px", cursor: pending ? "not-allowed" : "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }} title="ذخیره">✓</button>
                          <button onClick={cancelEdit} disabled={pending}
                            style={{
                              background: "#e74c3c", color: "#fff", border: "none",
                              width: "36px", height: "36px", borderRadius: "50%",
                              fontSize: "18px", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }} title="لغو">✕</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── کامپوننت‌های کمکی ───────────────────────────────────── */
function EditField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label style={{ fontSize: "11px", color: "#888", textAlign: "right" }}>{label}</label>
      {children}
    </div>
  );
}

function FilterCell({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "4px",
      justifyContent: center ? "center" : "flex-start",
    }}>
      {children}
      <span style={{ fontSize: "9px", color: "#999", flexShrink: 0 }}>▼</span>
    </div>
  );
}

function Thumb({ src }: { src: string | null }) {
  if (!src) return <span style={{ color: "#ccc", fontSize: "11px" }}>—</span>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src} alt=""
      style={{ width: "46px", height: "46px", objectFit: "cover", borderRadius: "6px", border: "1px solid #eee" }}
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
    />
  );
}

/* ── استایل‌های مشترک ────────────────────────────────────── */
const thS: React.CSSProperties = {
  padding: "12px 14px", fontWeight: 600, color: "#555",
  textAlign: "center", whiteSpace: "nowrap", borderLeft: "1px solid #d8d8d8",
};
const filterInp: React.CSSProperties = {
  padding: "4px 8px", border: "1px solid #ccc", borderRadius: "3px",
  fontSize: "12px", width: "90px", outline: "none",
  fontFamily: "inherit", background: "#fff",
};
const editInp: React.CSSProperties = {
  padding: "7px 10px", border: "1px solid #ddd", borderRadius: "5px",
  fontSize: "13px", color: "#333", background: "#fff",
  fontFamily: "inherit", outline: "none", width: "160px",
  boxSizing: "border-box",
};
