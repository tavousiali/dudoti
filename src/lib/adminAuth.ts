import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AdminSession = {
  id: number;
  username: string;
  name: string;
  type: number;
  exp: number;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return null;

    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const session: AdminSession = JSON.parse(decoded);

    // بررسی انقضا
    if (session.exp < Date.now()) return null;

    return session;
  } catch {
    return null;
  }
}

// در صفحات محافظت‌شده استفاده می‌شه
export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    redirect("/AdminPanel");
  }
  return session;
}
