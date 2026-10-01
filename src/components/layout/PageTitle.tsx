"use client";

import { ReactNode } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type PropType = {
    title: ReactNode;
    subtitle?: ReactNode;
    as?: HeadingTag;
    className?: string;
    /** Override colour of the two decorative icons, e.g. "text-white" */
    iconClassName?: string;
    /** Override text colour of the title, e.g. "text-white" */
    titleClassName?: string;
    /** Kept for API compatibility — no longer used internally */
    dir?: "rtl" | "ltr";
};

/**
 * PageTitle renders a heading flanked by two icomoon arrow icons that
 * always point *inward* toward the title, regardless of page direction.
 *
 * Direction is read purely from CSS: the `dir="ltr"` attribute on <body>
 * (set server-side by each locale's layout) drives a CSS selector that
 * mirrors the icons via scaleX(-1). This means the correct orientation is
 * painted on the very first server render — no JS context or hydration needed.
 *
 * RTL  →  ❮  title  ❯   (default, no transform)
 * LTR  →  ❯  title  ❮   (icons mirrored via CSS when body[dir=ltr] ancestor)
 */
export default function PageTitle({
    title,
    subtitle,
    as: Tag = "h1",
    className = "",
    iconClassName = "text-[#ff2f2f]",
    titleClassName = "text-black",
}: PropType) {
    // The icon spans carry a data-icon attribute so we can target them in CSS
    // as a fallback. Primary mechanism: Tailwind arbitrary variant below.
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Left icon: \ue90c points left in RTL (inward). Flip on LTR. */}
            <span
                className={`page-title-icon shrink-0 text-[30px] ${iconClassName}`}
                style={{ fontFamily: "icomoon" }}
                aria-hidden="true"
            >
                {"\ue90c"}
            </span>

            {/* title + optional subtitle */}
            <div>
                <Tag className={`text-[22px] md:text-[30px] font-bold leading-tight ${titleClassName}`}>
                    {title}
                </Tag>
                {subtitle && (
                    <p className="text-[16px] font-normal text-black">{subtitle}</p>
                )}
            </div>

            {/* Right icon: \ue910 points right in RTL (inward). Flip on LTR. */}
            <span
                className={`page-title-icon shrink-0 text-[30px] ${iconClassName}`}
                style={{ fontFamily: "icomoon" }}
                aria-hidden="true"
            >
                {"\ue910"}
            </span>
        </div>
    );
}
