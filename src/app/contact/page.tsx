import Button from "@/components/layout/Button";
import PageTitle from "@/components/layout/PageTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تماس با ما | دودوتی",
  alternates: {
    canonical: "https://dudoti.com/contact/",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white" dir="rtl">
      <div className="mx-auto max-w-[1140px] px-4 py-10 md:py-16">

        {/* Extra top spacing to make room for the dog ::before */}
        <div className="pt-44">

          {/* Beige card — dog peeking via ::before pseudo-element */}
          <div className="contact-con rounded-3xl bg-[#f9e0a4] px-6 py-10 sm:px-10 sm:py-12 md:px-14">

            <PageTitle title="تماس با ما" as="h1" className="mb-8" />

            <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">


              {/* ── Right column: Contact info ── */}
              <div className="flex shrink-0 flex-col items-start gap-4 md:w-64 lg:w-72">


                <div className="mt-2 text-right">
                  <p className="mb-2 text-sm font-semibold text-gray-700">
                    اطلاعات تماس
                  </p>
                  <p className="text-sm text-gray-700">
                    ایمیل:{" "}
                    <a
                      href="mailto:dudoticompany@gmail.com"
                      className="font-medium text-gray-800 transition-opacity hover:opacity-70"
                      dir="ltr"
                    >
                      dudoticompany@gmail.com
                    </a>
                  </p>
                </div>

              </div>

              {/* ── Left column: Form ── */}
              <div className="flex flex-1 flex-col gap-4">

                {/* Name */}
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی *"
                  className="w-full rounded-full bg-white px-6 py-3 text-sm text-right text-gray-700 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#ff2f2f]/30"
                />

                {/* Phone */}
                <input
                  type="tel"
                  placeholder="تلفن تماس *"
                  className="w-full rounded-full bg-white px-6 py-3 text-sm text-right text-gray-700 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#ff2f2f]/30"
                />

                {/* Message */}
                <textarea
                  placeholder="متن پیام *"
                  rows={5}
                  className="w-full resize-none rounded-2xl bg-white px-6 py-4 text-sm text-right text-gray-700 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#ff2f2f]/30"
                />

                {/* Submit button */}
                <div className="flex justify-end">
                  <Button text="ارسال" />
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
