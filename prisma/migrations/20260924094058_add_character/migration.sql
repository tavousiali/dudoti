-- CreateTable
CREATE TABLE "Character" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Lang" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Desc" TEXT,
    "Img1" TEXT,
    "Img2" TEXT,
    "BgColor" TEXT,
    "CSSClass" TEXT,
    "Priority" INTEGER NOT NULL DEFAULT 0
);
