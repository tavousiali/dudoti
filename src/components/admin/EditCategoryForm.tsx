"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ── Schema ────────────────────────────────────────────────
const schema = z.object({
  Title:       z.string().min(1, "عنوان فارسی الزامی است"),
  TitleEn:     z.string().optional(),
  SeoTitle:    z.string().optional(),
  SeoLead:     z.string().optional(),
  urlTitle:    z.string().optional(),
  Lead:        z.string().optional(),
  Description: z.string().optional(),
  Priority:    z.coerce.number().int().min(0).default(0),
  ShowMenu:    z.boolean().default(false),
  Actice:      z.boolean().default(true),
  CSSClass:    z.string().optional(),
  Pic1:        z.string().optional(),
  Video:       z.string().optional(),
  VideoPic:    z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Category {
  Id: number;
  Title: string;
  TitleEn: string | null;
  SeoTitle: string | null;
  SeoLead: string | null;
  urlTitle: string | null;
  Lead: string | null;
  Description: string | null;
  Priority: number;
  ShowMenu: boolean;
  Actice: boolean;
  CSSClass: string | null;
  Pic1: string | null;
  Pic2: string | null;
  Video: string | null;
  VideoPic: string | null;
}

interface Props {
  category: Category;
}

export default function EditCategoryForm({ category }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [picPreview, setPicPreview] = useState<string | null>(category.Pic1);
  const [videoName, setVideoName]     = useState<string | null>(category.Video ? category.Video.split("/").pop() ?? null : null);
  const [videoPicName, setVideoPicName] = useState<string | null>(category.VideoPic ? category.VideoPic.split("/").pop() ?? null : null);

  const picInputRef      = useRef<HTMLInputElement>(null);
  const videoInputRef    = useRef<HTMLInputElement>(null);
  const videoPicInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      Title:       category.Title       ?? "",
      TitleEn:     category.TitleEn     ?? "",
      SeoTitle:    category.SeoTitle    ?? "",
      SeoLead:     category.SeoLead     ?? "",
      urlTitle:    category.urlTitle    ?? "",
      Lead:        category.Lead        ?? "",
      Description: category.Description ?? "",
      Priority:    category.Priority    ?? 0,
      ShowMenu:    category.ShowMenu    ?? false,
      Actice:      category.Actice      ?? true,
      CSSClass:    category.CSSClass    ?? "",
      Pic1:        category.Pic1        ?? "",
      Video:       category.Video       ?? "",
      VideoPic:    category.VideoPic    ?? "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSaving(true);
    setServerError(null);
    try {
      const res = await fetch(`/api/admin/product-categories/${category.Id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message ?? "خطای ناشناخته");
      router.push("/AdminPanel/dashboard/products/main-categories");
      router.refresh();
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "خطا در ذخیره‌سازی");
    } finally {
      setSaving(false);
    }
  };

  // Simulate file-path set (real upload needs a separate upload API)
  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPicPreview(url);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ direction: "rtl" }}>
      <div style={{
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}>

        {/* ── Image Upload ── */}
        <Section>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
            {/* Preview */}
            <div style={{
              width: "120px", height: "120px",
              background: "#f5f5f5",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden",
            }}>
              {picPreview ? (
                <Image src={picPreview} alt="تصویر" width={110} height={110}
                  style={{ objectFit: "contain" }} />
              ) : (
                <span style={{ fontSize: "40px" }}>📦</span>
              )}
            </div>
            <FieldRow label="بارگذاری عکس" required={false} helpText="?">
              <input
                ref={picInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePicChange}
              />
              <input
                type="text"
                readOnly
                placeholder="No file chosen"
                style={inputStyle}
                value={picPreview ? "تصویر انتخاب شده" : ""}
              />
              <button
                type="button"
                onClick={() => picInputRef.current?.click()}
                style={chooseFileStyle}
              >
                Choose File
              </button>
            </FieldRow>
          </div>
        </Section>

        <Divider />

        {/* ── عنوان فارسی ── */}
        <Section>
          <FieldRow label="عنوان فارسی" required>
            <input
              {...register("Title")}
              style={{ ...inputStyle, borderColor: errors.Title ? "#e74c3c" : "#e0e0e0" }}
              placeholder="مثال: محصولات جوندگان"
            />
            {errors.Title && <ErrorMsg>{errors.Title.message}</ErrorMsg>}
          </FieldRow>
        </Section>

        <Divider />

        {/* ── عنوان SEO ── */}
        <Section>
          <FieldRow label="عنوان SEO" required={false}>
            <input
              {...register("SeoTitle")}
              style={inputStyle}
              placeholder="انواع غذاهای تشویقی جوندگان"
            />
          </FieldRow>
        </Section>

        <Divider />

        {/* ── urlTitle ── */}
        <Section>
          <FieldRow label="عنوان URL" required={false}>
            <input
              {...register("urlTitle")}
              style={{ ...inputStyle, direction: "ltr", textAlign: "left" }}
              placeholder="rodent"
            />
          </FieldRow>
        </Section>

        <Divider />

        {/* ── Priority ── */}
        <Section>
          <FieldRow label="اولویت" required={false}>
            <input
              {...register("Priority")}
              type="number"
              min={0}
              style={{ ...inputStyle, width: "120px" }}
            />
          </FieldRow>
        </Section>

        <Divider />

        {/* ── Lead (خلاصه) ── */}
        <Section>
          <FieldRow label="خلاصه (Lead)" required={false} helpText="(Title)">
            <textarea
              {...register("Lead")}
              rows={3}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              placeholder="توضیح کوتاه..."
            />
          </FieldRow>
        </Section>

        <Divider />

        {/* ── ShowMenu & Actice ── */}
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

        {/* ── Video Upload ── */}
        <Section>
          <FieldRow label="بارگذاری ویدیو" required={false} helpText="?">
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleVideoChange}
            />
            <input
              type="text"
              readOnly
              value={videoName ?? ""}
              placeholder="No file chosen"
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              style={chooseFileStyle}
            >
              Choose File
            </button>
          </FieldRow>
        </Section>

        <Divider />

        {/* ── Video Poster Upload ── */}
        <Section>
          <FieldRow label="بارگذاری پوستر ویدیو" required={false} helpText="?">
            <input
              ref={videoPicInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleVideoPicChange}
            />
            <input
              type="text"
              readOnly
              value={videoPicName ?? ""}
              placeholder="No file chosen"
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => videoPicInputRef.current?.click()}
              style={chooseFileStyle}
            >
              Choose File
            </button>
          </FieldRow>
        </Section>

        <Divider />

        {/* ── Submit ── */}
        <Section>
          {serverError && (
            <div style={{
              background: "#fdecea", color: "#e74c3c",
              padding: "10px 16px", borderRadius: "6px",
              fontSize: "13px", marginBottom: "16px",
            }}>
              {serverError}
            </div>
          )}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                background: saving ? "#ccc" : "#f90",
                color: "#fff",
                border: "none",
                padding: "11px 32px",
                borderRadius: "7px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
                fontFamily: "inherit",
              }}
            >
              {saving ? "در حال ذخیره..." : "ویرایش"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              style={{
                background: "#fff",
                color: "#666",
                border: "1px solid #ddd",
                padding: "11px 24px",
                borderRadius: "7px",
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              انصراف
            </button>
          </div>
        </Section>
      </div>
    </form>
  );
}

// ── Helper components ────────────────────────────────────────

function Section({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: "18px 24px" }}>{children}</div>;
}

function Divider() {
  return <div style={{ borderTop: "1px solid #f0f0f0" }} />;
}

function FieldRow({
  label,
  required,
  helpText,
  children,
}: {
  label: string;
  required?: boolean;
  helpText?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", direction: "rtl" }}>
      <div style={{
        minWidth: "160px",
        paddingTop: "8px",
        fontSize: "13px",
        color: "#555",
        fontWeight: 500,
        textAlign: "right",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}>
        {required && <span style={{ color: "#e74c3c" }}>*</span>}
        {label}
        {helpText && (
          <span style={{
            background: "#eee",
            color: "#888",
            borderRadius: "50%",
            width: "16px",
            height: "16px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            cursor: "help",
            marginRight: "4px",
          }}>
            {helpText}
          </span>
        )}
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: "#e74c3c", fontSize: "11px", margin: "4px 0 0" }}>{children}</p>
  );
}

// ── Styles ───────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  border: "1px solid #e0e0e0",
  borderRadius: "6px",
  fontSize: "13px",
  color: "#333",
  background: "#fafafa",
  fontFamily: "inherit",
  boxSizing: "border-box",
  outline: "none",
};

const chooseFileStyle: React.CSSProperties = {
  marginTop: "6px",
  background: "#f0f0f0",
  color: "#333",
  border: "1px solid #ccc",
  padding: "6px 14px",
  borderRadius: "4px",
  fontSize: "12px",
  cursor: "pointer",
  fontFamily: "inherit",
};

const checkboxLabelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: "13px",
  color: "#444",
  cursor: "pointer",
  userSelect: "none",
};
