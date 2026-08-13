"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/AdminPanel/dashboard");
      } else {
        setError(data.message || "خطا در ورود");
      }
    } catch {
      setError("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      direction: "rtl",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "#fff",
        borderRadius: "4px",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}>
        {/* Header */}
        <div style={{ background: "#555", padding: "20px", textAlign: "center" }}>
          <p style={{ color: "#f90", margin: "0 0 6px 0", fontSize: "18px", fontWeight: 600 }}>
            ورود به سیستم
          </p>
          <p style={{ color: "#fff", margin: 0, fontSize: "14px", fontWeight: 500 }}>
            ورود به داشبورد مدیریت سایت دودوتی
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "36px 48px 40px" }}>
          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", textAlign: "center", marginBottom: "32px" }}>
            <Image src="/images/logo.png" alt="دودوتی" width={180} height={70}
              style={{ objectFit: "contain" }} priority />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "#fdecea", border: "1px solid #f5c6cb",
              color: "#e74c3c", padding: "10px 14px", borderRadius: "6px",
              marginBottom: "20px", fontSize: "13px", textAlign: "center",
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: "24px", textAlign: "center" }}>
              <label htmlFor="username" style={{
                display: "block", color: "#555", fontSize: "14px", marginBottom: "8px",
              }}>
                نام کاربری
              </label>
              <input
                id="username" type="text"
                value={username} onChange={(e) => setUsername(e.target.value)}
                required disabled={loading}
                style={{
                  width: "160px", border: "none", borderBottom: "2px solid #f90",
                  outline: "none", fontSize: "14px", padding: "4px 0",
                  textAlign: "center", background: "transparent",
                  color: "#333", direction: "ltr",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "32px", textAlign: "center" }}>
              <label htmlFor="password" style={{
                display: "block", color: "#555", fontSize: "14px", marginBottom: "8px",
              }}>
                کلمه عبور
              </label>
              <input
                id="password" type="password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                required disabled={loading}
                style={{
                  width: "160px", border: "none", borderBottom: "2px solid #ccc",
                  outline: "none", fontSize: "14px", padding: "4px 0",
                  textAlign: "center", background: "transparent",
                  color: "#333", direction: "ltr",
                }}
              />
            </div>

            {/* Submit */}
            <div style={{ textAlign: "center" }}>
              <button
                type="submit" disabled={loading}
                style={{
                  background: loading ? "#ccc" : "#f90",
                  color: "#fff", border: "none", borderRadius: "4px",
                  padding: "12px 48px", fontSize: "16px", fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "inherit", transition: "background 0.2s",
                  minWidth: "120px",
                }}
              >
                {loading ? "در حال ورود..." : "ورود"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
