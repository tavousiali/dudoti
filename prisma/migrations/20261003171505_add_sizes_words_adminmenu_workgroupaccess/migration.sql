-- CreateTable
CREATE TABLE "Size" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Title" TEXT,
    "Arz" INTEGER,
    "Tool" INTEGER,
    "TArz" INTEGER,
    "TTool" INTEGER
);

-- CreateTable
CREATE TABLE "Word" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Lang" INTEGER NOT NULL,
    "Title" TEXT NOT NULL,
    "PageName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AdminMenu" (
    "MenuId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "MenuName" TEXT,
    "ParentMenuId" INTEGER,
    "Icon" TEXT,
    "Address" TEXT,
    "Priority" INTEGER,
    "JustMaze" BOOLEAN,
    "Icon2" TEXT
);

-- CreateTable
CREATE TABLE "WorkgroupAccess" (
    "wgId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "WorkgroupName" TEXT,
    "MenuAccess" TEXT,
    "CanDelete" BOOLEAN,
    "CanDelP" BOOLEAN,
    "CanDelE" BOOLEAN,
    "CanEditP" BOOLEAN,
    "CanEditE" BOOLEAN,
    "CanAddE" BOOLEAN,
    "CanEditMem" BOOLEAN,
    "CanSeeDashBoard" BOOLEAN,
    "CanSearch" BOOLEAN,
    "DepentTime" BOOLEAN,
    "CanAddCredit" BOOLEAN
);
