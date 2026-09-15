# Dudoti

## راه‌اندازی اولیه (بعد از clone)

### ۱. ساخت فایل `.env`

یک فایل `.env` در ریشه پروژه بساز:

```
DATABASE_URL="file:./prisma/dev.db"
```

### ۲. اجرای setup script

```powershell
.\setup.ps1
```

این script به ترتیب انجام می‌دهد:
- نصب dependencies
- Generate کردن Prisma client
- اجرای database migrations
- Seed کردن داده‌های اولیه

### ۳. اجرای پروژه

```
npm run dev
```

---

## دستورات مفید

| دستور | توضیح |
|-------|--------|
| `npm run dev` | اجرای dev server |
| `npm run build` | Build برای production |
| `npx prisma generate` | بازسازی Prisma client بعد از تغییر schema |
| `npx prisma migrate dev` | ایجاد migration جدید |
| `npx tsx prisma/seed.ts` | بارگذاری مجدد داده‌های اولیه |
| `npx prisma studio` | رابط گرافیکی برای database |
