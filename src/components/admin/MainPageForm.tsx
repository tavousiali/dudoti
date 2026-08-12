"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const RichEditor = dynamic(() => import("./RichEditor"), { ssr: false });

// ── Schema ────────────────────────────────────────────────────
const schema = z.object({
  MainTitle: z.string().optional(),
  ShortTitle: z.string().optional(),
  Keywords: z.string().optional(),
  Description: z.string().optional(),
  SloganImage: z.string().optional(),
  SloganTitle: z.string().optional(),
  Slogan: z.string().optional(),
  Footer: z.string().optional(),
  ContactText: z.string().optional(),
  CR: z.string().optional(),
  Tel: z.string().optional(),
  EmailAddress: z.string().optional(),
  ProductsCount: z.coerce.number().int().min(0).optional(),
});

type FormValues = z.infer<typeof schema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecordData = any;

interface Props {
  record: RecordData;
  langId: number;
}

export default function MainPageForm({ record, langId }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [savedOk, setSavedOk] = useState(false);
  const [sloganImgPrev, setSloganImgPrev] = useState<string | null>(record?.SloganImage ?? null);
  const imgRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, setValue, control, formState: { errors } } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        MainTitle: record?.MainTitle ?? "",
        ShortTitle: record?.ShortTitle ?? "",
        Keywords: record?.Keywords ?? "",
        Description: record?.Description ?? "",
        SloganImage: record?.SloganImage ?? "",
        SloganTitle: record?.SloganTitle ?? "",
        Slogan: record?.Slogan ?? "",
        Footer: record?.Footer ?? "",
        ContactText: record?.ContactText ?? "",
        CR: record?.CR ?? "",
        Tel: record?.Tel ?? "",
        EmailAddress: record?.EmailAddress ?? "",
        ProductsCount: record?.ProductsCount ?? 0,
      },
    });

  const onSubmit = async (data: FormValues) => {
    setSaving(true);
    setSavedOk(false);
    setServerError(null);
    try {
      const res = await fetch(`/api/admin/main-page/${langId}`, {
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

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSloganImgPrev(URL.createObjectURL(file));
    setValue("SloganImage", `/images/theme/${file.name}`);
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

        {/* ── عنوان اصلی سایت ── */}
        <Row label="عنوان اصلی سایت">
          <input {...register("MainTitle")} style={inp()} />
        </Row>
        <Hr />

        {/* ── عنوان کوتاه سایت ── */}
        <Row label="عنوان کوتاه سایت">
          <input {...register("ShortTitle")} style={inp()} />
        </Row>
        <Hr />

        {/* ── کلمات کلیدی اصلی ── */}
        <Row label="کلمات کلیدی اصلی">
          <textarea {...register("Keywords")} rows={3}
            style={{ ...inp(), resize: "vertical", fontFamily: "inherit" }} />
        </Row>
        <Hr />

        {/* ── توضیح اصلی سایت ── */}
        <Row label="توضیح اصلی سایت">
          <textarea {...register("Description")} rows={3}
            style={{ ...inp(), resize: "vertical", fontFamily: "inherit" }} />
        </Row>
        <Hr />

        {/* ── تصویر نر (SloganImage) ── */}
        <Row label="تصویر نر" help>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "80px", height: "80px", flexShrink: 0,
              background: "#f5f5f5", borderRadius: "8px",
              border: "1px solid #e8e8e8", overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {sloganImgPrev
                ? <Image src={sloganImgPrev} alt="" width={76} height={76}
                  style={{ objectFit: "contain" }} />
                : <span style={{ fontSize: "28px" }}>🖼️</span>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input type="text" readOnly
                value={sloganImgPrev ? "انتخاب شده" : ""}
                placeholder="No file chosen"
                style={{ ...inp(), width: "200px" }} />
              <button type="button" onClick={() => imgRef.current?.click()} style={chooseBtn}>
                Choose File
              </button>
            </div>
          </div>
          <input ref={imgRef} type="file" accept="image/*"
            style={{ display: "none" }} onChange={handleImgChange} />
        </Row>
        <Hr />

        {/* ── عنوان نر ── */}
        <Row label="عنوان نر">
          <input {...register("SloganTitle")} style={inp()} />
        </Row>
        <Hr />

        {/* ── متن نر (Slogan) ── */}
        <Row label="متن نر">
          <textarea {...register("Slogan")} rows={3}
            style={{ ...inp(), resize: "vertical", fontFamily: "inherit" }} />
        </Row>
        <Hr />

        {/* ── عنوان بخش معرفی کوتاه ── */}
        <Row label="عنوان بخش معرفی کوتاه">
          <input {...register("SloganTitle")} style={inp()} />
        </Row>
        <Hr />

        {/* ── متن معرفی کوتاه (Footer — rich text) ── */}
        <Row label="متن معرفی کوتاه" vertical>
          <Controller
            name="Footer"
            control={control}
            render={({ field }) => (
              <RichEditor value={field.value ?? ""} onChange={field.onChange} minHeight={200} />
            )}
          />
        </Row>
        <Hr />

        {/* ── متن تماس فوتر ── */}
        <Row label="متن تماس فوتر">
          <textarea {...register("ContactText")} rows={3}
            style={{ ...inp(), resize: "vertical", fontFamily: "inherit" }} />
        </Row>
        <Hr />

        {/* ── متن معرفی فوتر ── */}
        <Row label="متن معرفی فوتر">
          <textarea {...register("Keywords")} rows={2}
            style={{ ...inp(), resize: "vertical", fontFamily: "inherit" }} />
        </Row>
        <Hr />

        {/* ── کپی‌رایت ── */}
        <Row label="کپی‌رایت">
          <input {...register("CR")} style={inp()} />
        </Row>
        <Hr />

        {/* ── تلفن ── */}
        <Row label="تلفن">
          <input {...register("Tel")} style={{ ...inp(), direction: "ltr", textAlign: "left", maxWidth: "200px" }} />
        </Row>
        <Hr />

        {/* ── ایمیل ── */}
        <Row label="ایمیل">
          <input {...register("EmailAddress")} type="email"
            style={{ ...inp(), direction: "ltr", textAlign: "left", maxWidth: "300px" }} />
        </Row>
        <Hr />

        {/* ── تعداد محصولات ── */}
        <Row label="تعداد محصولات">
          <input {...register("ProductsCount")} type="number" min={0}
            style={{ ...inp(), maxWidth: "120px" }} />
        </Row>
        <Hr />

        {/* ── Submit ── */}
        <div style={{ padding: "20px 24px" }}>
          {serverError && (
            <div style={{
              background: "#fdecea", color: "#e74c3c",
              padding: "10px 16px", borderRadius: "6px",
              fontSize: "13px", marginBottom: "14px",
            }}>{serverError}</div>
          )}
          {savedOk && (
            <div style={{
              background: "#e8f8f0", color: "#27ae60",
              padding: "10px 16px", borderRadius: "6px",
              fontSize: "13px", marginBottom: "14px",
            }}>تغییرات با موفقیت ذخیره شد.</div>
          )}
          <button type="submit" disabled={saving} style={{
            background: saving ? "#ccc" : "#f90",
            color: "#fff", border: "none",
            padding: "11px 40px", borderRadius: "7px",
            fontSize: "14px", fontWeight: 700,
            cursor: saving ? "not-allowed" : "pointer",
            fontFamily: "inherit",
          }}>
            {saving ? "در حال ذخیره..." : "به روزرسانی"}
          </button>
        </div>
      </div>
    </form>
  );
}

// ── Helper components ────────────────────────────────────────

function Row({ label, help, vertical, children }: {
  label: string;
  help?: boolean;
  vertical?: boolean;
  children: React.ReactNode;
}) {
  if (vertical) {
    return (
      <div style={{ padding: "16px 24px", direction: "rtl" }}>
        <div style={{ fontSize: "12px", color: "#888", marginBottom: "10px", textAlign: "right" }}>
          {label}{help && <HelpIcon />}
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
        width: "180px", flexShrink: 0,
        fontSize: "12px", color: "#888",
        textAlign: "right", paddingTop: "8px",
      }}>
        {label}{help && <HelpIcon />}
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function HelpIcon() {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: "14px", height: "14px", background: "#f90", color: "#fff",
      borderRadius: "50%", fontSize: "9px", fontWeight: 700,
      marginRight: "4px", cursor: "help", verticalAlign: "middle",
    }}>?</span>
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

const chooseBtn: React.CSSProperties = {
  flexShrink: 0, background: "#f0f0f0", color: "#333",
  border: "1px solid #ccc", padding: "7px 14px",
  borderRadius: "4px", fontSize: "12px",
  cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
};
