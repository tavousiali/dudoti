import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { resolve } from "path";
import { seedProducts } from "./seedProducts";

// لود کردن .env از ریشه پروژه
config({ path: resolve(process.cwd(), ".env") });

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
      name: "مدیر سیستم",
      email: "admin@dudoti.com",
      active: true,
      type: 1,
      branchId: 1,
      branchName: "شعبه اصلی",
      semat: "مدیر",
    },
  });

  console.log("کاربر ادمین ساخته شد:", admin.username);

  // Social seed data
  const socials = [
    { Id: 2,  Icon: "icon-instagram2", Link: "https://instagram.com/dudoti?igshid=YmMyMTA2M2Y=", Lang: 1, Title: "instagram", FooterOrHeader: 1, Priority: 2 },
    { Id: 3,  Icon: "icon-telegram2",  Link: null, Lang: 1, Title: "telegram",  FooterOrHeader: 1, Priority: 1 },
    { Id: 8,  Icon: "icon-linkedin2",  Link: null, Lang: 1, Title: "linkedin",  FooterOrHeader: 1, Priority: 3 },
    { Id: 9,  Icon: "icon-instagram2", Link: "https://instagram.com/dudoti?igshid=YmMyMTA2M2Y=", Lang: 2, Title: "instagram", FooterOrHeader: 1, Priority: 2 },
    { Id: 10, Icon: "icon-telegram2",  Link: null, Lang: 2, Title: "telegram",  FooterOrHeader: 1, Priority: 1 },
    { Id: 11, Icon: "icon-linkedin2",  Link: null, Lang: 2, Title: "linkedin",  FooterOrHeader: 1, Priority: 3 },
    { Id: 12, Icon: "icon-instagram2", Link: "https://instagram.com/dudoti?igshid=YmMyMTA2M2Y=", Lang: 3, Title: "instagram", FooterOrHeader: 1, Priority: 2 },
    { Id: 13, Icon: "icon-telegram2",  Link: null, Lang: 3, Title: "telegram",  FooterOrHeader: 1, Priority: 1 },
    { Id: 14, Icon: "icon-linkedin2",  Link: null, Lang: 3, Title: "linkedin",  FooterOrHeader: 1, Priority: 3 },
  ];

  for (const s of socials) {
    await prisma.social.upsert({
      where: { Id: s.Id },
      update: s,
      create: s,
    });
  }
  console.log(`${socials.length} شبکه اجتماعی اضافه شد`);

  // MainPage seed data
  const mainPages = [
    {
      Id: 1,
      Footer: "غذای تشویقی سگ، غذای تشویقی گربه، غذای تشویقی جوندگان",
      CR: "کلیه حقوق وبسایت برای شرکت دودوتی محفوظ است.",
      MainTitle: "محصولات دودوتی",
      Keywords: "غذای تشویقی سگ، غذای تشویقی گربه، غذای تشویقی جوندگان",
      Description: "غذای تشویقی سگ، جوندگان و محصولات گربه",
      GArz: 0, GTool: 0, MapActive: 0,
      ShortTitle: " | دودوتی",
      Tel: "912",
      Lang: 1, DefaultLang: 1,
      ContactText: "تلفن: ۰۰۹۵ ۲۲۱۹ ۲۱ ۹۸+\nایمیل: dudoticompany@gmail.com",
      Slogan: "تولیدکننده‌ی محصولاتی برای زندگی آسوده \nو سلامت با سگ‌ها، گربه‌ها و جوندگان خانگی",
      ProductsCount: 24,
      EmailAddress: null,
      SloganTitle: "دودوتی",
      SloganImage: "/images/theme/s1.png",
      SiteMain: "https://dudoti.com/",
      LangUrl: "/",
      LangUrlLink: null,
    },
    {
      Id: 2,
      Footer: "Dog treats, cat treats, rodent treats",
      CR: "All rights to the website are reserved for Dudoti Company.",
      MainTitle: "Dudoti products",
      Keywords: "Dog treats, cat treats, rodent treats",
      Description: "Dog, rodent and cat treat products",
      GArz: 0, GTool: 0, MapActive: 0,
      ShortTitle: " | dudoti",
      Tel: "912",
      Lang: 2, DefaultLang: 1,
      ContactText: "Phone: +98 0095 2219 21\nEmail: dudoticompany@gmail.com",
      Slogan: "Manufacturer of products for a comfortable and healthy life with dogs, cats and pet rodents\n",
      ProductsCount: 24,
      EmailAddress: null,
      SloganTitle: "dudoti",
      SloganImage: "/images/theme/s1.png",
      SiteMain: "https://dudoti.com/",
      LangUrl: "/en",
      LangUrlLink: "/en",
    },
    {
      Id: 3,
      Footer: "Friandises pour chiens, friandises pour chats, friandises pour rongeurs",
      CR: "Tous les droits sur le site Web sont réservés à la société Dudoti.",
      MainTitle: "Produits Dudoti",
      Keywords: "Friandises pour chiens, friandises pour chats, friandises pour rongeurs",
      Description: "Produits de friandises pour chiens, rongeurs et chats",
      GArz: 0, GTool: 0, MapActive: 0,
      ShortTitle: " | dudoti",
      Tel: "912",
      Lang: 3, DefaultLang: 1,
      ContactText: "Téléphone : +98 0095 2219 21\nCourriel : dudoticompany@gmail.com",
      Slogan: "Fabricant de produits pour une vie confortable et saine avec des chiens, des chats et des rongeurs de compagnie",
      ProductsCount: 24,
      EmailAddress: null,
      SloganTitle: "dudoti",
      SloganImage: "/images/theme/s1.png",
      SiteMain: "https://dudoti.com/",
      LangUrl: "/fr",
      LangUrlLink: "/fr",
    },
  ];

  for (const mp of mainPages) {
    await prisma.mainPage.upsert({
      where: { Id: mp.Id },
      update: mp,
      create: mp,
    });
  }

  console.log(`${mainPages.length} رکورد MainPage اضافه شد`);

  // ProductCategory seed data
  const categories = [
    { Id: 1,  Title: "محصولات سگ",          Pic1: "/images/products/dog.png",    Pic2: "/images/products/dog.png",    Lang: 1, Priority: 3, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "dog",         ParentId: 0,   ParentName: "محصولات",           TitleEn: "dog products",       SeoTitle: "انواع خوراک سگ",                            SeoLead: null, CSSClass: "dog",    Video: null,                                  VideoPic: null },
    { Id: 2,  Title: "محصولات گربه",         Pic1: "/images/products/cat.png",    Pic2: "/images/products/cat.png",    Lang: 1, Priority: 3, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "cat",         ParentId: 0,   ParentName: "محصولات",           TitleEn: "cat products",       SeoTitle: "انواع محصولات گربه",                        SeoLead: null, CSSClass: "cat",    Video: null,                                  VideoPic: null },
    { Id: 3,  Title: "محصولات جوندگان",      Pic1: "/images/products/rodent.png", Pic2: "/images/products/rodent.png", Lang: 1, Priority: 3, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "rodent",      ParentId: 0,   ParentName: "محصولات",           TitleEn: "rodent products",    SeoTitle: "انواع غذاهای تشویقی جوندگان",               SeoLead: null, CSSClass: "rabbit", Video: "/Images/Products/ProductCatV_3.mp4",  VideoPic: "/Images/Products/ProductCatVP_3.jpg" },
    { Id: 4,  Title: "تشویقی سگ",            Pic1: "/images/products/dog.png",    Pic2: "/images/products/dog.png",    Lang: 1, Priority: 1, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "reward",      ParentId: 1,   ParentName: "محصولات سگ",        TitleEn: "reward",             SeoTitle: "خرید تشویقی سگ",                            SeoLead: null, CSSClass: "dog",    Video: null,                                  VideoPic: null },
    { Id: 5,  Title: "ظرف خاک",              Pic1: "/images/products/cat.png",    Pic2: "/images/products/cat.png",    Lang: 1, Priority: 4, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "cat-soil",    ParentId: 2,   ParentName: "محصولات گربه",      TitleEn: "food",               SeoTitle: "خرید ظرف خاک",                              SeoLead: null, CSSClass: "cat",    Video: null,                                  VideoPic: null },
    { Id: 6,  Title: "وود پلت",              Pic1: "/images/products/cat.png",    Pic2: "/images/products/cat.png",    Lang: 1, Priority: 0, Lead: null, Description: null, Deleted: false, ShowMenu: false, Actice: true, urlTitle: "cat-pallets", ParentId: 2,   ParentName: "محصولات گربه",      TitleEn: null,                 SeoTitle: "خاک گربه",                                  SeoLead: null, CSSClass: "cat",    Video: null,                                  VideoPic: null },
    { Id: 7,  Title: "تشویقی جوندگان",       Pic1: "/images/products/rodent.png", Pic2: "/images/products/rodent.png", Lang: 1, Priority: 0, Lead: null, Description: null, Deleted: false, ShowMenu: false, Actice: true, urlTitle: "rodent",      ParentId: 3,   ParentName: "محصولات جوندگان",   TitleEn: null,                 SeoTitle: "خرید تشویقی جوندگان",                       SeoLead: null, CSSClass: "rabbit", Video: null,                                  VideoPic: null },
    { Id: 10, Title: "Dog Products",         Pic1: "/images/products/dog.png",    Pic2: "/images/products/dog.png",    Lang: 2, Priority: 3, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "dog",         ParentId: 0,   ParentName: "Products",          TitleEn: "dog products",       SeoTitle: "Types of dog food",                         SeoLead: null, CSSClass: "dog",    Video: null,                                  VideoPic: null },
    { Id: 20, Title: "Cat Products",         Pic1: "/images/products/cat.png",    Pic2: "/images/products/cat.png",    Lang: 2, Priority: 3, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "cat",         ParentId: 0,   ParentName: "Products",          TitleEn: "cat products",       SeoTitle: "Types of cat products",                     SeoLead: null, CSSClass: "cat",    Video: null,                                  VideoPic: null },
    { Id: 30, Title: "Rodent Products",      Pic1: "/images/products/rodent.png", Pic2: "/images/products/rodent.png", Lang: 2, Priority: 3, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "rodent",      ParentId: 0,   ParentName: "Products",          TitleEn: "rodent products",    SeoTitle: "Types of rodent incentive foods",           SeoLead: null, CSSClass: "rabbit", Video: "/Images/Products/ProductCatV_3.mp4",  VideoPic: "/Images/Products/ProductCatVP_3.jpg" },
    { Id: 40, Title: "Dog Treats",           Pic1: "/images/products/dog.png",    Pic2: "/images/products/dog.png",    Lang: 2, Priority: 1, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "reward",      ParentId: 10,  ParentName: "Dog Products",      TitleEn: "reward",             SeoTitle: "Dog incentive purchase",                    SeoLead: null, CSSClass: "dog",    Video: null,                                  VideoPic: null },
    { Id: 50, Title: "Soil Containers",      Pic1: "/images/products/cat.png",    Pic2: "/images/products/cat.png",    Lang: 2, Priority: 4, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "cat-soil",    ParentId: 20,  ParentName: "Cat Products",      TitleEn: "food",               SeoTitle: "Purchase of litter box",                    SeoLead: null, CSSClass: "cat",    Video: null,                                  VideoPic: null },
    { Id: 60, Title: "Wood Pellets",         Pic1: "/images/products/cat.png",    Pic2: "/images/products/cat.png",    Lang: 2, Priority: 0, Lead: null, Description: null, Deleted: false, ShowMenu: false, Actice: true, urlTitle: "cat-pallets", ParentId: 20,  ParentName: "Cat Products",      TitleEn: null,                 SeoTitle: "Cat litter",                                SeoLead: null, CSSClass: "cat",    Video: null,                                  VideoPic: null },
    { Id: 70, Title: "Rodent Treats",        Pic1: "/images/products/rodent.png", Pic2: "/images/products/rodent.png", Lang: 2, Priority: 0, Lead: null, Description: null, Deleted: false, ShowMenu: false, Actice: true, urlTitle: "rodent",      ParentId: 30,  ParentName: "Rodent Products",   TitleEn: null,                 SeoTitle: "Rodent incentive purchase",                 SeoLead: null, CSSClass: "rabbit", Video: null,                                  VideoPic: null },
    { Id: 100, Title: "Produits pour chiens",   Pic1: "/images/products/dog.png",    Pic2: "/images/products/dog.png",    Lang: 3, Priority: 3, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "dog",         ParentId: 0,   ParentName: "Produits",          TitleEn: "dog products",       SeoTitle: "Types d'aliments pour chiens",              SeoLead: null, CSSClass: "dog",    Video: null,                                  VideoPic: null },
    { Id: 200, Title: "Produits pour chats",    Pic1: "/images/products/cat.png",    Pic2: "/images/products/cat.png",    Lang: 3, Priority: 3, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "cat",         ParentId: 0,   ParentName: "Produits",          TitleEn: "cat products",       SeoTitle: "Types de produits pour chats",              SeoLead: null, CSSClass: "cat",    Video: null,                                  VideoPic: null },
    { Id: 300, Title: "Produits pour rongeurs", Pic1: "/images/products/rodent.png", Pic2: "/images/products/rodent.png", Lang: 3, Priority: 3, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "rodent",      ParentId: 0,   ParentName: "Produits",          TitleEn: "rodent products",    SeoTitle: "Types d'aliments incitatifs pour rongeurs", SeoLead: null, CSSClass: "rabbit", Video: "/Images/Products/ProductCatV_3.mp4",  VideoPic: "/Images/Products/ProductCatVP_3.jpg" },
    { Id: 400, Title: "Friandises pour chiens", Pic1: "/images/products/dog.png",    Pic2: "/images/products/dog.png",    Lang: 3, Priority: 1, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "reward",      ParentId: 100, ParentName: "Produits pour chiens", TitleEn: "récompense",        SeoTitle: "Achat incitatif pour chiens",               SeoLead: null, CSSClass: "dog",    Video: null,                                  VideoPic: null },
    { Id: 500, Title: "Conteneurs de terre",    Pic1: "/images/products/cat.png",    Pic2: "/images/products/cat.png",    Lang: 3, Priority: 4, Lead: null, Description: null, Deleted: false, ShowMenu: true,  Actice: true, urlTitle: "cat-soil",    ParentId: 200, ParentName: "Produits pour chats",  TitleEn: "nourriture",        SeoTitle: "Achat d'un bac à litière",                  SeoLead: null, CSSClass: "cat",    Video: null,                                  VideoPic: null },
    { Id: 600, Title: "Granulés de bois",       Pic1: "/images/products/cat.png",    Pic2: "/images/products/cat.png",    Lang: 3, Priority: 0, Lead: null, Description: null, Deleted: false, ShowMenu: false, Actice: true, urlTitle: "cat-pallets", ParentId: 200, ParentName: "Produits pour chats",  TitleEn: "Produits pour chats", SeoTitle: "Litière pour chats",                       SeoLead: null, CSSClass: "cat",    Video: null,                                  VideoPic: null },
    { Id: 700, Title: "Friandises pour rongeurs", Pic1: "/images/products/rodent.png", Pic2: "/images/products/rodent.png", Lang: 3, Priority: 0, Lead: null, Description: null, Deleted: false, ShowMenu: false, Actice: true, urlTitle: "rodent", ParentId: 300, ParentName: "Produits pour rongeurs", TitleEn: "Produits pour rongeurs", SeoTitle: "Achat incitatif pour rongeurs", SeoLead: null, CSSClass: "rabbit", Video: null, VideoPic: null },
  ];

  for (const cat of categories) {
    await prisma.productCategory.upsert({
      where: { Id: cat.Id },
      update: cat,
      create: cat,
    });
  }

  console.log(`${categories.length} دسته‌بندی محصول اضافه شد`);

  await seedProducts();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
