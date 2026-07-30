"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteUserButton({
  id,
  username,
}: {
  id: number;
  username: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`آیا مطمئن هستید که می‌خواهید کاربر "${username}" را حذف کنید؟`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        router.refresh();
      } else {
        alert(data.message || "خطا در حذف کاربر");
      }
    } catch {
      alert("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{
        background: "none",
        border: "none",
        color: "#e74c3c",
        cursor: loading ? "not-allowed" : "pointer",
        fontWeight: 500,
        fontSize: "13px",
        fontFamily: "Diodrum, sans-serif",
        opacity: loading ? 0.6 : 1,
        padding: 0,
      }}
    >
      {loading ? "در حال حذف..." : "حذف"}
    </button>
  );
}
