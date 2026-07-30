import { createRequire } from "module";
const require = createRequire(import.meta.url);

const bcrypt = require("bcryptjs");

// مستقیم از دیتابیس با better-sqlite3 یا از طریق API
// چون Prisma Client جدید ESM هست، از dynamic import استفاده می‌کنیم

async function main() {
  const { PrismaClient } = await import("../src/generated/prisma/client.ts");
  const prisma = new PrismaClient();

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
      name: "مدیر سیستم",
      email: "admin@dudoti.com",
      active: true,
      type: 1,
      branchId: 1,
      branchName: "شعبه اصلی",
      semat: "مدیر",
    },
  });

  console.log("کاربر ادمین ساخته شد:", admin.username);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
