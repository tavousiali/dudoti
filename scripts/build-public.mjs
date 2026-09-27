/**
 * اسکریپتی برای خروجی گرفتن نسخه‌ی عمومی سایت (بدون پنل مدیریت).
 *
 * پنل مدیریت و APIهای ادمین نیازمند Serverless Function هستند و پلن Hobby
 * اجازه‌ی بیش از ۱۲ تابع نمی‌دهد. این اسکریپت قبل از build، مسیرهای ادمین را
 * از سیستم routing خارج می‌کند و پس از build برمی‌گرداند.
 *
 * در محیط build Vercel، پوشه‌ی staging ممکن است روی دستگاه متفاوتی باشد،
 * بنابراین به جای rename از copy استفاده می‌کنیم.
 *
 * کاربرد: node scripts/build-public.mjs
 */
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const root = process.cwd();
const appDir = join(root, "src", "app");
const staging = join(tmpdir(), `dudoti-admin-${process.pid}`);

const adminPaths = [
  join(appDir, "AdminPanel"),
  join(appDir, "api", "admin"),
];

let moved = false;

function moveAway() {
  if (existsSync(staging)) rmSync(staging, { recursive: true, force: true });
  mkdirSync(staging, { recursive: true });

  for (const p of adminPaths) {
    if (existsSync(p)) {
      const rel = p.replace(appDir, "").replace(/^[/\\]/, "");
      const dest = join(staging, rel);
      // copy به جای rename: در Vercel ممکن است staging روی device متفاوتی باشد
      cpSync(p, dest, { recursive: true });
      rmSync(p, { recursive: true, force: true });
      console.log(`stashed: src/app/${rel}`);
    }
  }
  moved = true;
}

function moveBack() {
  if (!moved) return;
  for (const p of adminPaths) {
    const rel = p.replace(appDir, "").replace(/^[/\\]/, "");
    const src = join(staging, rel);
    if (existsSync(src)) {
      rmSync(p, { recursive: true, force: true });
      cpSync(src, p, { recursive: true });
      console.log(`restored: src/app/${rel}`);
    }
  }
  rmSync(staging, { recursive: true, force: true });
}

process.on("exit", moveBack);
process.on("SIGINT", () => {
  moveBack();
  process.exit(1);
});
process.on("SIGTERM", () => {
  moveBack();
  process.exit(1);
});

moveAway();
try {
  // Generate Prisma client برای پلتفرم هدف (روی Vercel یعنی Linux).
  // بدون این، client آپلودشده‌ی Windows باعث خطای Query Engine می‌شود.
  execSync("npx prisma generate", { stdio: "inherit", cwd: root });
  execSync("next build", { stdio: "inherit", cwd: root });
} finally {
  moveBack();
}
