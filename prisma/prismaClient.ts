import { PrismaClient } from "../src/generated/prisma";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env") });

// ساخت یک PrismaClient: اگر Turso تنظیم شده باشد از آن، در غیر این صورت SQLite محلی
export function createPrismaClient(): PrismaClient {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  if (tursoUrl && tursoToken) {
    return new PrismaClient({
      adapter: new PrismaLibSql({ url: tursoUrl, authToken: tursoToken }),
    });
  }

  return new PrismaClient();
}
