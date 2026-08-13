"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const RichEditor = dynamic(() => import("./RichEditor"), { ssr: false });

// ── Schema ────────────────────────────────────────────────────
const schema = z.object({
  Title:    z.string().optional(),
  PreTitle: z.string().optional(),
  SeoTitle: z.string().optional(),
  SeoLead:  z.string().optional(),
  Text:     z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageData = any;

interface Props {
  record: PageData;
}

export default function ContactForm({ record }: Props) {
  const router = useRouter();
  const [saving,      setSaving]      = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [savedOk,     setSavedOk]     = useState(false);

  const { register, handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      Title:    record?.Title    ?? "",
      PreTitle: record?.PreTitle ?? "",
      SeoTitle: record?.SeoTitle ?? "",
      SeoLead:  record?.SeoLead  ?? "",
      Text:     record?.Text     ?? "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSaving(true);
    setSavedOk(false);
    setServerError(null);
    try {
      const res  = await fetch(`/api/admin/pages/${record.Id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message ?? "خطای ناشناخته");
      setSavedOk(true);
      router.refresh();
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "خطا در ذخیره‌سازی");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ direction: "rtl" }}>
      <div style={{
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
        overflow: "hidden",
        marginBottom: "20px",
      }}>

        {/* ── عنوان صفحه (آدرس‌بار) ── */}
        <Row label="عنوان صفحه (آدرس‌بار)">
          <input {...register("SeoTitle")} style={inp()} />
        </Row>
        <Hr />

        {/* ── عنوان اصلی ── */}
        <Row label="عنوان اصلی">
          <input {...register("Title")} style={inp()} />
        </Row>
        <Hr />

        {/* ── آدرس ایمیل فرم ── */}
        <Row label="آدرس ایمیل فرم">
          <input
            {...register("PreTitle")}
            style={{ ...inp(), direction: "ltr", textAlign: "left" }}
            placeholder="example@gmail.com"
          />
        </Row>
        <Hr />

        {/* ── خلاصه (متاتگ) ── */}
        <Row label="خلاصه (متاتگ)">
          <textarea
            {...register("SeoLead")}
            rows={2}
            style={{ ...inp(), resize: "vertical", fontFamily: "inherit" }}
          />
        </Row>
        <Hr />

        {/* ── متن (rich text) ── */}
        <Row label="متن" vertical>
          <Controller
            name="Text"
            control={control}
            render={({ field }) => (
              <RichEditor
                value={field.value ?? ""}
                onChange={field.onChange}
                minHeight={240}
              />
            )}
          />
        </Row>
        <Hr />

        {/* ── Submit ── */}
        <div style={{ padding: "20px 24px" }}>
          {serverError && (
            <div style={{
              background: "#fdecea", color: "#e74c3c",
              padding: "10px 16px", borderRadius: "6px",
              fontSize: "13px", marginBottom: "14px",
            }}>
              {serverError}
            </div>
          )}
          {savedOk && (
            <div style={{
              background: "#e8f8f0", color: "#27ae60",
              padding: "10px 16px", borderRadius: "6px",
              fontSize: "13px", marginBottom: "14px",
            }}>
              تغییرات با موفقیت ذخیره شد.
            </div>
          )}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                background: saving ? "#ccc" : "#f90",
                color: "#fff", border: "none",
                padding: "11px 40px", borderRadius: "7px",
                fontSize: "14px", fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
                fontFamily: "inherit",
              }}
            >
              {saving ? "در حال ذخیره..." : "به‌روزرسانی"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              style={{
                background: "#fff", color: "#666",
                border: "1px solid #ddd",
                padding: "11px 24px", borderRadius: "7px",
                fontSize: "14px", cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

// ── Helpers ──────────────────────────────────────────────────
function Row({
  label, vertical, children,
}: {
  label: string; vertical?: boolean; children: React.ReactNode;
}) {
  if (vertical) {
    return (
      <div style={{ padding: "16px 24px", direction: "rtl" }}>
        <div style={{ fontSize: "12px", color: "#888", marginBottom: "10px", textAlign: "right" }}>
          {label}
        </div>
        {children}
      </div>
    );
  }
  return (
    <div style={{
      display: "flex", alignItems: "flex-start",
      padding: "14px 24px", gap: "16px", direction: "rtl",
    }}>
      <div style={{
        width: "190px", flexShrink: 0,
        fontSize: "12px", color: "#888",
        textAlign: "right", paddingTop: "8px",
      }}>
        {label}
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function Hr() {
  return <div style={{ borderTop: "1px solid #f0f0f0" }} />;
}

const inp = (): React.CSSProperties => ({
  width: "100%", padding: "8px 12px",
  border: "1px solid #e0e0e0", borderRadius: "5px",
  fontSize: "13px", color: "#333", background: "#fafafa",
  fontFamily: "inherit", boxSizing: "border-box", outline: "none",
});
