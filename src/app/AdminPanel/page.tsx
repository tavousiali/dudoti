"use client";
import { useState } from "react";
import Image from "next/image";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("fa");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle login logic
    console.log({ username, password, language });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        direction: "rtl",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#fff",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header Banner */}
        <div
          style={{
            background: "#555",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#f90",
              margin: "0 0 6px 0",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            ورود به سیستم
          </p>
          <p
            style={{
              color: "#fff",
              margin: 0,
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            ورود به دشبورد مدیریت سایت دودوتی
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: "36px 48px 40px" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <Image
              src="/images/logo.png"
              alt="دودوتی"
              width={180}
              height={70}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: "24px", textAlign: "center" }}>
              <label
                htmlFor="username"
                style={{
                  display: "block",
                  color: "#555",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                نام کاربری
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "160px",
                  border: "none",
                  borderBottom: "2px solid #f90",
                  outline: "none",
                  fontSize: "14px",
                  padding: "4px 0",
                  textAlign: "center",
                  background: "transparent",
                  color: "#333",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "28px", textAlign: "center" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  color: "#555",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                کلمه عبور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "160px",
                  border: "none",
                  borderBottom: "2px solid #ccc",
                  outline: "none",
                  fontSize: "14px",
                  padding: "4px 0",
                  textAlign: "center",
                  background: "transparent",
                  color: "#333",
                }}
              />
            </div>

            {/* Language Selector */}
            <div
              style={{
                marginBottom: "28px",
                textAlign: "center",
                color: "#555",
                fontSize: "14px",
              }}
            >
              <span style={{ marginLeft: "8px" }}>زبان:</span>
              <label style={{ marginLeft: "16px", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="language"
                  value="fa"
                  checked={language === "fa"}
                  onChange={() => setLanguage("fa")}
                  style={{ accentColor: "#f90", marginLeft: "4px" }}
                />
                فارسی
              </label>
              <br />
              <label style={{ marginTop: "8px", display: "inline-block", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="language"
                  value="en"
                  checked={language === "en"}
                  onChange={() => setLanguage("en")}
                  style={{ accentColor: "#f90", marginLeft: "4px" }}
                />
                انگلیسی
              </label>
              <br />
              <label style={{ marginTop: "8px", display: "inline-block", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="language"
                  value="fr"
                  checked={language === "fr"}
                  onChange={() => setLanguage("fr")}
                  style={{ accentColor: "#f90", marginLeft: "4px" }}
                />
                فرانسه
              </label>
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  background: "#f90",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px 48px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "Diodrum, sans-serif",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLButtonElement).style.background = "#e68a00")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLButtonElement).style.background = "#f90")
                }
              >
                ورود
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
