"use client";

import { useTransition } from "react";

interface Props {
  id: number;
  title: string;
  action: () => Promise<void>;
}

export default function DeleteCategoryButton({ id, title, action }: Props) {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm(`آیا از حذف "${title}" مطمئن هستید؟`)) return;
    startTransition(() => action());
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
