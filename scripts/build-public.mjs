/**
 * اسکریپتی برای خروجی گرفتن نسخه‌ی عمومی سایت (بدون پنل مدیریت).
 *
 * پنل مدیریت و APIهای ادمین نیازمند Serverless Function هستند و پلن Hobby
 * اجازه‌ی بیش از ۱۲ تابع نمی‌دهد. این اسکریپت قبل از build، مسیرهای ادمین را
 * به پوشه‌ای خارج از سیستم routing منتقل می‌کند و پس از build برمی‌گرداند.
 *
 * کاربرد: node scripts/build-public.mjs
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const appDir = join(root, "src", "app");
// staging باید خارج از پروژه باشد تا Vercel آن را در خروجی build شمارش نکند
const staging = join(root, "..", "_admin_staging_" + process.pid);

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
      const dest = join(staging, p.replace(appDir, "").replace(/^[/\\]/, ""));
      const parent = join(dest, "..");
      if (!existsSync(parent)) mkdirSync(parent, { recursive: true });
      renameSync(p, dest);
      console.log(`moved: ${p.replace(root, "")}`);
    }
  }
  moved = true;
}

function moveBack() {
  if (!moved) return;
  for (const p of adminPaths) {
    const src = join(staging, p.replace(appDir, "").replace(/^[/\\]/, ""));
    if (existsSync(src)) {
      const parent = join(p, "..");
      if (!existsSync(parent)) mkdirSync(parent, { recursive: true });
      renameSync(src, p);
      console.log(`restored: ${p.replace(root, "")}`);
    }
  }
  rmSync(staging, { recursive: true, force: true });
}

process.on("exit", moveBack);
process.on("SIGINT", () => {
  moveBack();
  process.exit(1);
});

moveAway();
try {
  execSync("next build", { stdio: "inherit", cwd: root });
} finally {
  moveBack();
}