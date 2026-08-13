-- CreateTable
CREATE TABLE "Social" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Icon" TEXT,
    "Link" TEXT,
    "Lang" INTEGER NOT NULL,
    "Title" TEXT,
    "FooterOrHeader" INTEGER DEFAULT 1,
    "Priority" INTEGER DEFAULT 1
);
