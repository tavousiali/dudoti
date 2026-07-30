import prisma from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";
import DeleteUserButton from "@/components/admin/DeleteUserButton";
import { requireAdminSession } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مدیریت کاربران - پنل دودوتی",
};

export default async function UsersListPage() {
  await requireAdminSession();
  const users = await prisma.user.findMany({
    orderBy: { id: "asc" },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      active: true,
      type: true,
      branchName: true,
      semat: true,
      lastLogFa: true,
    },
  });

  return (
    <div>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          borderBottom: "2px solid #f90",
          paddingBottom: "10px",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#333", margin: 0 }}>
          مدیریت کاربران
        </h1>
        <Link
          href="/AdminPanel/dashboard/users/new"
          style={{
            background: "#f90",
            color: "#fff",
            padding: "8px 20px",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          + افزودن کاربر
        </Link>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        {users.length === 0 ? (
          <div style={{ padding: "48px", textAlign: "center", color: "#aaa" }}>
            هیچ کاربری ثبت نشده است.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
                textAlign: "right",
              }}
            >
              <thead>
                <tr style={{ background: "#f8f8f8", borderBottom: "2px solid #eee" }}>
                  {["#", "نام کاربری", "نام", "ایمیل", "شعبه", "سمت", "نوع", "آخرین ورود", "وضعیت", "عملیات"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 16px",
                          fontWeight: 600,
                          color: "#555",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      background: idx % 2 === 0 ? "#fff" : "#fafafa",
                    }}
                  >
                    <td style={{ padding: "12px 16px", color: "#999" }}>{user.id}</td>
                    <td style={{ padding: "12px 16px", fontWeight: 500, color: "#333" }}>
                      {user.username}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#333" }}>{user.name}</td>
                    <td style={{ padding: "12px 16px", color: "#666" }}>
                      {user.email || "—"}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#666" }}>
                      {user.branchName || "—"}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#666" }}>
                      {user.semat || "—"}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          background: user.type === 1 ? "#e8f4fd" : "#fef3e2",
                          color: user.type === 1 ? "#2980b9" : "#e67e22",
                          padding: "2px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {user.type === 1 ? "ادمین" : "کاربر"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#999", direction: "ltr" }}>
                      {user.lastLogFa || "—"}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          background: user.active ? "#e8f8f0" : "#fdecea",
                          color: user.active ? "#27ae60" : "#e74c3c",
                          padding: "2px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {user.active ? "فعال" : "غیرفعال"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                      <Link
                        href={`/AdminPanel/dashboard/users/${user.id}/edit`}
                        style={{
                          color: "#f90",
                          textDecoration: "none",
                          fontWeight: 500,
                          marginLeft: "12px",
                          fontSize: "13px",
                        }}
                      >
                        ویرایش
                      </Link>
                      <DeleteUserButton id={user.id} username={user.username} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
