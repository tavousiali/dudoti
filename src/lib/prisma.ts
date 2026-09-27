import { PrismaClient } from "../generated/prisma";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  // اگر Turso تنظیم شده باشد، از آن استفاده می‌کنیم؛ در غیر این صورت SQLite محلی
  if (tursoUrl && tursoToken) {
    return new PrismaClient({
      adapter: new PrismaLibSql({
        url: tursoUrl,
        authToken: tursoToken,
      }),
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
