import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer dir="rtl">
            <div className="relative overflow-visible bg-[#f92f25] text-white">

                {/* Divider */}
                <div className="absolute top-12 left-0 right-0 h-px bg-white/70" />

                <div className="relative mx-auto flex flex-col px-5 pt-4 pb-4 sm:px-8 md:max-w-7xl md:flex-row md:justify-end md:px-12">

                    {/* Text */}
                    <div className="w-full md:pl-56">

                        {/* Top menu */}
                        <div className="flex justify-start">
                            <Link
                                href="#"
                                className="text-xs font-bold"
                            >
                                صفحه اصلی
                            </Link>
                        </div>

                        {/* Bottom content */}
                        <div className="mt-8 flex flex-col gap-8 text-right md:grid md:grid-cols-[1fr_1.5fr_1.5fr] md:gap-8">

                            {/* Products */}
                            <div>
                                <h3 className="mb-3 text-xs font-bold">
                                    محصولات
                                </h3>

                                <ul className="space-y-1 text-xs">
                                    <li>
                                        <Link href="#">
                                            سگ
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="#">
                                            گربه
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="#">
                                            جوندگان
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* About */}
                            <div>
                                <h3 className="mb-3 text-xs font-bold">
                                    درباره دودوتی
                                </h3>

                                <p className="text-[11px] leading-5 w-1/2 md:w-60">
                                    غذای تشویقی سگ، غذای تشویقی گربه، غذای تشویقی
                                    جوندگان
                                </p>
                            </div>

                            {/* Contact */}
                            <div>
                                <h3 className="mb-3 text-xs font-bold">
                                    تماس با ما
                                </h3>

                                <p className="text-[11px] leading-5 break-all">
                                    ایمیل:
                                    <br />
                                    dudoticompany@gmail.com
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Hand */}
                    <div className="pointer-events-none flex justify-start absolute bottom-0 left-0 z-20 md:left-0">

                        <div className="relative h-52 w-40 sm:h-48 sm:w-36 md:h-60 md:w-56">

                            <Image
                                src="/images/home/footer-hand.png"
                                alt=""
                                fill
                                priority
                                className="object-contain object-bottom"
                            />

                            <div className="absolute top-[18%] md:top-[10%] text-start ms-8 md:ms-14">
                                <p className="mb-1 text-[9px] font-bold text-[#f92f25] md:mb-2 md:text-[12px]">
                                    FOLLOW US
                                </p>

                                <Link
                                    href="#"
                                    className="text-[#f92f25]"
                                >
                                    <span
                                        style={{ fontFamily: "icomoon" }}
                                        className="text-lg md:text-xl"
                                    >
                                        {"\ue905"}
                                    </span>
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div className="bg-black py-2 text-center text-[10px] text-white">
                کلیه حقوق وب سایت برای شرکت دودوتی محفوظ است.
            </div>
        </footer>
    );
}