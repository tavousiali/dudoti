"use client";

import Image from "next/image";
import { useState } from "react";

const characters = [
  {
    id: "cat",
    name: "پیشچِنکو",
    bg: "#00c9e9",
    img1: "/images/about/cat-1.png",
    img2: "/images/about/cat-2.png",
    desc: `تا حالا دیدین یا شنیدین که یه گربه بامرام باشه؟
اگه می‌گید نه، یعنی هنوز افتخار آشنایی با پیشچنکوی ما رو پیدا نکردین. رفیق‌باز‌ترین، خاکی‌ترین، معاشرتی‌‌ترین و در عین حال خالی‌بند‌ترین رفیقی که می‌تونید داشته‌باشید، این گربه‌ی خوشگله. از ماجراجویی و دَدَری بودنش که دیگه نگم براتون. اصلا سرش درد می‌کنه برای ماجرا و دردسر. تو زندگیش فقط از یه چیز میترسه، اون هم موشه! راستی حواستون باشه سر فوتبال باهاش کل‌کل نکنین، ممکنه با اعتماد به سقف و حاضر جوابیش بدجوری بچزونتتون. ولی غم به دلتون راه ندین، اینقدر بامرامه که در کسری از ثانیه از دلتون در‌میاره.`,
  },
  {
    id: "dog",
    name: "یایوبی",
    bg: "#c19ade",
    img1: "/images/about/dog-1.png",
    img2: "/images/about/dog-2.png",
    desc: `خدمتتون عرض شود که ایشون یایوبی هستن، یه سگ روشن‌فکر، شاعرمسلک و خیلی باهوش. علاقه‌ی اصلی یایوبی موسیقیه، همیشه یا در حال آهنگ گوش دادنه یا آوازخوندن یا ساز زدن. البته بین خودمون باشه، درباره‌ی صداش بهتره نه ما حرفی بزنیم و نه خودتون بشنوین. یایوبی همیشه قرتی و آلامده و سیاژ عطرش دل و دین میبره. وسواسی هم هست و خیلی باید حواس جمع باشیم که شلختگی و بی‌سلیقگی نکنیم، آخه خیلی هم غرغرو و زودرنجه. یعنی اگه بیفته رو خط غرزدن دیگه توقف نداره. با این همه، موجودی بسیار دوست‌داشتنیه و اگه با کسی دوست بشه تو رفاقت کم نمیزاره.`,
  },
  {
    id: "rabbit",
    name: "افلادون",
    bg: "#00bda4",
    img1: "/images/about/rabbit-1.png",
    img2: "/images/about/rabbit-2.png",
    desc: `افلادون یکی از بی‌ریا‌ترین خرگوش‌هاییه که ممکنه تو زندگیتون باهاش آشنا بشید. این بچه عین کف دست بی‌غشه و محاله بهش علاقمند نشید. مجموعه‌ی علاقمندی‌های افلادون خیلی وسیعه: از خواب و خور و گُل گرفته تا هنر و فلسفه و حرف‌های قلنبه‌سلنبه. البته ناگفته نمونه که یه‌کم خرافاتی هم هست، هرچند خودش تکذیب می‌کنه، ولی خب! به پیشونی بلندش خیلی می‌نازه. قبل از هر تصمیم مهمی فال می‌گیره و دائما داره تق‌تق می‌کوبه به چوب. راستی افلادون از اون جنس موجوداتیه که دربارشون می‌گن دست‌شون به کم نمیره. خلاصه، این گوش دازِ خپل این‌قدر مهربونه که در دم دلتون رو اسیرِ خودش می‌کنه.`,
  },
];

export default function AboutCharacters() {
  const [active, setActive] = useState(0);

  const current = characters[active];
  const prev = () => setActive((i) => (i - 1 + characters.length) % characters.length);
  const next = () => setActive((i) => (i + 1) % characters.length);

  return (
    <section
      dir="rtl"
      className="relative min-h-[40vw] flex items-center justify-center py-[90px] transition-colors duration-500"
      style={{ backgroundColor: current.bg }}
    >
      <div className="w-full max-w-screen-xl mx-auto px-5 md:px-16">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

          {/* ── عکس شخصیت ── */}
          <div className="w-full md:w-[300px] shrink-0 flex justify-center">
            <div className="relative w-[240px] h-[320px] md:w-[300px] md:h-[400px]">
              <Image
                key={current.id + "-1"}
                src={current.img1}
                alt={current.name}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* ── متن ── */}
          <div className="flex-1 text-center md:text-right">
            {/* اسم شخصیت */}
            <h2 className="relative inline-block text-[36px] font-bold text-white mb-6">
              <span
                aria-hidden="true"
                className="absolute right-full top-1/2 -translate-y-1/2 mr-3 text-[40px] text-white leading-none"
                style={{ fontFamily: "icomoon" }}
              >
                {"\ue910"}
              </span>
              {current.name}
              <span
                aria-hidden="true"
                className="absolute left-full top-1/2 -translate-y-1/2 ml-3 text-[40px] text-white leading-none"
                style={{ fontFamily: "icomoon" }}
              >
                {"\ue90c"}
              </span>
            </h2>

            <p className="text-[15px] md:text-[17px] leading-9 text-white whitespace-pre-line">
              {current.desc}
            </p>
          </div>

        </div>

        {/* ── دکمه‌های ناوبری ── */}
        <div className="flex justify-center items-center gap-8 mt-10">
          <button
            onClick={next}
            aria-label="بعدی"
            className="text-white text-[40px] leading-none transition-transform hover:scale-125 hover:text-black"
            style={{ fontFamily: "icomoon" }}
          >
            {"\ue910"}
          </button>

          {/* dots */}
          <div className="flex gap-3">
            {characters.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                aria-label={c.name}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === active ? "bg-white scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={prev}
            aria-label="قبلی"
            className="text-white text-[40px] leading-none transition-transform hover:scale-125 hover:text-black"
            style={{ fontFamily: "icomoon" }}
          >
            {"\ue90c"}
          </button>
        </div>
      </div>
    </section>
  );
}
