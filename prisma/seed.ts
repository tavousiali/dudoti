import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { resolve } from "path";

// لود کردن .env از ریشه پروژه
config({ path: resolve(process.cwd(), ".env") });

const prisma = new PrismaClient();

async function main() {
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
