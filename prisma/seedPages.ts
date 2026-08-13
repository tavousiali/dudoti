import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

export async function seedPages() {
  const pages = [
    {
      Id: 1, Lang: 1, urlTitle: "about", Priority: 5, Type: 1, seen: 0,
      Title: "دودوتی", Text: null, Pic: "/images/s4.png", Lead: null,
      PreTitle: "درباره‌ی",
      SubTitle: "تولیدکننده‌ی محصولاتی برای زندگی آسوده و سلامت با سگ‌ها، گربه‌ها و جوندگان خانگی",
      SeoLead: "تولیدکننده‌ی محصولاتی برای زندگی آسوده و سلامت با سگ‌ها، گربه‌ها و جوندگان خانگی",
      SeoTitle: "درباره‌ی دودوتی",
    },
    {
      Id: 2, Lang: 1, urlTitle: "about2", Priority: 4, Type: 1, seen: 0,
      Title: "درباره‌ی دودوتی",
      Text: "<p>دودوتی یه برند جدید ایرانیه که محصولات غذایی و بهداشتی باکیفیت برای حیوان‌های خانگی تولید می‌کنه.</p><p>دودوتی می‌دونه که این روزها هزینه‌های نگهداری از حیوان‌ خانگی چقدر سرسام‌آورند، برای همین محصولاتش رو با قیمتی مناسب عرضه می‌کنه، چون عاشق حیوان‌هاست و دلش می‌خواد اون‌ها بتونن در کنار انسان‌ها شاد و راحت زندگی کنن.</p><p>دودوتی دوست شما و حیوان‌ خونگی‌تونه. با محصولات دودوتی حیوان‌ شما سلامت و خیال شما راحته.</p>",
      Pic: "/images/s2.png", Lead: null, PreTitle: null, SubTitle: null, SeoLead: null, SeoTitle: null,
    },
    {
      Id: 3, Lang: 1, urlTitle: "products", Priority: 3, Type: 1, seen: 0,
      Title: "محصولات",
      Text: "<p>دودوتی دوست حیوان‌ خانگی شماست و سلامت جسم و روح اون از همه چیز براش مهمتره. برای همین محصولات دودوتی از نظر کیفیت بی‌نظیرن و کاملا بهداشتی و بدون مواد نگهدارنده تولید می‌شن.</p>",
      Pic: "/images/cat-handup.png", Lead: null, PreTitle: null, SubTitle: null, SeoLead: null, SeoTitle: null,
    },
    {
      Id: 4, Lang: 1, urlTitle: "home", Priority: 2, Type: 2, seen: 0,
      Title: "درباره‌ی دودوتی",
      Text: "<p>دودوتی یه برند جدید ایرانیه که محصولات غذایی و بهداشتی خیلی باکیفیت برای حیوان‌های خونگی تولید می‌کنه.</p>",
      Pic: null, Lead: null, PreTitle: null, SubTitle: "بیشتر", SeoLead: "صفحه اصلی", SeoTitle: null,
    },
    {
      Id: 5, Lang: 1, urlTitle: "contact", Priority: 1, Type: 2, seen: 0,
      Title: "تماس با ما",
      Text: "<p>اطلاعات تماس<br /><strong>تلفن: </strong>۰۰۹۵ ۲۲۱۹ ۲۱ ۹۸+<br />ایمیل: dudoticompany@gmail.com</p>",
      Pic: null, Lead: null, PreTitle: "dudoticompany@gmail.com", SubTitle: null, SeoLead: null, SeoTitle: "تماس با ما",
    },
    {
      Id: 6, Lang: 2, urlTitle: "about", Priority: 5, Type: 1, seen: 0,
      Title: "dudoti", Text: null, Pic: "/images/s4.png", Lead: null,
      PreTitle: "about",
      SubTitle: "Manufacturer of products for a comfortable and healthy life with dogs, cats and pet rodents",
      SeoLead: "Manufacturer of products for a comfortable and healthy life with dogs, cats and pet rodents",
      SeoTitle: "About dudoti",
    },
    {
      Id: 7, Lang: 2, urlTitle: "about2", Priority: 4, Type: 1, seen: 0,
      Title: "About dudoti",
      Text: "<p>dudoti is a new Iranian brand that produces high-quality food and health products for pets.</p>",
      Pic: "/images/s2.png", Lead: null, PreTitle: null, SubTitle: null, SeoLead: null, SeoTitle: null,
    },
    {
      Id: 8, Lang: 2, urlTitle: "products", Priority: 3, Type: 1, seen: 0,
      Title: "Products",
      Text: "<p>dudoti is a friend of your pet and its physical and mental health is more important to them than anything else. That is why dudoti products are of unparalleled quality and are produced completely hygienically and without preservatives.</p>",
      Pic: "/images/s4.png", Lead: null, PreTitle: null, SubTitle: null, SeoLead: null, SeoTitle: null,
    },
    {
      Id: 9, Lang: 2, urlTitle: "home", Priority: 2, Type: 2, seen: 0,
      Title: "About dudoti",
      Text: "<p>dudoti is a new Iranian brand that produces high-quality food and health products for pets.</p>",
      Pic: null, Lead: null, PreTitle: null, SubTitle: "more", SeoLead: "Home", SeoTitle: null,
    },
    {
      Id: 10, Lang: 2, urlTitle: "contact", Priority: 1, Type: 2, seen: 0,
      Title: "Contact Us",
      Text: "<p>Contact Information<br /><strong>Phone: </strong>0095 2219 21 98+<br />Email: dudoticompany@gmail.com</p>",
      Pic: null, Lead: null, PreTitle: "dudoticompany@gmail.com", SubTitle: null, SeoLead: null, SeoTitle: "Contact Us",
    },
    {
      Id: 11, Lang: 3, urlTitle: "about", Priority: 5, Type: 1, seen: 0,
      Title: "dudoti", Text: null, Pic: "/images/s4.png", Lead: null,
      PreTitle: "about",
      SubTitle: "Manufacturer of products for a comfortable and healthy life with dogs, cats and pet rodents",
      SeoLead: "Manufacturer of products for a comfortable and healthy life with dogs, cats and pet rodents",
      SeoTitle: "About dudoti",
    },
    {
      Id: 12, Lang: 3, urlTitle: "about2", Priority: 4, Type: 1, seen: 0,
      Title: "À propos de Dudoti",
      Text: "<p>dudoti est une nouvelle marque iranienne qui produit des aliments et des produits de santé de haute qualité pour animaux de compagnie.</p>",
      Pic: "/images/s2.png", Lead: null, PreTitle: null, SubTitle: null, SeoLead: null, SeoTitle: null,
    },
    {
      Id: 13, Lang: 3, urlTitle: "products", Priority: 3, Type: 1, seen: 0,
      Title: "Produits",
      Text: "Dudoti est l'ami de votre animal et sa santé physique et mentale est primordiale pour lui. C'est pourquoi les produits Dudoti sont d'une qualité inégalée et fabriqués de manière parfaitement hygiénique et sans conservateurs.",
      Pic: "/images/s4.png", Lead: null, PreTitle: null, SubTitle: null, SeoLead: null, SeoTitle: null,
    },
    {
      Id: 14, Lang: 3, urlTitle: "home", Priority: 2, Type: 2, seen: 0,
      Title: "À propos de Dudoti",
      Text: "Dudoti est une nouvelle marque iranienne qui fabrique des aliments et des produits de santé de haute qualité pour animaux de compagnie.",
      Pic: null, Lead: null, PreTitle: null, SubTitle: "more", SeoLead: "Home", SeoTitle: null,
    },
    {
      Id: 15, Lang: 3, urlTitle: "contact", Priority: 1, Type: 2, seen: 0,
      Title: "Contactez-nous",
      Text: "Coordonnées\nTéléphone : 0095 2219 21 98 ou plus\nCourriel : dudoticompany@gmail.com",
      Pic: null, Lead: null, PreTitle: "dudoticompany@gmail.com", SubTitle: null, SeoLead: null, SeoTitle: "Contact Us",
    },
  ];

  for (const p of pages) {
    await prisma.page.upsert({
      where: { Id: p.Id },
      update: p,
      create: p,
    });
  }

  console.log(`${pages.length} صفحه اضافه شد`);
}
