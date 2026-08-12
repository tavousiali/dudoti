"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export default function RichEditor({ value, onChange, placeholder, minHeight = 200 }: Props) {
  const modules = useMemo(() => ({
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }, { align: [] }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  }), []);

  return (
    <div style={{ direction: "ltr" }}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        style={{ minHeight: `${minHeight}px`, fontFamily: "inherit" }}
      />
    </div>
  );
}
