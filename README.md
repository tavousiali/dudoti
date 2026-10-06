# دودوتی (Dudoti)

سایت شرکتی دودوتی با Next.js 16، Prisma و دیتابیس Turso (libSQL).
سه زبانه (فارسی، انگلیسی، فرانسوی) و دارای پنل مدیریت.

سایت زنده: https://dudoti.vercel.app

---

## راه‌اندازی روی کامپیوتر شخصی

### پیش‌نیازها

- [Node.js](https://nodejs.org) نسخه ۱۸ یا بالاتر
- یک حساب [Turso](https://turso.tech) (رایگان) برای دیتابیس

### ۱. دانلود پروژه

```powershell
git clone https://github.com/tavousiali/dudoti.git
cd dudoti
```

### ۲. ساخت فایل `.env`

در ریشه‌ی پروژه یک فایل به نام `.env` بساز و این مقادیر را داخلش قرار بده:

```
TURSO_DATABASE_URL="libsql://آدرس-دیتابیس-شما.turso.io"
TURSO_AUTH_TOKEN="توکن-دیتابیس-شما"
DATABASE_URL="libsql://آدرس-دیتابیس-شما.turso.io"
```

این مقادیر را از پنل Turso (بخش Settings دیتابیس) بگیر.

> **نکته:** این فایل را هرگز در Git commit نکن. از قبل در `.gitignore` قرار دارد.

### ۳. نصب و راه‌اندازی

```powershell
.\setup.ps1
```

این اسکریپت به ترتیب انجام می‌دهد:
- نصب پکیج‌ها
- ساخت Prisma Client
- اعمال migrationها روی دیتابیس
- بارگذاری داده‌های اولیه (محصولات، صفحات، کاربر ادمین)

### ۴. اجرا

```powershell
npm run dev
```

سایت در آدرس http://localhost:5000 اجرا می‌شود.
پنل مدیریت در آدرس http://localhost:5000/AdminPanel در دسترس است.

**ورود پیش‌فرض پنل مدیریت:** نام کاربری `admin`، رمز عبور `admin123`

> **هشدار:** بعد از اولین ورود، رمز عبور را از داخل پنل تغییر بده.

---

## استقرار روی Vercel

سایت روی پلن رایگان Vercel (Hobby) اجرا می‌شود. به دلیل محدودیت این پلن
(حداکثر ۱۲ تابع Serverless)، فقط بخش عمومی سایت استقرار می‌یابد و پنل
مدیریت شامل آن نیست. برای مدیریت محتوا از نسخه‌ی لوکال استفاده کن.

### ۱. آماده‌سازی دیتابیس Turso

دیتابیس Turso از قبل ساخته شده و داده‌ها در آن هستند. اگر دیتابیس جدیدی
می‌سازی، ابتدا باید جدول‌ها و داده‌ها را ایجاد کنی:

```powershell
# ساخت جدول‌ها
npx prisma db push

# بارگذاری داده‌های اولیه
npm run seed
```

### ۲. اتصال پروژه به Vercel

```powershell
# نصب Vercel CLI (فقط یک بار)
npm i -g vercel

# ورود به حساب Vercel
vercel login

# اتصال پروژه
vercel link
```

### ۳. تنظیم متغیرهای محیطی

این سه متغیر را در Vercel تنظیم کن (با مقادیر واقعی خودت):

```powershell
"libsql://آدرس-دیتابیس-شما.turso.io" | vercel env add TURSO_DATABASE_URL production
"توکن-دیتابیس-شما" | vercel env add TURSO_AUTH_TOKEN production
"libsql://آدرس-دیتابیس-شما.turso.io" | vercel env add DATABASE_URL production
```

### ۴. استقرار

```powershell
vercel --prod
```

تمام شد. سایت شما آنلاین است.

### نکات مهم استقرار

- **فایل `.vercelignore`** باعث می‌شود فایل `.env` (حاوی توکن) آپلود نشود.
- **اسکریپت `scripts/build-public.mjs`** هنگام build، مسیرهای پنل مدیریت را
  موقتاً از پروژه خارج می‌کند تا از محدودیت تعداد تابع Vercel فراتر نرویم.
  این کار خودکار است و نیازی به کاری ندارد.
- **به‌روزرسانی محتوا:** سایت به صورت صفحات استاتیک ساخته می‌شود. وقتی با
  پنل مدیریت لوکال محتوایی را تغییر می‌دهی، برای دیدن تغییر در سایت آنلاین
  باید دوباره `vercel --prod` را اجرا کنی.

---

## ساختار پروژه

```
dudoti/
├── prisma/
│   ├── schema.prisma        # ساختار دیتابیس
│   ├── migrations/          # migrationهای دیتابیس
│   ├── seed.ts              # داده‌های اولیه
│   └── prismaClient.ts      # تنظیم اتصال به Turso یا SQLite
├── public/
│   └── images/              # عکس محصولات و سایت
├── scripts/
│   └── build-public.mjs     # build نسخه‌ی عمومی برای Vercel
├── src/
│   ├── app/
│   │   ├── (fa)/            # صفحات فارسی
│   │   ├── (en)/            # صفحات انگلیسی
│   │   ├── (fr)/            # صفحات فرانسوی
│   │   ├── AdminPanel/      # پنل مدیریت (فقط لوکال)
│   │   └── api/             # API routes
│   ├── components/          # کامپوننت‌های React
│   └── lib/                 # ابزارها و تنظیمات
├── .env                     # متغیرهای محیطی (در Git نیست)
├── .vercelignore            # فایل‌هایی که به Vercel آپلود نمی‌شوند
├── next.config.ts
├── package.json
└── vercel.json              # تنظیمات استقرار
```

---

## دستورات پرکاربرد

| دستور | کاربرد |
|-------|--------|
| `npm run dev` | اجرای محلی سایت (روی پورت ۵۰۰۰) |
| `npm run build` | build کامل پروژه |
| `npm run build:public` | build فقط بخش عمومی (برای Vercel) |
| `npm run seed` | بارگذاری مجدد داده‌های اولیه |
| `npm run lint` | بررسی خطاهای کد |
| `npx prisma studio` | رابط گرافیکی دیتابیس |
| `npx prisma generate` | بازسازی Prisma Client بعد از تغییر schema |
| `npx prisma migrate dev` | ساخت migration جدید بعد از تغییر schema |
| `vercel --prod` | استقرار سایت روی Vercel |

---

## تغییر دیتابیس

اگر ساختار جداول را در `prisma/schema.prisma` تغییری دادی:

```powershell
# ۱. ساخت migration
npx prisma migrate dev --name نام-تغییر

# ۲. بازسازی Prisma Client
npx prisma generate

# ۳. commit کردن فایلهای migration ساخته شده
```

---

## راه‌اندازی مجدد از صفر

اگر خواستی همه چیز را از نو راه‌اندازی کنی:

```powershell
# ۱. پاک کردن dependencyها و build
rm -r node_modules .next

# ۲. نصب مجدد
npm install

# ۳. ساخت مجدد دیتابیس
npx prisma migrate reset    # پاک کردن و ساخت دوباره همه چیز
npm run seed                # بارگذاری داده‌های اولیه

# ۴. اجرا
npm run dev
```
