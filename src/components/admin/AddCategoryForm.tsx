"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAdminLang } from "./AdminLangContext";

const schema = z.object({
  Title: z.string().min(1, "عنوان الزامی است"),
  TitleEn: z.string().optional(),
  SeoTitle: z.string().optional(),
  SeoLead: z.string().optional(),
  urlTitle: z.string().optional(),
  Lead: z.string().optional(),
  Description: z.string().optional(),
  Priority: z.coerce.number().int().min(0).default(0),
  ShowMenu: z.boolean().default(false),
  Actice: z.boolean().default(true),
  CSSClass: z.string().optional(),
  Pic1: z.string().optional(),
  Video: z.string().optional(),
  VideoPic: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function AddCategoryForm() {
  const router = useRouter();
  const { lang, langLabel } = useAdminLang();

  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [picPreview, setPicPreview] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [videoPicName, setVideoPicName] = useState<string | null>(null);

  const picInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const videoPicInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { Priority: 0, ShowMenu: false, Actice: true },
  });

  const onSubmit = async (data: FormValues) => {
    setSaving(true);
    setServerError(null);
    try {
      const res = await fetch("/api/admin/product-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ParentId: 0, Lang: lang }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message ?? "خطای ناشناخته");
      router.push("/AdminPanel/main-categories");
      router.refresh();
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "خطا در ذخیره‌سازی");
    } finally {
      setSaving(false);
    }
  };

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPicPreview(URL.createObjectURL(file));
    setValue("Pic1", `/images/products/${file.name}`);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoName(file.name);
    setValue("Video", `/images/products/${file.name}`);
  };

  const handleVideoPicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoPicName(file.name);
    setValue("VideoPic", `/images/products/${file.name}`);
  };

  const titleLabel = lang === 1 ? "عنوان فارسی" : lang === 2 ? "Title (English)" : "Titre (Français)";

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ direction: "rtl" }}>
      {/* نوار زبان فعال */}
      <div style={{
        background: "#fff8ee", border: "1px solid #ffe0a0", borderRadius: "8px",
        padding: "10px 18px", marginBottom: "16px",
        display: "flex", alignItems: "center", gap: "8px",
        fontSize: "13px", color: "#b87000",
      }}>
        <span>🌐</span>
        در حال افزودن برای زبان: <strong>{langLabel}</strong>
      </div>

      <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>

        {/* تصویر */}
        <Section>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "120px", height: "120px", background: "#f5f5f5", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              {picPreview
                ? <Image src={picPreview} alt="تصویر" width={110} height={110} style={{ objectFit: "contain" }} />
                : <span style={{ fontSize: "40px" }}>📦</span>}
            </div>
            <FieldRow label="بارگذاری عکس" helpText="?">
              <input ref={picInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePicChange} />
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="text" readOnly placeholder="No file chosen"
                  value={picPreview ? "تصویر انتخاب شده" : ""} style={inputStyle} />
                <button type="button" onClick={() => picInputRef.current?.click()} style={chooseFileStyle}>Choose File</button>
              </div>
            </FieldRow>
          </div>
        </Section>

        <Divider />

        {/* عنوان — پویا */}
        <Section>
          <FieldRow label={titleLabel} required>
            <input {...register("Title")}
              style={{ ...inputStyle, borderColor: errors.Title ? "#e74c3c" : "#e0e0e0" }}
              placeholder={lang === 1 ? "مثال: محصولات سگ" : lang === 2 ? "e.g. Dog products" : "ex: Produits chiens"} />
            {errors.Title && <ErrorMsg>{errors.Title.message}</ErrorMsg>}
          </FieldRow>
        </Section>

        <Divider />

        {/* عنوان انگلیسی (فقط وقتی lang=1 نشون بده) */}
        {lang === 1 && (
          <>
            <Section>
              <FieldRow label="عنوان انگلیسی (TitleEn)">
                <input {...register("TitleEn")}
                  style={{ ...inputStyle, direction: "ltr", textAlign: "left" }}
                  placeholder="dog products" />
              </FieldRow>
            </Section>
            <Divider />
          </>
        )}

        {/* عنوان SEO */}
        <Section>
          <FieldRow label="عنوان SEO">
            <input {...register("SeoTitle")} style={inputStyle} />
          </FieldRow>
        </Section>
        <Divider />

        {/* URL */}
        <Section>
          <FieldRow label="عنوان URL">
            <input {...register("urlTitle")} style={{ ...inputStyle, direction: "ltr", textAlign: "left" }} placeholder="dog" />
          </FieldRow>
        </Section>
        <Divider />

        {/* اولویت */}
        <Section>
          <FieldRow label="اولویت">
            <input {...register("Priority")} type="number" min={0} style={{ ...inputStyle, width: "120px" }} />
          </FieldRow>
        </Section>
        <Divider />

        {/* خلاصه */}
        <Section>
          <FieldRow label="خلاصه (Lead)">
            <textarea {...register("Lead")} rows={3}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
          </FieldRow>
        </Section>
        <Divider />

        {/* ShowMenu & Actice */}
        <Section>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" {...register("ShowMenu")} style={{ marginLeft: "6px" }} />
              نمایش در منو
            </label>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" {...register("Actice")} style={{ marginLeft: "6px" }} />
              فعال
            </label>
          </div>
        </Section>
        <Divider />

        {/* ویدیو */}
        <Section>
          <FieldRow label="بارگذاری ویدیو" helpText="?">
            <input ref={videoInputRef} type="file" accept="video/*" style={{ display: "none" }} onChange={handleVideoChange} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input type="text" readOnly value={videoName ?? ""} placeholder="No file chosen" style={inputStyle} />
              <button type="button" onClick={() => videoInputRef.current?.click()} style={chooseFileStyle}>Choose File</button>
            </div>
          </FieldRow>
        </Section>
        <Divider />

        {/* پوستر ویدیو */}
        <Section>
          <FieldRow label="بارگذاری پوستر ویدیو" helpText="?">
            <input ref={videoPicInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleVideoPicChange} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input type="text" readOnly value={videoPicName ?? ""} placeholder="No file chosen" style={inputStyle} />
              <button type="button" onClick={() => videoPicInputRef.current?.click()} style={chooseFileStyle}>Choose File</button>
            </div>
          </FieldRow>
        </Section>
        <Divider />

        {/* Submit */}
        <Section>
          {serverError && (
            <div style={{ background: "#fdecea", color: "#e74c3c", padding: "10px 16px", borderRadius: "6px", fontSize: "13px", marginBottom: "16px" }}>
              {serverError}
            </div>
          )}
          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" disabled={saving} style={{
              background: saving ? "#ccc" : "#f90", color: "#fff", border: "none",
              padding: "11px 32px", borderRadius: "7px", fontSize: "14px", fontWeight: 700,
              cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit",
            }}>
              {saving ? "در حال ذخیره..." : "افزودن"}
            </button>
            <button type="button" onClick={() => router.back()} style={{
              background: "#fff", color: "#666", border: "1px solid #ddd",
              padding: "11px 24px", borderRadius: "7px", fontSize: "14px",
              cursor: "pointer", fontFamily: "inherit",
            }}>
              انصراف
            </button>
          </div>
        </Section>
      </div>
    </form>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: "18px 24px" }}>{children}</div>;
}
function Divider() {
  return <div style={{ borderTop: "1px solid #f0f0f0" }} />;
}
function FieldRow({ label, required, helpText, children }: {
  label: string; required?: boolean; helpText?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", direction: "rtl" }}>
      <div style={{ minWidth: "160px", paddingTop: "8px", fontSize: "13px", color: "#555", fontWeight: 500, textAlign: "right", display: "flex", alignItems: "center", gap: "4px" }}>
        {required && <span style={{ color: "#e74c3c" }}>*</span>}
        {label}
        {helpText && (
          <span style={{ background: "#eee", color: "#888", borderRadius: "50%", width: "16px", height: "16px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", cursor: "help", marginRight: "4px" }}>{helpText}</span>
        )}
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
function ErrorMsg({ children }: { children: React.ReactNode }) {
  return <p style={{ color: "#e74c3c", fontSize: "11px", margin: "4px 0 0" }}>{children}</p>;
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px", border: "1px solid #e0e0e0", borderRadius: "6px",
  fontSize: "13px", color: "#333", background: "#fafafa",
  fontFamily: "inherit", boxSizing: "border-box", outline: "none",
};
const chooseFileStyle: React.CSSProperties = {
  flexShrink: 0, background: "#f0f0f0", color: "#333", border: "1px solid #ccc",
  padding: "9px 14px", borderRadius: "4px", fontSize: "12px",
  cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
};
const checkboxLabelStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", fontSize: "13px", color: "#444",
  cursor: "pointer", userSelect: "none",
};
