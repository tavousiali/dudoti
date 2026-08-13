-- CreateTable
CREATE TABLE "BigImage" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Pic1" TEXT,
    "Title" TEXT,
    "Priority" INTEGER DEFAULT 0,
    "Link" TEXT,
    "Text2" TEXT,
    "Pic2" TEXT,
    "Type" INTEGER DEFAULT 1,
    "Class" TEXT,
    "Lang" INTEGER NOT NULL
);
