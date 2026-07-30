"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type UserFormData = {
  username: string;
  password: string;
  name: string;
  email: string;
  active: boolean;
  semat: string;
  type: number;
  pic: string;
  branchId: string;
  branchName: string;
};

type Props = {
  mode: "create" | "edit";
  userId?: number;
  initialData?: Partial<UserFormData>;
};

const defaultData: UserFormData = {
  username: "",
  password: "",
  name: "",
  email: "",
  active: true,
  semat: "",
  type: 1,
  pic: "",
  branchId: "",
  branchName: "",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #ddd",
  borderRadius: "6px",
  padding: "9px 12px",
  fontSize: "13px",
  outline: "none",
  fontFamily: "Diodrum, sans-serif",
  color: "#333",
  background: "#fafafa",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 500,
  color: "#555",
  marginBottom: "6px",
};

const fieldStyle: React.CSSProperties = {
  marginBottom: "20px",
};

export default function UserForm({ mode, userId, initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<UserFormData>({
    ...defaultData,
    ...initialData,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "type"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url =
        mode === "create"
          ? "/api/admin/users"
          : `/api/admin/users/${userId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const payload = { ...form };
      // در حالت edit اگر پسورد خالی بود نمی‌فرستیم
      if (mode === "edit" && !payload.password) {
        delete (payload as Partial<UserFormData>).password;
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/AdminPanel/dashboard/users");
        router.refresh();
      } else {
        setError(data.message || "خطایی رخ داد");
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
      {error && (
        <div
          style={{
            background: "#fdecea",
            border: "1px solid #f5c6cb",
            color: "#e74c3c",
            padding: "10px 14px",
            borderRadius: "6px",
            marginBottom: "20px",
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}

      {/* Row: username + name */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="username">
            نام کاربری <span style={{ color: "#e74c3c" }}>*</span>
          </label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="مثال: admin"
            dir="ltr"
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="name">
            نام <span style={{ color: "#e74c3c" }}>*</span>
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="نام کامل"
          />
        </div>
      </div>

      {/* Password */}
      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="password">
          کلمه عبور{" "}
          {mode === "create" && <span style={{ color: "#e74c3c" }}>*</span>}
          {mode === "edit" && (
            <span style={{ color: "#aaa", fontWeight: 400, fontSize: "12px" }}>
              (خالی بگذارید تا تغییر نکند)
            </span>
          )}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required={mode === "create"}
          style={inputStyle}
          placeholder="••••••••"
          dir="ltr"
        />
      </div>

      {/* Email */}
      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="email">
          ایمیل
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
          placeholder="example@email.com"
          dir="ltr"
        />
      </div>

      {/* Row: semat + branchName */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="semat">
            سمت
          </label>
          <input
            id="semat"
            name="semat"
            value={form.semat}
            onChange={handleChange}
            style={inputStyle}
            placeholder="مثال: مدیر"
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="branchName">
            نام شعبه
          </label>
          <input
            id="branchName"
            name="branchName"
            value={form.branchName}
            onChange={handleChange}
            style={inputStyle}
            placeholder="مثال: شعبه اصلی"
          />
        </div>
      </div>

      {/* Row: branchId + type */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="branchId">
            شناسه شعبه
          </label>
          <input
            id="branchId"
            name="branchId"
            type="number"
            value={form.branchId}
            onChange={handleChange}
            style={inputStyle}
            placeholder="مثال: 1"
            dir="ltr"
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="type">
            نوع کاربر
          </label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            style={{ ...inputStyle }}
          >
            <option value={1}>ادمین</option>
            <option value={2}>کاربر</option>
          </select>
        </div>
      </div>

      {/* Pic */}
      <div style={fieldStyle}>
        <label style={labelStyle} htmlFor="pic">
          آدرس تصویر پروفایل
        </label>
        <input
          id="pic"
          name="pic"
          value={form.pic}
          onChange={handleChange}
          style={inputStyle}
          placeholder="/Images/User/User_1.jpg"
          dir="ltr"
        />
      </div>

      {/* Active toggle */}
      <div style={{ ...fieldStyle, display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          id="active"
          name="active"
          type="checkbox"
          checked={form.active}
          onChange={handleChange}
          style={{ width: "16px", height: "16px", accentColor: "#f90", cursor: "pointer" }}
        />
        <label
          htmlFor="active"
          style={{ ...labelStyle, margin: 0, cursor: "pointer" }}
        >
          کاربر فعال باشد
        </label>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#ccc" : "#f90",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "10px 32px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "Diodrum, sans-serif",
            transition: "background 0.2s",
          }}
        >
          {loading ? "در حال ذخیره..." : mode === "create" ? "افزودن کاربر" : "ذخیره تغییرات"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            background: "transparent",
            color: "#888",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "10px 24px",
            fontSize: "14px",
            cursor: "pointer",
            fontFamily: "Diodrum, sans-serif",
          }}
        >
          انصراف
        </button>
      </div>
    </form>
  );
}
