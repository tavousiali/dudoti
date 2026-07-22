type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type PropType = {
    title: string
    as?: HeadingTag
}

export default function PageTitle({
    title,
    as: Tag = "h1",
}: PropType) {
    return (<Tag className="text-[30px] font-bold text-black">
        <span
            className="relative top-2 text-[#ff2f2f]"
            style={{ fontFamily: "icomoon" }}
        >
            {"\ue90c"}
        </span>
        <span className="mx-3">{title}</span>
        <span
            className="relative top-2 text-[#ff2f2f]"
            style={{ fontFamily: "icomoon" }}
        >
            {"\ue910"}
        </span>
    </Tag>)
}