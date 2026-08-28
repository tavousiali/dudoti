type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type PropType = {
    title: string
    subtitle?: string
    as?: HeadingTag
    className: string
}

export default function PageTitle({
    title,
    subtitle,
    as: Tag = "h1",
    className
}: PropType) {
    return (
        <Tag className={`${className} inline-block text-[30px] font-bold text-black text-right`}>
            {title}
            {subtitle && (
                <span className="mt-1 block text-base font-normal text-black">
                    {subtitle}
                </span>
            )}
            {/* یه bracket قرمز — سمت چپ عنوان (در RTL visually چپ) */}
            <span
                className="block relative top-1 text-[#f92f25] text-[28px]"
                style={{ fontFamily: "icomoon" }}
            >
                {"\ue910"}
            </span>
        </Tag>
    );
}
