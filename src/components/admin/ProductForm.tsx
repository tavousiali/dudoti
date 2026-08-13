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
  CatId: z.coerce.number().min(1, "دسته‌بندی را انتخاب کنید"),
  ListImageMain: z.string().optional(),   // عکس اصلی لیست
  ListImageOver: z.string().optional(),   // عکس دوم لیست
  OverClass: z.string().optional(),   // نوع نمایش عکس دوم
  Title: z.string().min(1, "عنوان اصلی الزامی است"),
  Lead: z.string().optional(),   // زیرعنوان
  urlTitle: z.string().optional(),   // URL صفحه
  SEOTitle: z.string().optional(),   // عنوان صفحه
  SeoLead: z.string().optional(),   // خلاصه متاتگ
  Icon: z.string().optional(),   // عکس اصلی صفحه (ProductIn)
  Description: z.string().optional(),   // توضیح اصلی (rich)
  Description2: z.string().optional(),   // متن داخل کادر
  Pic2: z.string().optional(),   // عکس داخلی کادر
  Title2: z.string().optional(),   // عنوان بخش مزایا
  Pic1: z.string().optional(),   // عکس مزایا
  SubTitle: z.string().optional(),   // توضیح مزایا (rich)
  Priority: z.coerce.number().int().min(0).default(0),
  Video: z.string().optional(),
  VideoPic: z.string().optional(),
  IsNew: z.boolean().default(false),
  TitleEn: z.string().optional(),
  MainId: z.coerce.number().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Cat {
  Id: number;
  Title: string;
  ParentName: string | null;
  urlTitle: string | null;
  ParentId: number;
}
interface MainCat {
  Id: number;
  Title: string;
  urlTitle: string | null;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProductData = any;

interface Props {
  mode: "add" | "edit";
  product?: ProductData;
  cats: Cat[];
  mainCats: MainCat[];
  defaultCatId?: number;
}

const overClassOptions = ["pr-flv", "pr-img-2", "png", "jpg", "webp"];

export default function ProductForm({ mode, product, cats, mainCats, defaultCatId }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // file previews
  const [listMainPrev, setListMainPrev] = useState<string | null>(product?.ListImageMain ?? null);
  const [listOverPrev, setListOverPrev] = useState<string | null>(product?.ListImageOver ?? null);
  const [iconPrev, setIconPrev] = useState<string | null>(product?.Icon ?? null);
  const [pic2Prev, setPic2Prev] = useState<string | null>(product?.Pic2 ?? null);
  const [pic1Prev, setPic1Prev] = useState<string | null>(product?.Pic1 ?? null);
  const [videoName, setVideoName] = useState<string | null>(product?.Video ? product.Video.split("/").pop() : null);
  const [videoPicName, setVideoPicName] = useState<string | null>(product?.VideoPic ? product.VideoPic.split("/").pop() : null);

  const listMainRef = useRef<HTMLInputElement>(null);
  const listOverRef = useRef<HTMLInputElement>(null);
  const iconRef = useRef<HTMLInputElement>(null);
  const pic2Ref = useRef<HTMLInputElement>(null);
  const pic1Ref = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const videoPicRef = useRef<HTMLInputElement>(null);

  const defaultCat = defaultCatId ?? product?.CatId ?? undefined;
  const defaultMain = product?.MainId ?? (defaultCat ? cats.find((c) => c.Id === defaultCat)?.ParentId : undefined);

  const { register, handleSubmit, setValue, watch, control, formState: { errors } } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        CatId: defaultCat,
        ListImageMain: product?.ListImageMain ?? "",
        ListImageOver: product?.ListImageOver ?? "",
        OverClass: product?.OverClass ?? "pr-flv",
        Title: product?.Title ?? "",
        TitleEn: product?.TitleEn ?? "",
        Lead: product?.Lead ?? "",
        urlTitle: product?.urlTitle ?? "",
        SEOTitle: product?.SEOTitle ?? "",
        SeoLead: product?.SeoLead ?? "",
        Icon: product?.Icon ?? "",
        Description: product?.Description ?? "",
        Description2: product?.Description2 ?? "",
        Pic2: product?.Pic2 ?? "",
        Title2: product?.Title2 ?? "",
        Pic1: product?.Pic1 ?? "",
        SubTitle: product?.SubTitle ?? "",
        Priority: product?.Priority ?? 0,
        Video: product?.Video ?? "",
        VideoPic: product?.VideoPic ?? "",
        IsNew: product?.IsNew ?? false,
        MainId: defaultMain,
      },
    });

  const selectedCatId = watch("CatId");

  const handleCatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cid = Number(e.target.value);
    setValue("CatId", cid);
    const cat = cats.find((c) => c.Id === cid);
    if (cat) {
      setValue("MainId", cat.ParentId);
    }
  };

  const mkImgHandler = (
    prevSetter: (v: string | null) => void,
    field: keyof FormValues
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    prevSetter(URL.createObjectURL(file));
    setValue(field, `/images/products/${file.name}` as never);
  };

  const mkFileHandler = (
    nameSetter: (v: string | null) => void,
    field: keyof FormValues
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    nameSetter(file.name);
    setValue(field, `/images/products/${file.name}` as never);
  };

  const onSubmit = async (data: FormValues) => {
    setSaving(true);
    setServerError(null);
    try {
      const cat = cats.find((c) => c.Id === data.CatId);
      const mc = mainCats.find((m) => m.Id === data.MainId);
      const payload = {
        ...data,
        CatName: cat ? `${mc?.Title ?? ""}: ${cat.Title}` : "",
        MainName: mc?.Title ?? "",
        MainUrlTitle: mc?.urlTitle ?? "",
        urlTitlteCat: cat?.urlTitle ?? "",
        Av: 1,
        Lang: 1,
      };

      const url = mode === "add" ? "/api/admin/products" : `/api/admin/products/${product.Id}`;
      const method = mode === "add" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message ?? "خطای ناشناخته");
      router.push("/AdminPanel/products");
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
        borderRadius: "8px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        overflow: "hidden",
        marginBottom: "20px",
      }}>

        {/* ── 1. دسته ── */}
        <Row label="دسته">
          <select
            value={selectedCatId ?? ""}
            onChange={handleCatChange}
            style={{ ...inp(!!errors.CatId), maxWidth: "400px", cursor: "pointer" }}
          >
            <option value="">— انتخاب کنید —</option>
            {cats.map((c) => (
              <option key={c.Id} value={c.Id}>
                {c.ParentName ? `${c.ParentName}: ` : ""}{c.Title}
              </option>
            ))}
          </select>
          {errors.CatId && <Err>{errors.CatId.message}</Err>}
        </Row>
        <Hr />

        {/* ── 2. عکس اصلی لیست ── */}
        <Row label="بارگذاری عکس اصلی لیست" help>
          <input ref={listMainRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={mkImgHandler(setListMainPrev, "ListImageMain")} />
          <FileRow preview={listMainPrev} onPick={() => listMainRef.current?.click()} />
        </Row>
        <Hr />

        {/* ── 3. عکس دوم لیست ── */}
        <Row label="بارگذاری عکس دوم لیست" help>
          <input ref={listOverRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={mkImgHandler(setListOverPrev, "ListImageOver")} />
          <FileRow preview={listOverPrev} onPick={() => listOverRef.current?.click()} />
        </Row>
        <Hr />

        {/* ── 4. نوع نمایش عکس دوم ── */}
        <Row label="نوع نمایش عکس دوم">
          <select {...register("OverClass")} style={{ ...inp(), maxWidth: "200px", cursor: "pointer" }}>
            {overClassOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Row>
        <Hr />

        {/* ── 5. عنوان اصلی ── */}
        <Row label="عنوان اصلی" required>
          <input {...register("Title")} style={inp(!!errors.Title)} />
          {errors.Title && <Err>{errors.Title.message}</Err>}
        </Row>
        <Hr />

        {/* ── 6. عنوان انگلیسی ── */}
        <Row label="عنوان انگلیسی">
          <input {...register("TitleEn")} style={{ ...inp(), direction: "ltr", textAlign: "left" }} />
        </Row>
        <Hr />

        {/* ── 7. زیرعنوان (lead) ── */}
        <Row label="زیرعنوان">
          <input {...register("Lead")} style={inp()} />
        </Row>
        <Hr />

        {/* ── 8. URL صفحه ── */}
        <Row label="URL صفحه">
          <input {...register("urlTitle")} style={{ ...inp(), direction: "ltr", textAlign: "left" }} />
        </Row>
        <Hr />

        {/* ── 9. عنوان صفحه ── */}
        <Row label="عنوان صفحه">
          <input {...register("SEOTitle")} style={inp()} />
        </Row>
        <Hr />

        {/* ── 10. خلاصه متاتگ ── */}
        <Row label="خلاصه (متاتگ)">
          <textarea {...register("SeoLead")} rows={2}
            style={{ ...inp(), resize: "vertical", fontFamily: "inherit" }} />
        </Row>
        <Hr />

        {/* ── 11. عکس اصلی صفحه (Icon/ProductIn) ── */}
        <Row label="بارگذاری عکس اصلی صفحه" help>
          <input ref={iconRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={mkImgHandler(setIconPrev, "Icon")} />
          <FileRow preview={iconPrev} onPick={() => iconRef.current?.click()} />
        </Row>
        <Hr />

        {/* ── 12. توضیح اصلی (rich text) ── */}
        <Row label="توضیح اصلی" vertical>
          <Controller
            name="Description"
            control={control}
            render={({ field }) => (
              <RichEditor value={field.value ?? ""} onChange={field.onChange} minHeight={220} />
            )}
          />
        </Row>
        <Hr />

        {/* ── 13. متن داخل کادر ── */}
        <Row label="متن داخل کادر">
          <input {...register("Description2")} style={inp()} />
        </Row>
        <Hr />

        {/* ── 14. عکس داخلی کادر (Pic2) ── */}
        <Row label="بارگذاری عکس داخلی کادر" help>
          <input ref={pic2Ref} type="file" accept="image/*" style={{ display: "none" }}
            onChange={mkImgHandler(setPic2Prev, "Pic2")} />
          <FileRow preview={pic2Prev} onPick={() => pic2Ref.current?.click()} />
        </Row>
        <Hr />

        {/* ── 15. عنوان بخش مزایا (Title2) ── */}
        <Row label="عنوان بخش پایین (مزایا)">
          <input {...register("Title2")} style={inp()} />
        </Row>
        <Hr />

        {/* ── 16. عکس مزایا (Pic1 = ListImageMain از دیتا) ── */}
        <Row label="بارگذاری عکس پایین (مزایا)" help>
          <input ref={pic1Ref} type="file" accept="image/*" style={{ display: "none" }}
            onChange={mkImgHandler(setPic1Prev, "Pic1")} />
          <FileRow preview={pic1Prev} onPick={() => pic1Ref.current?.click()} />
        </Row>
        <Hr />

        {/* ── 17. توضیح مزایا (SubTitle → rich text) ── */}
        <Row label="توضیح بخش پایین (مزایا)" vertical>
          <Controller
            name="SubTitle"
            control={control}
            render={({ field }) => (
              <RichEditor value={field.value ?? ""} onChange={field.onChange} minHeight={180} />
            )}
          />
        </Row>
        <Hr />

        {/* ── 18. اولویت ── */}
        <Row label="اولویت">
          <input {...register("Priority")} type="number" min={0}
            style={{ ...inp(), width: "100px" }} />
        </Row>
        <Hr />

        {/* ── 19. ویدیو ── */}
        <Row label="بارگذاری ویدیو" help>
          <input ref={videoRef} type="file" accept="video/*" style={{ display: "none" }}
            onChange={mkFileHandler(setVideoName, "Video")} />
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input type="text" readOnly value={videoName ?? ""} placeholder="No file chosen"
              style={{ ...inp(), maxWidth: "300px" }} />
            <button type="button" onClick={() => videoRef.current?.click()} style={chooseBtn}>
              Choose File
            </button>
          </div>
        </Row>
        <Hr />

        {/* ── 20. پوستر ویدیو ── */}
        <Row label="بارگذاری پوستر ویدیو" help>
          <input ref={videoPicRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={mkFileHandler(setVideoPicName, "VideoPic")} />
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input type="text" readOnly value={videoPicName ?? ""} placeholder="No file chosen"
              style={{ ...inp(), maxWidth: "300px" }} />
            <button type="button" onClick={() => videoPicRef.current?.click()} style={chooseBtn}>
              Choose File
            </button>
          </div>
        </Row>
        <Hr />

        {/* ── 21. نمایش صفحه اول ── */}
        <Row label="">
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer" }}>
            <input type="checkbox" {...register("IsNew")}
              style={{ width: "15px", height: "15px", accentColor: "#f90" }} />
            نمایش صفحه اول
          </label>
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
          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" disabled={saving} style={{
              background: saving ? "#ccc" : "#f90",
              color: "#fff", border: "none",
              padding: "11px 36px", borderRadius: "6px",
              fontSize: "14px", fontWeight: 700,
              cursor: saving ? "not-allowed" : "pointer",
              fontFamily: "inherit",
            }}>
              {saving ? "در حال ذخیره..." : mode === "add" ? "افزودن محصول" : "ویرایش شود"}
            </button>
            <button type="button" onClick={() => router.back()} style={{
              background: "#fff", color: "#666",
              border: "1px solid #ddd",
              padding: "11px 24px", borderRadius: "6px",
              fontSize: "14px", cursor: "pointer", fontFamily: "inherit",
            }}>
              انصراف
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

// ── Helper components ────────────────────────────────────────

function Row({
  label, required, help, vertical, children,
}: {
  label: string;
  required?: boolean;
  help?: boolean;
  vertical?: boolean;
  children: React.ReactNode;
}) {
  if (vertical) {
    return (
      <div style={{ padding: "16px 24px", direction: "rtl" }}>
        <div style={{ fontSize: "12px", color: "#888", marginBottom: "8px", textAlign: "right" }}>
          {required && <span style={{ color: "#e74c3c", marginLeft: "3px" }}>*</span>}
          {label}
          {help && <HelpIcon />}
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
        width: "200px", flexShrink: 0,
        fontSize: "12px", color: "#888",
        textAlign: "right", paddingTop: "8px",
      }}>
        {required && <span style={{ color: "#e74c3c", marginLeft: "3px" }}>*</span>}
        {label}
        {help && <HelpIcon />}
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

function Err({ children }: { children: React.ReactNode }) {
  return <p style={{ color: "#e74c3c", fontSize: "11px", margin: "4px 0 0" }}>{children}</p>;
}

function FileRow({ preview, onPick }: { preview: string | null; onPick: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      {/* preview */}
      <div style={{
        width: "60px", height: "60px", flexShrink: 0,
        background: "#f5f5f5", borderRadius: "6px",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", border: "1px solid #e8e8e8",
      }}>
        {preview
          ? <Image src={preview} alt="" width={56} height={56} style={{ objectFit: "contain" }} />
          : <span style={{ fontSize: "22px" }}>🖼️</span>}
      </div>
      {/* input */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="text" readOnly value={preview ? "انتخاب شده" : ""}
          placeholder="No file chosen" style={{ ...inp(), width: "180px" }} />
        <button type="button" onClick={onPick} style={chooseBtn}>Choose File</button>
      </div>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────
const inp = (err = false): React.CSSProperties => ({
  width: "100%",
  padding: "8px 12px",
  border: `1px solid ${err ? "#e74c3c" : "#e0e0e0"}`,
  borderRadius: "5px",
  fontSize: "13px",
  color: "#333",
  background: "#fafafa",
  fontFamily: "inherit",
  boxSizing: "border-box",
  outline: "none",
});

const chooseBtn: React.CSSProperties = {
  flexShrink: 0,
  background: "#f0f0f0",
  color: "#333",
  border: "1px solid #ccc",
  padding: "7px 14px",
  borderRadius: "4px",
  fontSize: "12px",
  cursor: "pointer",
  fontFamily: "inherit",
  whiteSpace: "nowrap",
};
