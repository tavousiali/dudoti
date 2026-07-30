-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "lastLogFa" TEXT,
    "lastLog" DATETIME,
    "semat" TEXT,
    "type" INTEGER NOT NULL DEFAULT 1,
    "pic" TEXT,
    "branchId" INTEGER,
    "branchName" TEXT,
    "hashedId" TEXT,
    "hashCode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
