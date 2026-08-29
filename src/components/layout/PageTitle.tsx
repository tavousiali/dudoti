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
};

export default function PageTitle({
    title,
    subtitle,
    as: Tag = "h1",
    className = "",
    iconClassName = "text-[#ff2f2f]",
    titleClassName = "text-black",
}: PropType) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* right icon */}
            <span
                className={`shrink-0 text-[30px] ${iconClassName}`}
                style={{ fontFamily: "icomoon" }}
                aria-hidden="true"
            >
                {"\ue90c"}
            </span>

            {/* title + subtitle block */}
            <div>
                <Tag className={`text-[30px] font-bold leading-tight ${titleClassName}`}>
                    {title}
                </Tag>
                {subtitle && (
                    <p className="text-base font-normal text-black">{subtitle}</p>
                )}
            </div>

            {/* left icon */}
            <span
                className={`shrink-0 text-[30px] ${iconClassName}`}
                style={{ fontFamily: "icomoon" }}
                aria-hidden="true"
            >
                {"\ue910"}
            </span>
        </div>
    );
}
