"use client";

import { ReactNode } from "react";
import { useLocale } from "@/components/layout/LocaleContext";

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
};

// RTL: ❮ title ❯   (e90c … e910)
// LTR: ❯ title ❮   (e910 … e90c)  — icons swapped so they point inward
const ICON_LEFT_RTL = "\ue90c";
const ICON_RIGHT_RTL = "\ue910";
const ICON_LEFT_LTR = "\ue910";
const ICON_RIGHT_LTR = "\ue90c";

export default function PageTitle({
    title,
    subtitle,
    as: Tag = "h1",
    className = "",
    iconClassName = "text-[#ff2f2f]",
    titleClassName = "text-black",
}: PropType) {
    const { dir } = useLocale();
    const isRtl = dir === "rtl";

    const iconLeft = isRtl ? ICON_LEFT_RTL : ICON_LEFT_LTR;
    const iconRight = isRtl ? ICON_RIGHT_RTL : ICON_RIGHT_LTR;

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* left icon */}
            <span
                className={`shrink-0 text-[30px] ${iconClassName}`}
                style={{ fontFamily: "icomoon" }}
                aria-hidden="true"
            >
                {iconLeft}
            </span>

            {/* title + subtitle */}
            <div>
                <Tag className={`text-[30px] font-bold leading-tight ${titleClassName}`}>
                    {title}
                </Tag>
                {subtitle && (
                    <p className="text-base font-normal text-black">{subtitle}</p>
                )}
            </div>

            {/* right icon */}
            <span
                className={`shrink-0 text-[30px] ${iconClassName}`}
                style={{ fontFamily: "icomoon" }}
                aria-hidden="true"
            >
                {iconRight}
            </span>
        </div>
    );
}
