"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  title: string;
}

export default function DeleteCategoryButton({ id, title }: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    if (!confirm(`آیا از حذف "${title}" مطمئن هستید؟`)) return;

    startTransition(async () => {
      const res = await fetch(`/api/admin/product-categories/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        router.refresh();
      } else {
        alert(json.message ?? "خطا در حذف");
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        background: pending ? "#f5f5f5" : "#fdecea",
        color: pending ? "#aaa" : "#e74c3c",
        border: "none",
        padding: "5px 12px",
        borderRadius: "6px",
        fontSize: "13px",
        fontWeight: 500,
        cursor: pending ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        whiteSpace: "nowrap",
      }}
    >
      {pending ? "در حال حذف..." : "🗑️ حذف"}
    </button>
  );
}
