import { createPrismaClient } from "./prismaClient";

const prisma = createPrismaClient();

export async function seedPages() {
  const pages = [
    {
      Id: 1, Lang: 1, urlTitle: "about", Priority: 5, Type: 1, seen: 0,
      Title: "Ã˜Â¯Ã™Ë†Ã˜Â¯Ã™Ë†Ã˜ÂªÃ›Å’", Text: null, Pic: "/images/s4.png", Lead: null,
      PreTitle: "Ã˜Â¯Ã˜Â±Ã˜Â¨Ã˜Â§Ã˜Â±Ã™â€¡Ã¢â‚¬Å’Ã›Å’",
      SubTitle: "Ã˜ÂªÃ™Ë†Ã™â€žÃ›Å’Ã˜Â¯ÃšÂ©Ã™â€ Ã™â€ Ã˜Â¯Ã™â€¡Ã¢â‚¬Å’Ã›Å’ Ã™â€¦Ã˜Â­Ã˜ÂµÃ™Ë†Ã™â€žÃ˜Â§Ã˜ÂªÃ›Å’ Ã˜Â¨Ã˜Â±Ã˜Â§Ã›Å’ Ã˜Â²Ã™â€ Ã˜Â¯ÃšÂ¯Ã›Å’ Ã˜Â¢Ã˜Â³Ã™Ë†Ã˜Â¯Ã™â€¡ Ã™Ë† Ã˜Â³Ã™â€žÃ˜Â§Ã™â€¦Ã˜Âª Ã˜Â¨Ã˜Â§ Ã˜Â³ÃšÂ¯Ã¢â‚¬Å’Ã™â€¡Ã˜Â§Ã˜Å’ ÃšÂ¯Ã˜Â±Ã˜Â¨Ã™â€¡Ã¢â‚¬Å’Ã™â€¡Ã˜Â§ Ã™Ë† Ã˜Â¬Ã™Ë†Ã™â€ Ã˜Â¯ÃšÂ¯Ã˜Â§Ã™â€  Ã˜Â®Ã˜Â§Ã™â€ ÃšÂ¯Ã›Å’",
      SeoLead: "Ã˜ÂªÃ™Ë†Ã™â€žÃ›Å’Ã˜Â¯ÃšÂ©Ã™â€ Ã™â€ Ã˜Â¯Ã™â€¡Ã¢â‚¬Å’Ã›Å’ Ã™â€¦Ã˜Â­Ã˜ÂµÃ™Ë†Ã™â€žÃ˜Â§Ã˜ÂªÃ›Å’ Ã˜Â¨Ã˜Â±Ã˜Â§Ã›Å’ Ã˜Â²Ã™â€ Ã˜Â¯ÃšÂ¯Ã›Å’ Ã˜Â¢Ã˜Â³Ã™Ë†Ã˜Â¯Ã™â€¡ Ã™Ë† Ã˜Â³Ã™â€žÃ˜Â§Ã™â€¦Ã˜Âª Ã˜Â¨Ã˜Â§ Ã˜Â³ÃšÂ¯Ã¢â‚¬Å’Ã™â€¡Ã˜Â§Ã˜Å’ ÃšÂ¯Ã˜Â±Ã˜Â¨Ã™â€¡Ã¢â‚¬Å’Ã™â€¡Ã˜Â§ Ã™Ë† Ã˜Â¬Ã™Ë†Ã™â€ Ã˜Â¯ÃšÂ¯Ã˜Â§Ã™â€  Ã˜Â®Ã˜Â§Ã™â€ ÃšÂ¯Ã›Å’",
      SeoTitle: "Ã˜Â¯Ã˜Â±Ã˜Â¨Ã˜Â§Ã˜Â±Ã™â€¡Ã¢â‚¬Å’Ã›Å’ Ã˜Â¯Ã™Ë†Ã˜Â¯Ã™Ë†Ã˜ÂªÃ›Å’",
    },
    {
      Id: 2, Lang: 1, urlTitle: "about2", Priority: 4, Type: 1, seen: 0,
      Title: "Ã˜Â¯Ã˜Â±Ã˜Â¨Ã˜Â§Ã˜Â±Ã™â€¡Ã¢â‚¬Å’Ã›Å’ Ã˜Â¯Ã™Ë†Ã˜Â¯Ã™Ë†Ã˜ÂªÃ›Å’",
      Text: "<p>Ã˜Â¯Ã™Ë†Ã˜Â¯Ã™Ë†Ã˜ÂªÃ›Å’ Ã›Å’Ã™â€¡ Ã˜Â¨Ã˜Â±Ã™â€ Ã˜Â¯ Ã˜Â¬Ã˜Â¯Ã›Å’Ã˜Â¯ Ã˜Â§Ã›Å’Ã˜Â±Ã˜Â§Ã™â€ Ã›Å’Ã™â€¡ ÃšÂ©Ã™â€¡ Ã™â€¦Ã˜Â­Ã˜ÂµÃ™Ë†Ã™â€žÃ˜Â§Ã˜Âª Ã˜ÂºÃ˜Â°Ã˜Â§Ã›Å’Ã›Å’ Ã™Ë† Ã˜Â¨Ã™â€¡Ã˜Â¯Ã˜Â§Ã˜Â´Ã˜ÂªÃ›Å’ Ã˜Â¨Ã˜Â§ÃšÂ©Ã›Å’Ã™ÂÃ›Å’Ã˜Âª Ã˜Â¨Ã˜Â±Ã˜Â§Ã›Å’ Ã˜Â­Ã›Å’Ã™Ë†Ã˜Â§Ã™â€ Ã¢â‚¬Å’Ã™â€¡Ã˜Â§Ã›Å’ Ã˜Â®Ã˜Â§Ã™â€ ÃšÂ¯Ã›Å’ Ã˜ÂªÃ™Ë†Ã™â€žÃ›Å’Ã˜Â¯ Ã™â€¦Ã›Å’Ã¢â‚¬Å’ÃšÂ©Ã™â€ Ã™â€¡.</p><p>Ã˜Â¯Ã™Ë†Ã˜Â¯Ã™Ë†Ã˜ÂªÃ›Å’ Ã™â€¦Ã›Å’Ã¢â‚¬Å’Ã˜Â¯Ã™Ë†Ã™â€ Ã™â€¡ ÃšÂ©Ã™â€¡ Ã˜Â§Ã›Å’Ã™â€  Ã˜Â±Ã™Ë†Ã˜Â²Ã™â€¡Ã˜Â§ Ã™â€¡Ã˜Â²Ã›Å’Ã™â€ Ã™â€¡Ã¢â‚¬Å’Ã™â€¡Ã˜Â§Ã›Å’ Ã™â€ ÃšÂ¯Ã™â€¡Ã˜Â¯Ã˜Â§Ã˜Â±Ã›Å’ Ã˜Â§Ã˜Â² Ã˜Â­Ã›Å’Ã™Ë†Ã˜Â§Ã™â€ Ã¢â‚¬Å’ Ã˜Â®Ã˜Â§Ã™â€ ÃšÂ¯Ã›Å’ Ãšâ€ Ã™â€šÃ˜Â¯Ã˜Â± Ã˜Â³Ã˜Â±Ã˜Â³Ã˜Â§Ã™â€¦Ã¢â‚¬Å’Ã˜Â¢Ã™Ë†Ã˜Â±Ã™â€ Ã˜Â¯Ã˜Å’ Ã˜Â¨Ã˜Â±Ã˜Â§Ã›Å’ Ã™â€¡Ã™â€¦Ã›Å’Ã™â€  Ã™â€¦Ã˜Â­Ã˜ÂµÃ™Ë†Ã™â€žÃ˜Â§Ã˜ÂªÃ˜Â´ Ã˜Â±Ã™Ë† Ã˜Â¨Ã˜Â§ Ã™â€šÃ›Å’Ã™â€¦Ã˜ÂªÃ›Å’ Ã™â€¦Ã™â€ Ã˜Â§Ã˜Â³Ã˜Â¨ Ã˜Â¹Ã˜Â±Ã˜Â¶Ã™â€¡ Ã™â€¦Ã›Å’Ã¢â‚¬Å’ÃšÂ©Ã™â€ Ã™â€¡Ã˜Å’ Ãšâ€ Ã™Ë†Ã™â€  Ã˜Â¹Ã˜Â§Ã˜Â´Ã™â€š Ã˜Â­Ã›Å’Ã™Ë†Ã˜Â§Ã™â€ Ã¢â‚¬Å’Ã™â€¡Ã˜Â§Ã˜Â³Ã˜Âª Ã™Ë† Ã˜Â¯Ã™â€žÃ˜Â´ Ã™â€¦Ã›Å’Ã¢â‚¬Å’Ã˜Â®Ã™Ë†Ã˜Â§Ã˜Â¯ Ã˜Â§Ã™Ë†Ã™â€ Ã¢â‚¬Å’Ã™â€¡Ã˜Â§ Ã˜Â¨Ã˜ÂªÃ™Ë†Ã™â€ Ã™â€  Ã˜Â¯Ã˜Â± ÃšÂ©Ã™â€ Ã˜Â§Ã˜Â± Ã˜Â§Ã™â€ Ã˜Â³Ã˜Â§Ã™â€ Ã¢â‚¬Å’Ã™â€¡Ã˜Â§ Ã˜Â´Ã˜Â§Ã˜Â¯ Ã™Ë† Ã˜Â±Ã˜Â§Ã˜Â­Ã˜Âª Ã˜Â²Ã™â€ Ã˜Â¯ÃšÂ¯Ã›Å’ ÃšÂ©Ã™â€ Ã™â€ .</p><p>Ã˜Â¯Ã™Ë†Ã˜Â¯Ã™Ë†Ã˜ÂªÃ›Å’ Ã˜Â¯Ã™Ë†Ã˜Â³Ã˜Âª Ã˜Â´Ã™â€¦Ã˜Â§ Ã™Ë† Ã˜Â­Ã›Å’Ã™Ë†Ã˜Â§Ã™â€ Ã¢â‚¬Å’ Ã˜Â®Ã™Ë†Ã™â€ ÃšÂ¯Ã›Å’Ã¢â‚¬Å’Ã˜ÂªÃ™Ë†Ã™â€ Ã™â€¡. Ã˜Â¨Ã˜Â§ Ã™â€¦Ã˜Â­Ã˜ÂµÃ™Ë†Ã™â€žÃ˜Â§Ã˜Âª Ã˜Â¯Ã™Ë†Ã˜Â¯Ã™Ë†Ã˜ÂªÃ›Å’ Ã˜Â­Ã›Å’Ã™Ë†Ã˜Â§Ã™â€ Ã¢â‚¬Å’ Ã˜Â´Ã™â€¦Ã˜Â§ Ã˜Â³Ã™â€žÃ˜Â§Ã™â€¦Ã˜Âª Ã™Ë† Ã˜Â®Ã›Å’Ã˜Â§Ã™â€ž Ã˜Â´Ã™â€¦Ã˜Â§ Ã˜Â±Ã˜Â§Ã˜Â­Ã˜ÂªÃ™â€¡.</p>",
      Pic: "/images/s2.png", Lead: null, PreTitle: null, SubTitle: null, SeoLead: null, SeoTitle: null,
    },
    {
      Id: 3, Lang: 1, urlTitle: "products", Priority: 3, Type: 1, seen: 0,
      Title: "Ã™â€¦Ã˜Â­Ã˜ÂµÃ™Ë†Ã™â€žÃ˜Â§Ã˜Âª",
      Text: "<p>Ã˜Â¯Ã™Ë†Ã˜Â¯Ã™Ë†Ã˜ÂªÃ›Å’ Ã˜Â¯Ã™Ë†Ã˜Â³Ã˜Âª Ã˜Â­Ã›Å’Ã™Ë†Ã˜Â§Ã™â€ Ã¢â‚¬Å’ Ã˜Â®Ã˜Â§Ã™â€ ÃšÂ¯Ã›Å’ Ã˜Â´Ã™â€¦Ã˜Â§Ã˜Â³Ã˜Âª Ã™Ë† Ã˜Â³Ã™â€žÃ˜Â§Ã™â€¦Ã˜Âª Ã˜Â¬Ã˜Â³Ã™â€¦ Ã™Ë† Ã˜Â±Ã™Ë†Ã˜Â­ Ã˜Â§Ã™Ë†Ã™â€  Ã˜Â§Ã˜Â² Ã™â€¡Ã™â€¦Ã™â€¡ Ãšâ€ Ã›Å’Ã˜Â² Ã˜Â¨Ã˜Â±Ã˜Â§Ã˜Â´ Ã™â€¦Ã™â€¡Ã™â€¦Ã˜ÂªÃ˜Â±Ã™â€¡. Ã˜Â¨Ã˜Â±Ã˜Â§Ã›Å’ Ã™â€¡Ã™â€¦Ã›Å’Ã™â€  Ã™â€¦Ã˜Â­Ã˜ÂµÃ™Ë†Ã™â€žÃ˜Â§Ã˜Âª Ã˜Â¯Ã™Ë†Ã˜Â¯Ã™Ë†Ã˜ÂªÃ›Å’ Ã˜Â§Ã˜Â² Ã™â€ Ã˜Â¸Ã˜Â± ÃšÂ©Ã›Å’Ã™ÂÃ›Å’Ã˜Âª Ã˜Â¨Ã›Å’Ã¢â‚¬Å’Ã™â€ Ã˜Â¸Ã›Å’Ã˜Â±Ã™â€  Ã™Ë† ÃšÂ©Ã˜Â§Ã™â€¦Ã™â€žÃ˜Â§ Ã˜Â¨Ã™â€¡Ã˜Â¯Ã˜Â§Ã˜Â´Ã˜ÂªÃ›Å’ Ã™Ë† Ã˜Â¨Ã˜Â¯Ã™Ë†Ã™â€  Ã™â€¦Ã™Ë†Ã˜Â§Ã˜Â¯ Ã™â€ ÃšÂ¯Ã™â€¡Ã˜Â¯Ã˜Â§Ã˜Â±Ã™â€ Ã˜Â¯Ã™â€¡ Ã˜ÂªÃ™Ë†Ã™â€žÃ›Å’Ã˜Â¯ Ã™â€¦Ã›Å’Ã¢â‚¬Å’Ã˜Â´Ã™â€ .</p>",
      Pic: "/images/cat-handup.png", Lead: null, PreTitle: null, SubTitle: null, SeoLead: null, SeoTitle: null,
    },
    {
      Id: 4, Lang: 1, urlTitle: "home", Priority: 2, Type: 2, seen: 0,
      Title: "Ã˜Â¯Ã˜Â±Ã˜Â¨Ã˜Â§Ã˜Â±Ã™â€¡Ã¢â‚¬Å’Ã›Å’ Ã˜Â¯Ã™Ë†Ã˜Â¯Ã™Ë†Ã˜ÂªÃ›Å’",
      Text: "<p>Ã˜Â¯Ã™Ë†Ã˜Â¯Ã™Ë†Ã˜ÂªÃ›Å’ Ã›Å’Ã™â€¡ Ã˜Â¨Ã˜Â±Ã™â€ Ã˜Â¯ Ã˜Â¬Ã˜Â¯Ã›Å’Ã˜Â¯ Ã˜Â§Ã›Å’Ã˜Â±Ã˜Â§Ã™â€ Ã›Å’Ã™â€¡ ÃšÂ©Ã™â€¡ Ã™â€¦Ã˜Â­Ã˜ÂµÃ™Ë†Ã™â€žÃ˜Â§Ã˜Âª Ã˜ÂºÃ˜Â°Ã˜Â§Ã›Å’Ã›Å’ Ã™Ë† Ã˜Â¨Ã™â€¡Ã˜Â¯Ã˜Â§Ã˜Â´Ã˜ÂªÃ›Å’ Ã˜Â®Ã›Å’Ã™â€žÃ›Å’ Ã˜Â¨Ã˜Â§ÃšÂ©Ã›Å’Ã™ÂÃ›Å’Ã˜Âª Ã˜Â¨Ã˜Â±Ã˜Â§Ã›Å’ Ã˜Â­Ã›Å’Ã™Ë†Ã˜Â§Ã™â€ Ã¢â‚¬Å’Ã™â€¡Ã˜Â§Ã›Å’ Ã˜Â®Ã™Ë†Ã™â€ ÃšÂ¯Ã›Å’ Ã˜ÂªÃ™Ë†Ã™â€žÃ›Å’Ã˜Â¯ Ã™â€¦Ã›Å’Ã¢â‚¬Å’ÃšÂ©Ã™â€ Ã™â€¡.</p>",
      Pic: null, Lead: null, PreTitle: null, SubTitle: "Ã˜Â¨Ã›Å’Ã˜Â´Ã˜ÂªÃ˜Â±", SeoLead: "Ã˜ÂµÃ™ÂÃ˜Â­Ã™â€¡ Ã˜Â§Ã˜ÂµÃ™â€žÃ›Å’", SeoTitle: null,
    },
    {
      Id: 5, Lang: 1, urlTitle: "contact", Priority: 1, Type: 2, seen: 0,
      Title: "Ã˜ÂªÃ™â€¦Ã˜Â§Ã˜Â³ Ã˜Â¨Ã˜Â§ Ã™â€¦Ã˜Â§",
      Text: "<p>Ã˜Â§Ã˜Â·Ã™â€žÃ˜Â§Ã˜Â¹Ã˜Â§Ã˜Âª Ã˜ÂªÃ™â€¦Ã˜Â§Ã˜Â³<br /><strong>Ã˜ÂªÃ™â€žÃ™ÂÃ™â€ : </strong>Ã›Â°Ã›Â°Ã›Â¹Ã›Âµ Ã›Â²Ã›Â²Ã›Â±Ã›Â¹ Ã›Â²Ã›Â± Ã›Â¹Ã›Â¸+<br />Ã˜Â§Ã›Å’Ã™â€¦Ã›Å’Ã™â€ž: dudoticompany@gmail.com</p>",
      Pic: null, Lead: null, PreTitle: "dudoticompany@gmail.com", SubTitle: null, SeoLead: null, SeoTitle: "Ã˜ÂªÃ™â€¦Ã˜Â§Ã˜Â³ Ã˜Â¨Ã˜Â§ Ã™â€¦Ã˜Â§",
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
      Title: "Ãƒâ‚¬ propos de Dudoti",
      Text: "<p>dudoti est une nouvelle marque iranienne qui produit des aliments et des produits de santÃƒÂ© de haute qualitÃƒÂ© pour animaux de compagnie.</p>",
      Pic: "/images/s2.png", Lead: null, PreTitle: null, SubTitle: null, SeoLead: null, SeoTitle: null,
    },
    {
      Id: 13, Lang: 3, urlTitle: "products", Priority: 3, Type: 1, seen: 0,
      Title: "Produits",
      Text: "Dudoti est l'ami de votre animal et sa santÃƒÂ© physique et mentale est primordiale pour lui. C'est pourquoi les produits Dudoti sont d'une qualitÃƒÂ© inÃƒÂ©galÃƒÂ©e et fabriquÃƒÂ©s de maniÃƒÂ¨re parfaitement hygiÃƒÂ©nique et sans conservateurs.",
      Pic: "/images/s4.png", Lead: null, PreTitle: null, SubTitle: null, SeoLead: null, SeoTitle: null,
    },
    {
      Id: 14, Lang: 3, urlTitle: "home", Priority: 2, Type: 2, seen: 0,
      Title: "Ãƒâ‚¬ propos de Dudoti",
      Text: "Dudoti est une nouvelle marque iranienne qui fabrique des aliments et des produits de santÃƒÂ© de haute qualitÃƒÂ© pour animaux de compagnie.",
      Pic: null, Lead: null, PreTitle: null, SubTitle: "more", SeoLead: "Home", SeoTitle: null,
    },
    {
      Id: 15, Lang: 3, urlTitle: "contact", Priority: 1, Type: 2, seen: 0,
      Title: "Contactez-nous",
      Text: "CoordonnÃƒÂ©es\nTÃƒÂ©lÃƒÂ©phone : 0095 2219 21 98 ou plus\nCourriel : dudoticompany@gmail.com",
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

  console.log(`${pages.length} Ã˜ÂµÃ™ÂÃ˜Â­Ã™â€¡ Ã˜Â§Ã˜Â¶Ã˜Â§Ã™ÂÃ™â€¡ Ã˜Â´Ã˜Â¯`);
}
