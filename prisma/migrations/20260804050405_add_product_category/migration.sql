-- CreateTable
CREATE TABLE "ProductCategory" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT NOT NULL,
    "Pic1" TEXT,
    "Pic2" TEXT,
    "Lang" INTEGER NOT NULL,
    "Priority" INTEGER NOT NULL DEFAULT 0,
    "Lead" TEXT,
    "Description" TEXT,
    "Deleted" BOOLEAN NOT NULL DEFAULT false,
    "ShowMenu" BOOLEAN NOT NULL DEFAULT false,
    "Actice" BOOLEAN NOT NULL DEFAULT true,
    "urlTitle" TEXT,
    "ParentId" INTEGER NOT NULL DEFAULT 0,
    "ParentName" TEXT,
    "TitleEn" TEXT,
    "SeoTitle" TEXT,
    "SeoLead" TEXT,
    "CSSClass" TEXT,
    "Video" TEXT,
    "VideoPic" TEXT
);
