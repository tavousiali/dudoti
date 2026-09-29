import Image from "next/image";
import Link from "next/link";
import type { Locale } from "./LocaleContext";

export interface FooterCategory {
    Id: number;
    Title: string;
    urlTitle: string | null;
}

interface Props {
    locale: Locale;
    categories: FooterCategory[];
}

const t = {
    fa: {
        home: "صفحه اصلی",
        products: "محصولات",
        about: "درباره دودوتی",
        aboutDesc: "غذای تشویقی سگ، غذای تشویقی گربه، غذای تشویقی جوندگان",
        contact: "تماس با ما",
        copyright: "کلیه حقوق وب سایت برای شرکت دودوتی محفوظ است.",
        email: "ایمیل",
    },
    en: {
        home: "Home",
        products: "Products",
        about: "About Dudoti",
        aboutDesc: "Dog treats, cat treats, and rodent products",
        contact: "Contact Us",
        copyright: "All rights reserved for Dudoti Company.",
        email: "Email",
    },
    fr: {
        home: "Accueil",
        products: "Produits",
        about: "À propos de Dudoti",
        aboutDesc: "Friandises pour chiens, chats et rongeurs",
        contact: "Contactez-nous",
        copyright: "Tous droits réservés à la société Dudoti.",
        email: "E-mail",
    },
} as const;

function localePath(locale: Locale, path: string): string {
    if (locale === "fa") return path;
    return `/${locale}${path === "/" ? "" : path}`;
}

export default function Footer({ locale, categories }: Props) {
    const dir = locale === "fa" ? "rtl" : "ltr";
    const tr = t[locale];
    const lp = (path: string) => localePath(locale, path);

    return (
        <footer dir={dir}>
            <div className="relative overflow-visible bg-[#f92f25] text-white">

                {/* Divider */}
                <div className="absolute top-12 left-0 right-0 h-px bg-white/70" />

                <div
                    className="relative mx-auto flex flex-col px-5 pt-4 pb-4 sm:px-8 md:max-w-7xl md:flex-row md:px-12"
                    style={{ justifyContent: dir === "ltr" ? "flex-start" : "flex-end" }}
                >
                    {/* Text */}
                    <div
                        className="w-full"
                        style={dir === "ltr" ? { paddingRight: "14rem" } : { paddingLeft: "14rem" }}
                    >
                        {/* Top menu */}
                        <div className="flex justify-start">
                            <Link href={lp("/")} className="text-xs font-bold">
                                {tr.home}
                            </Link>
                        </div>

                        {/* Bottom content */}
                        <div
                            className="mt-8 flex flex-col gap-8 md:grid md:grid-cols-[1fr_1.5fr_1.5fr] md:gap-8"
                            style={{ textAlign: dir === "ltr" ? "left" : "right" }}
                        >
                            {/* Products */}
                            <div>
                                <h3 className="mb-3 text-xs font-bold">{tr.products}</h3>
                                <ul className="space-y-1 text-xs">
                                    {categories.map((cat) => (
                                        <li key={cat.Id}>
                                            <Link href={cat.urlTitle ? lp(`/${cat.urlTitle}`) : "#"}>
                                                {cat.Title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* About */}
                            <div>
                                <h3 className="mb-3 text-xs font-bold">
                                    <Link href={lp("/about")} className="hover:underline">
                                        {tr.about}
                                    </Link>
                                </h3>
                                <p className="text-[11px] leading-5 w-1/2 md:w-60">
                                    {tr.aboutDesc}
                                </p>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className="mb-3 text-xs font-bold">
                                    <Link href={lp("/contact")} className="hover:underline">
                                        {tr.contact}
                                    </Link>
                                </h3>
                                <p className="text-[11px] leading-5 break-all">
                                    {tr.email}:
                                    <br />
                                    dudoticompany@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hand */}
                    <div
                        className="pointer-events-none flex justify-start absolute bottom-0 z-20"
                        style={dir === "ltr" ? { right: 0 } : { left: 0 }}
                    >
                        <div
                            className="relative h-52 w-40 sm:h-48 sm:w-36 md:h-60 md:w-56"
                            style={dir === "ltr" ? { transform: "scaleX(-1)" } : undefined}
                        >
                            <Image
                                src="/images/home/footer-hand.png"
                                alt=""
                                fill
                                priority
                                className="object-contain object-bottom"
                            />
                            <div
                                className={`absolute top-[18%] md:top-[10%] ms-8 ${dir === "ltr" ? "md:ms-26 text-end" : "md:ms-14 text-start"}`}
                                style={dir === "ltr" ? { transform: "scaleX(-1)" } : undefined}
                            >
                                <p className="mb-1 text-[9px] font-bold text-[#f92f25] md:mb-2 md:text-[12px]">
                                    FOLLOW US
                                </p>
                                <Link href="#" className="text-[#f92f25]">
                                    <span style={{ fontFamily: "icomoon" }} className="text-lg md:text-xl">
                                        {"\ue905"}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black py-2 text-center text-[10px] text-white">
                {tr.copyright}
            </div>
        </footer>
    );
}
