-- CreateTable
CREATE TABLE "Page" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT,
    "Text" TEXT,
    "seen" INTEGER DEFAULT 0,
    "Type" INTEGER DEFAULT 1,
    "Lang" INTEGER NOT NULL,
    "Pic" TEXT,
    "Lead" TEXT,
    "urlTitle" TEXT,
    "Priority" INTEGER DEFAULT 0,
    "PreTitle" TEXT,
    "SubTitle" TEXT,
    "SeoLead" TEXT,
    "SeoTitle" TEXT
);
