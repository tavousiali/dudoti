import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer dir="rtl">
            <div className="relative overflow-hidden bg-[#f92f25] text-white">

                {/* Divider */}
                <div className="absolute mt-16 left-0 right-0 h-px bg-white/70 z-0" />

                <div className="relative z-10 mx-auto flex min-h-80 max-w-7xl items-start justify-end px-5 pt-6 pb-4 sm:px-8 lg:px-12">

                    {/* Text */}
                    <div className="flex w-full flex-col items-end pl-32 md:pl-56">
                        <div className="grid w-full max-w-xl gap-8 text-right md:grid-cols-3">

                            <div>
                                <Link
                                    href="#"
                                    className="text-xs font-bold"
                                >
                                    صفحه اصلی
                                </Link>
                            </div>

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

                                <h3 className="mt-6 mb-3 text-xs font-bold">
                                    درباره دودوتی
                                </h3>

                                <p className="text-[11px] leading-5">
                                    غذای تشویقی سگ، غذای تشویقی گربه، غذای تشویقی
                                    جوندگان
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xs font-bold">
                                    تماس با ما
                                </h3>

                                <p className="text-[11px] leading-5">
                                    ایمیل: dudoticompany@gmail.com
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Hand */}
                    <div className="absolute bottom-0 left-0 z-20">
                        <div className="relative h-52 w-40 md:h-72 md:w-56">
                            <Image
                                src="/images/home/footer-hand.png"
                                alt=""
                                fill
                                priority
                                className="object-contain object-bottom"
                            />

                            <div className="absolute top-9 text-start ms-8">
                                <p className="mb-2 text-[10px] font-bold text-[#f92f25]">
                                    FOLLOW US
                                </p>

                                <Link
                                    href="#"
                                    className="text-[#f92f25]"
                                >
                                    <span style={{ fontFamily: "icomoon" }} className="text-xl">
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