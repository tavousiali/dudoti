"use client";

import { useState, useTransition, Fragment, useEffect } from "react";
import { useAdminLang } from "./AdminLangContext";

interface BigImage {
  Id: number;
  Title: string | null;
  Pic1: string | null;
  Pic2: string | null;
  Text2: string | null;
  Link: string | null;
  Priority: number | null;
  Type: number | null;
  Class: string | null;
  Lang: number;
}

interface Props {
  initialImages: BigImage[];
}

function classColor(cls: string): string {
  if (cls === "cat")    return "#e67e22";
  if (cls === "dog")    return "#2980b9";
  if (cls === "rabbit") return "#8e44ad";
  return "#7f8c8d";
}

export default function BigImagesTable({ initialImages }: Props) {
  const { lang } = useAdminLang();

  const [images, setImages]         = useState<BigImage[]>(initialImages);
  const [loadingData, setLoadingData] = useState(false);
  const [editingId, setEditingId]   = useState<number | null>(null);
  const [editValues, setEditValues] = useState({
    Title: "", Pic1: "", Pic2: "", Text2: "",
    Link: "", Priority: "", Type: "1", Class: "",
  });

  const [filterTitle,    setFilterTitle]    = useState("");
  const [filterClass,    setFilterClass]    = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const [pending, startTransition] = useTransition();
  const [saveError, setSaveError]  = useState<string | null>(null);

  /* ── زبان تغییر کرد: داده جدید بگیر ─────────────────────── */
  useEffect(() => {
    setLoadingData(true);
    setEditingId(null);
    setSaveError(null);
    setFilterTitle("");
    setFilterClass("");
    setFilterPriority("");
    fetch(`/api/admin/big-images?lang=${lang}`)
      .then((r) => r.json())
      .then((json) => { if (json.success) setImages(json.data); })
      .finally(() => setLoadingData(false));
  }, [lang]);

  /* ── ویرایش ─────────────────────────────────────────────── */
  const startEdit = (img: BigImage) => {
    setEditingId(img.Id);
    setSaveError(null);
    setEditValues({
      Title:    img.Title    ?? "",
      Pic1:     img.Pic1     ?? "",
      Pic2:     img.Pic2     ?? "",
      Text2:    img.Text2    ?? "",
      Link:     img.Link     ?? "",
      Priority: String(img.Priority ?? ""),
      Type:     String(img.Type     ?? "1"),
      Class:    img.Class    ?? "",
    });
  };

  const cancelEdit = () => { setEditingId(null); setSaveError(null); };

  const saveEdit = (id: number) => {
    setSaveError(null);
    startTransition(async () => {
      const res = await fetch(`/api/admin/big-images/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Title:    editValues.Title    || null,
          Pic1:     editValues.Pic1     || null,
          Pic2:     editValues.Pic2     || null,
          Text2:    editValues.Text2    || null,
          Link:     editValues.Link     || null,
          Priority: editValues.Priority !== "" ? Number(editValues.Priority) : null,
          Type:     editValues.Type     !== "" ? Number(editValues.Type)     : null,
          Class:    editValues.Class    || null,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setImages((prev) => prev.map((img) => (img.Id === id ? json.data : img)));
        setEditingId(null);
      } else {
        setSaveError(json.message ?? "خطا در ذخیره");
      }
    });
  };

  /* ── فیلتر محلی ──────────────────────────────────────────── */
  const filtered = images.filter((img) => {
    const t  = (img.Title ?? "").toLowerCase();
    const cl = (img.Class ?? "").toLowerCase();
    const p  = String(img.Priority ?? "");
    return (
      (!filterTitle    || t.includes(filterTitle.toLowerCase()))  &&
      (!filterClass    || cl.includes(filterClass.toLowerCase())) &&
      (!filterPriority || p.includes(filterPriority))
    );
  });

  /* ── render ──────────────────────────────────────────────── */
  return (
    <div style={{
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      overflow: "hidden",
    }}>
      {loadingData && (
        <div style={{
          padding: "14px 18px",
          background: "#fffbf2",
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
            {/* سرستون‌ها */}
            <tr style={{ background: "#e8e8e8", borderBottom: "1px solid #d0d0d0" }}>
              <th style={thS}>شناسه</th>
              <th style={{ ...thS, textAlign: "right" }}>عنوان</th>
              <th style={thS}>اولویت</th>
              <th style={thS}>دسته</th>
              <th style={{ ...thS, width: "240px", textAlign: "right" }}>متن (خلاصه)</th>
              <th style={thS}>تصویر ۱</th>
              <th style={thS}>تصویر ۲</th>
              <th style={thS}>ویرایش</th>
            </tr>

            {/* فیلترها */}
            <tr style={{ background: "#f2f2f2", borderBottom: "2px solid #ddd" }}>
              <td style={{ padding: "6px 10px" }} />
              <td style={{ padding: "6px 10px" }}>
                <FilterCell>
                  <input type="text" value={filterTitle}
                    onChange={(e) => setFilterTitle(e.target.value)}
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
              <td colSpan={4} />
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: "40px", textAlign: "center", color: "#aaa" }}>
                  {loadingData ? "در حال بارگذاری..." : "موردی یافت نشد."}
                </td>
              </tr>
            ) : (
              filtered.map((img, idx) => (
                <Fragment key={img.Id}>

                  {/* ── ردیف نمایش ── */}
                  <tr style={{
                    borderBottom: editingId === img.Id ? "none" : "1px solid #ececec",
                    background: idx % 2 === 0 ? "#fff" : "#f7f7f7",
                  }}>
                    <td style={{ padding: "11px 14px", color: "#888", width: "60px", textAlign: "center" }}>
                      {img.Id}
                    </td>
                    <td style={{ padding: "11px 14px", fontWeight: 600, color: "#333", minWidth: "100px" }}>
                      {img.Title ?? "—"}
                    </td>
                    <td style={{ padding: "11px 14px", textAlign: "center", width: "70px" }}>
                      {img.Priority ?? "—"}
                    </td>
                    <td style={{ padding: "11px 14px", textAlign: "center", width: "90px" }}>
                      {img.Class ? (
                        <span style={{
                          display: "inline-block", padding: "2px 10px",
                          borderRadius: "10px", background: classColor(img.Class),
                          color: "#fff", fontSize: "11px", fontWeight: 600,
                        }}>
                          {img.Class}
                        </span>
                      ) : "—"}
                    </td>
                    <td style={{ padding: "11px 14px", maxWidth: "240px" }}>
                      <span style={{
                        display: "block", overflow: "hidden",
                        textOverflow: "ellipsis", whiteSpace: "nowrap",
                        fontSize: "12px", color: "#555", direction: "rtl",
                      }}>
                        {img.Text2
                          ? img.Text2.slice(0, 90) + (img.Text2.length > 90 ? "…" : "")
                          : <span style={{ color: "#ccc" }}>—</span>}
                      </span>
                    </td>
                    <td style={{ padding: "11px 14px", textAlign: "center", width: "80px" }}>
                      <Thumb src={img.Pic1} />
                    </td>
                    <td style={{ padding: "11px 14px", textAlign: "center", width: "80px" }}>
                      <Thumb src={img.Pic2} />
                    </td>
                    <td style={{ padding: "11px 14px", textAlign: "center", width: "90px" }}>
                      {editingId !== img.Id && (
                        <button onClick={() => startEdit(img)} style={{
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
                  {editingId === img.Id && (
                    <tr style={{
                      background: "#fffbf2",
                      borderBottom: "2px solid #f90",
                      borderTop: "1px solid #ffe0a0",
                    }}>
                      <td colSpan={8} style={{ padding: "20px 24px" }}>

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
                          <EditField label="عنوان:">
                            <input value={editValues.Title}
                              onChange={(e) => setEditValues((v) => ({ ...v, Title: e.target.value }))}
                              style={editInp} placeholder="نام کاراکتر" />
                          </EditField>

                          <EditField label="دسته (Class):">
                            <input value={editValues.Class}
                              onChange={(e) => setEditValues((v) => ({ ...v, Class: e.target.value }))}
                              style={{ ...editInp, width: "110px", direction: "ltr" }}
                              placeholder="cat / dog / rabbit" />
                          </EditField>

                          <EditField label="اولویت:">
                            <input type="number" min={0} value={editValues.Priority}
                              onChange={(e) => setEditValues((v) => ({ ...v, Priority: e.target.value }))}
                              style={{ ...editInp, width: "80px" }} />
                          </EditField>

                          <EditField label="نوع (Type):">
                            <input type="number" min={1} value={editValues.Type}
                              onChange={(e) => setEditValues((v) => ({ ...v, Type: e.target.value }))}
                              style={{ ...editInp, width: "70px" }} />
                          </EditField>

                          <EditField label="لینک:">
                            <input value={editValues.Link}
                              onChange={(e) => setEditValues((v) => ({ ...v, Link: e.target.value }))}
                              style={{ ...editInp, width: "200px", direction: "ltr", textAlign: "left" }}
                              placeholder="https://..." />
                          </EditField>
                        </div>

                        {/* ردیف ۲ — مسیر تصاویر */}
                        <div style={{
                          display: "flex", gap: "16px", flexWrap: "wrap",
                          alignItems: "flex-end", direction: "rtl", marginBottom: "14px",
                        }}>
                          <EditField label="مسیر تصویر ۱ (Pic1):">
                            <input value={editValues.Pic1}
                              onChange={(e) => setEditValues((v) => ({ ...v, Pic1: e.target.value }))}
                              style={{ ...editInp, width: "280px", direction: "ltr", textAlign: "left" }}
                              placeholder="/images/Theme/cat-1.png" />
                          </EditField>

                          <EditField label="مسیر تصویر ۲ (Pic2):">
                            <input value={editValues.Pic2}
                              onChange={(e) => setEditValues((v) => ({ ...v, Pic2: e.target.value }))}
                              style={{ ...editInp, width: "280px", direction: "ltr", textAlign: "left" }}
                              placeholder="/images/Theme/cat-2.png" />
                          </EditField>
                        </div>

                        {/* ردیف ۳ — متن */}
                        <div style={{
                          display: "flex", gap: "16px", flexWrap: "wrap",
                          alignItems: "flex-end", direction: "rtl", marginBottom: "16px",
                        }}>
                          <EditField label="متن (Text2):">
                            <textarea
                              value={editValues.Text2}
                              onChange={(e) => setEditValues((v) => ({ ...v, Text2: e.target.value }))}
                              rows={5}
                              style={{
                                ...editInp, width: "620px", maxWidth: "calc(100vw - 120px)",
                                height: "auto", resize: "vertical", lineHeight: "1.8",
                              }}
                              placeholder="توضیحات کاراکتر..."
                            />
                          </EditField>
                        </div>

                        {/* دکمه‌های ذخیره / لغو */}
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => saveEdit(img.Id)} disabled={pending}
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
