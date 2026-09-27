import { createPrismaClient } from "./prismaClient";

const prisma = createPrismaClient();

export async function seedCharacters() {
  const characters = [
    // Ã¢â€â‚¬Ã¢â€â‚¬ Ã™ÂÃ˜Â§Ã˜Â±Ã˜Â³Ã›Å’ (Lang 1) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    {
      Id: 1,
      Lang: 1,
      Name: "Ã™Â¾Ã›Å’Ã˜Â´Ãšâ€ Ã™ÂÃ™â€ ÃšÂ©Ã™Ë†",
      BgColor: "#00c9e9",
      CSSClass: "cat",
      Img1: "/images/about/cat-1.png",
      Img2: "/images/about/cat-2.png",
      Priority: 1,
      Desc: `Ã˜ÂªÃ˜Â§ Ã˜Â­Ã˜Â§Ã™â€žÃ˜Â§ Ã˜Â¯Ã›Å’Ã˜Â¯Ã›Å’Ã™â€  Ã›Å’Ã˜Â§ Ã˜Â´Ã™â€ Ã›Å’Ã˜Â¯Ã›Å’Ã™â€  ÃšÂ©Ã™â€¡ Ã›Å’Ã™â€¡ ÃšÂ¯Ã˜Â±Ã˜Â¨Ã™â€¡ Ã˜Â¨Ã˜Â§Ã™â€¦Ã˜Â±Ã˜Â§Ã™â€¦ Ã˜Â¨Ã˜Â§Ã˜Â´Ã™â€¡Ã˜Å¸
Ã˜Â§ÃšÂ¯Ã™â€¡ Ã™â€¦Ã›Å’Ã¢â‚¬Å’ÃšÂ¯Ã›Å’Ã˜Â¯ Ã™â€ Ã™â€¡Ã˜Å’ Ã›Å’Ã˜Â¹Ã™â€ Ã›Å’ Ã™â€¡Ã™â€ Ã™Ë†Ã˜Â² Ã˜Â§Ã™ÂÃ˜ÂªÃ˜Â®Ã˜Â§Ã˜Â± Ã˜Â¢Ã˜Â´Ã™â€ Ã˜Â§Ã›Å’Ã›Å’ Ã˜Â¨Ã˜Â§ Ã™Â¾Ã›Å’Ã˜Â´Ãšâ€ Ã™â€ ÃšÂ©Ã™Ë†Ã›Å’ Ã™â€¦Ã˜Â§ Ã˜Â±Ã™Ë† Ã™Â¾Ã›Å’Ã˜Â¯Ã˜Â§ Ã™â€ ÃšÂ©Ã˜Â±Ã˜Â¯Ã›Å’Ã™â€ . Ã˜Â±Ã™ÂÃ›Å’Ã™â€šÃ¢â‚¬Å’Ã˜Â¨Ã˜Â§Ã˜Â²Ã¢â‚¬Å’Ã˜ÂªÃ˜Â±Ã›Å’Ã™â€ Ã˜Å’ Ã˜Â®Ã˜Â§ÃšÂ©Ã›Å’Ã¢â‚¬Å’Ã˜ÂªÃ˜Â±Ã›Å’Ã™â€ Ã˜Å’ Ã™â€¦Ã˜Â¹Ã˜Â§Ã˜Â´Ã˜Â±Ã˜ÂªÃ›Å’Ã¢â‚¬Å’Ã¢â‚¬Å’Ã˜ÂªÃ˜Â±Ã›Å’Ã™â€  Ã™Ë† Ã˜Â¯Ã˜Â± Ã˜Â¹Ã›Å’Ã™â€  Ã˜Â­Ã˜Â§Ã™â€ž Ã˜Â®Ã˜Â§Ã™â€žÃ›Å’Ã¢â‚¬Å’Ã˜Â¨Ã™â€ Ã˜Â¯Ã¢â‚¬Å’Ã˜ÂªÃ˜Â±Ã›Å’Ã™â€  Ã˜Â±Ã™ÂÃ›Å’Ã™â€šÃ›Å’ ÃšÂ©Ã™â€¡ Ã™â€¦Ã›Å’Ã¢â‚¬Å’Ã˜ÂªÃ™Ë†Ã™â€ Ã›Å’Ã˜Â¯ Ã˜Â¯Ã˜Â§Ã˜Â´Ã˜ÂªÃ™â€¡Ã¢â‚¬Å’Ã˜Â¨Ã˜Â§Ã˜Â´Ã›Å’Ã˜Â¯Ã˜Å’ Ã˜Â§Ã›Å’Ã™â€  ÃšÂ¯Ã˜Â±Ã˜Â¨Ã™â€¡Ã¢â‚¬Å’Ã›Å’ Ã˜Â®Ã™Ë†Ã˜Â´ÃšÂ¯Ã™â€žÃ™â€¡. Ã˜Â§Ã˜Â² Ã™â€¦Ã˜Â§Ã˜Â¬Ã˜Â±Ã˜Â§Ã˜Â¬Ã™Ë†Ã›Å’Ã›Å’ Ã™Ë† Ã˜Â¯Ã™Å½Ã˜Â¯Ã™Å½Ã˜Â±Ã›Å’ Ã˜Â¨Ã™Ë†Ã˜Â¯Ã™â€ Ã˜Â´ ÃšÂ©Ã™â€¡ Ã˜Â¯Ã›Å’ÃšÂ¯Ã™â€¡ Ã™â€ ÃšÂ¯Ã™â€¦ Ã˜Â¨Ã˜Â±Ã˜Â§Ã˜ÂªÃ™Ë†Ã™â€ . Ã˜Â§Ã˜ÂµÃ™â€žÃ˜Â§ Ã˜Â³Ã˜Â±Ã˜Â´ Ã˜Â¯Ã˜Â±Ã˜Â¯ Ã™â€¦Ã›Å’Ã¢â‚¬Å’ÃšÂ©Ã™â€ Ã™â€¡ Ã˜Â¨Ã˜Â±Ã˜Â§Ã›Å’ Ã™â€¦Ã˜Â§Ã˜Â¬Ã˜Â±Ã˜Â§ Ã™Ë† Ã˜Â¯Ã˜Â±Ã˜Â¯Ã˜Â³Ã˜Â±. Ã˜ÂªÃ™Ë† Ã˜Â²Ã™â€ Ã˜Â¯ÃšÂ¯Ã›Å’Ã˜Â´ Ã™ÂÃ™â€šÃ˜Â· Ã˜Â§Ã˜Â² Ã›Å’Ã™â€¡ Ãšâ€ Ã›Å’Ã˜Â² Ã™â€¦Ã›Å’Ã˜ÂªÃ˜Â±Ã˜Â³Ã™â€¡Ã˜Å’ Ã˜Â§Ã™Ë†Ã™â€  Ã™â€¡Ã™â€¦ Ã™â€¦Ã™Ë†Ã˜Â´Ã™â€¡! Ã˜Â±Ã˜Â§Ã˜Â³Ã˜ÂªÃ›Å’ Ã˜Â­Ã™Ë†Ã˜Â§Ã˜Â³Ã˜ÂªÃ™Ë†Ã™â€  Ã˜Â¨Ã˜Â§Ã˜Â´Ã™â€¡ Ã˜Â³Ã˜Â± Ã™ÂÃ™Ë†Ã˜ÂªÃ˜Â¨Ã˜Â§Ã™â€ž Ã˜Â¨Ã˜Â§Ã™â€¡Ã˜Â§Ã˜Â´ ÃšÂ©Ã™â€žÃ¢â‚¬Å’ÃšÂ©Ã™â€ž Ã™â€ ÃšÂ©Ã™â€ Ã›Å’Ã™â€ Ã˜Å’ Ã™â€¦Ã™â€¦ÃšÂ©Ã™â€ Ã™â€¡ Ã˜Â¨Ã˜Â§ Ã˜Â§Ã˜Â¹Ã˜ÂªÃ™â€¦Ã˜Â§Ã˜Â¯ Ã˜Â¨Ã™â€¡ Ã˜Â³Ã™â€šÃ™Â Ã™Ë† Ã˜Â­Ã˜Â§Ã˜Â¶Ã˜Â± Ã˜Â¬Ã™Ë†Ã˜Â§Ã˜Â¨Ã›Å’Ã˜Â´ Ã˜Â¨Ã˜Â¯Ã˜Â¬Ã™Ë†Ã˜Â±Ã›Å’ Ã˜Â¨Ãšâ€ Ã˜Â²Ã™Ë†Ã™â€ Ã˜ÂªÃ˜ÂªÃ™Ë†Ã™â€ . Ã™Ë†Ã™â€žÃ›Å’ Ã˜ÂºÃ™â€¦ Ã˜Â¨Ã™â€¡ Ã˜Â¯Ã™â€žÃ˜ÂªÃ™Ë†Ã™â€  Ã˜Â±Ã˜Â§Ã™â€¡ Ã™â€ Ã˜Â¯Ã›Å’Ã™â€ Ã˜Å’ Ã˜Â§Ã›Å’Ã™â€ Ã™â€šÃ˜Â¯Ã˜Â± Ã˜Â¨Ã˜Â§Ã™â€¦Ã˜Â±Ã˜Â§Ã™â€¦Ã™â€¡ ÃšÂ©Ã™â€¡ Ã˜Â¯Ã˜Â± ÃšÂ©Ã˜Â³Ã˜Â±Ã›Å’ Ã˜Â§Ã˜Â² Ã˜Â«Ã˜Â§Ã™â€ Ã›Å’Ã™â€¡ Ã˜Â§Ã˜Â² Ã˜Â¯Ã™â€žÃ˜ÂªÃ™Ë†Ã™â€  Ã˜Â¯Ã˜Â±Ã¢â‚¬Å’Ã™â€¦Ã›Å’Ã˜Â§Ã˜Â±Ã™â€¡.`,
    },
    {
      Id: 2,
      Lang: 1,
      Name: "Ã›Å’Ã˜Â§Ã›Å’Ã™Ë†Ã˜Â¨Ã›Å’",
      BgColor: "#c19ade",
      CSSClass: "dog",
      Img1: "/images/about/dog-1.png",
      Img2: "/images/about/dog-2.png",
      Priority: 2,
      Desc: `Ã˜Â®Ã˜Â¯Ã™â€¦Ã˜ÂªÃ˜ÂªÃ™Ë†Ã™â€  Ã˜Â¹Ã˜Â±Ã˜Â¶ Ã˜Â´Ã™Ë†Ã˜Â¯ ÃšÂ©Ã™â€¡ Ã˜Â§Ã›Å’Ã˜Â´Ã™Ë†Ã™â€  Ã›Å’Ã˜Â§Ã›Å’Ã™Ë†Ã˜Â¨Ã›Å’ Ã™â€¡Ã˜Â³Ã˜ÂªÃ™â€ Ã˜Å’ Ã›Å’Ã™â€¡ Ã˜Â³ÃšÂ¯ Ã˜Â±Ã™Ë†Ã˜Â´Ã™â€ Ã¢â‚¬Å’Ã™ÂÃšÂ©Ã˜Â±Ã˜Å’ Ã˜Â´Ã˜Â§Ã˜Â¹Ã˜Â±Ã™â€¦Ã˜Â³Ã™â€žÃšÂ© Ã™Ë† Ã˜Â®Ã›Å’Ã™â€žÃ›Å’ Ã˜Â¨Ã˜Â§Ã™â€¡Ã™Ë†Ã˜Â´. Ã˜Â¹Ã™â€žÃ˜Â§Ã™â€šÃ™â€¡Ã¢â‚¬Å’Ã›Å’ Ã˜Â§Ã˜ÂµÃ™â€žÃ›Å’ Ã›Å’Ã˜Â§Ã›Å’Ã™Ë†Ã˜Â¨Ã›Å’ Ã™â€¦Ã™Ë†Ã˜Â³Ã›Å’Ã™â€šÃ›Å’Ã™â€¡Ã˜Å’ Ã™â€¡Ã™â€¦Ã›Å’Ã˜Â´Ã™â€¡ Ã›Å’Ã˜Â§ Ã˜Â¯Ã˜Â± Ã˜Â­Ã˜Â§Ã™â€ž Ã˜Â¢Ã™â€¡Ã™â€ ÃšÂ¯ ÃšÂ¯Ã™Ë†Ã˜Â´ Ã˜Â¯Ã˜Â§Ã˜Â¯Ã™â€ Ã™â€¡ Ã›Å’Ã˜Â§ Ã˜Â¢Ã™Ë†Ã˜Â§Ã˜Â²Ã˜Â®Ã™Ë†Ã™â€ Ã˜Â¯Ã™â€  Ã›Å’Ã˜Â§ Ã˜Â³Ã˜Â§Ã˜Â² Ã˜Â²Ã˜Â¯Ã™â€ . Ã˜Â§Ã™â€žÃ˜Â¨Ã˜ÂªÃ™â€¡ Ã˜Â¨Ã›Å’Ã™â€  Ã˜Â®Ã™Ë†Ã˜Â¯Ã™â€¦Ã™Ë†Ã™â€  Ã˜Â¨Ã˜Â§Ã˜Â´Ã™â€¡Ã˜Å’ Ã˜Â¯Ã˜Â±Ã˜Â¨Ã˜Â§Ã˜Â±Ã™â€¡Ã¢â‚¬Å’Ã›Å’ Ã˜ÂµÃ˜Â¯Ã˜Â§Ã˜Â´ Ã˜Â¨Ã™â€¡Ã˜ÂªÃ˜Â±Ã™â€¡ Ã™â€ Ã™â€¡ Ã™â€¦Ã˜Â§ Ã˜Â­Ã˜Â±Ã™ÂÃ›Å’ Ã˜Â¨Ã˜Â²Ã™â€ Ã›Å’Ã™â€¦ Ã™Ë† Ã™â€ Ã™â€¡ Ã˜Â®Ã™Ë†Ã˜Â¯Ã˜ÂªÃ™Ë†Ã™â€  Ã˜Â¨Ã˜Â´Ã™â€ Ã™Ë†Ã›Å’Ã™â€ . Ã›Å’Ã˜Â§Ã›Å’Ã™Ë†Ã˜Â¨Ã›Å’ Ã™â€¡Ã™â€¦Ã›Å’Ã˜Â´Ã™â€¡ Ã™â€šÃ˜Â±Ã˜ÂªÃ›Å’ Ã™Ë† Ã˜Â¢Ã™â€žÃ˜Â§Ã™â€¦Ã˜Â¯Ã™â€¡ Ã™Ë† Ã˜Â³Ã›Å’Ã˜Â§ÃšËœ Ã˜Â¹Ã˜Â·Ã˜Â±Ã˜Â´ Ã˜Â¯Ã™â€ž Ã™Ë† Ã˜Â¯Ã›Å’Ã™â€  Ã™â€¦Ã›Å’Ã˜Â¨Ã˜Â±Ã™â€¡. Ã™Ë†Ã˜Â³Ã™Ë†Ã˜Â§Ã˜Â³Ã›Å’ Ã™â€¡Ã™â€¦ Ã™â€¡Ã˜Â³Ã˜Âª Ã™Ë† Ã˜Â®Ã›Å’Ã™â€žÃ›Å’ Ã˜Â¨Ã˜Â§Ã›Å’Ã˜Â¯ Ã˜Â­Ã™Ë†Ã˜Â§Ã˜Â³ Ã˜Â¬Ã™â€¦Ã˜Â¹ Ã˜Â¨Ã˜Â§Ã˜Â´Ã›Å’Ã™â€¦ ÃšÂ©Ã™â€¡ Ã˜Â´Ã™â€žÃ˜Â®Ã˜ÂªÃšÂ¯Ã›Å’ Ã™Ë† Ã˜Â¨Ã›Å’Ã¢â‚¬Å’Ã˜Â³Ã™â€žÃ›Å’Ã™â€šÃšÂ¯Ã›Å’ Ã™â€ ÃšÂ©Ã™â€ Ã›Å’Ã™â€¦Ã˜Å’ Ã˜Â¢Ã˜Â®Ã™â€¡ Ã˜Â®Ã›Å’Ã™â€žÃ›Å’ Ã™â€¡Ã™â€¦ Ã˜ÂºÃ˜Â±Ã˜ÂºÃ˜Â±Ã™Ë† Ã™Ë† Ã˜Â²Ã™Ë†Ã˜Â¯Ã˜Â±Ã™â€ Ã˜Â¬Ã™â€¡. Ã›Å’Ã˜Â¹Ã™â€ Ã›Å’ Ã˜Â§ÃšÂ¯Ã™â€¡ Ã˜Â¨Ã›Å’Ã™ÂÃ˜ÂªÃ™â€¡ Ã˜Â±Ã™Ë† Ã˜Â®Ã˜Â· Ã˜ÂºÃ˜Â±Ã˜Â²Ã˜Â¯Ã™â€  Ã˜Â¯Ã›Å’ÃšÂ¯Ã™â€¡ Ã˜ÂªÃ™Ë†Ã™â€šÃ™Â Ã™â€ Ã˜Â¯Ã˜Â§Ã˜Â±Ã™â€¡. Ã˜Â¨Ã˜Â§ Ã˜Â§Ã›Å’Ã™â€  Ã™â€¡Ã™â€¦Ã™â€¡Ã˜Å’ Ã™â€¦Ã™Ë†Ã˜Â¬Ã™Ë†Ã˜Â¯Ã›Å’ Ã˜Â¨Ã˜Â³Ã›Å’Ã˜Â§Ã˜Â± Ã˜Â¯Ã™Ë†Ã˜Â³Ã˜ÂªÃ¢â‚¬Å’Ã˜Â¯Ã˜Â§Ã˜Â´Ã˜ÂªÃ™â€ Ã›Å’Ã™â€¡ Ã™Ë† Ã˜Â§ÃšÂ¯Ã™â€¡ Ã˜Â¨Ã˜Â§ ÃšÂ©Ã˜Â³Ã›Å’ Ã˜Â¯Ã™Ë†Ã˜Â³Ã˜Âª Ã˜Â¨Ã˜Â´Ã™â€¡ Ã˜ÂªÃ™Ë† Ã˜Â±Ã™ÂÃ˜Â§Ã™â€šÃ˜Âª ÃšÂ©Ã™â€¦ Ã™â€ Ã™â€¦Ã›Å’Ã˜Â²Ã˜Â§Ã˜Â±Ã™â€¡.`,
    },
    {
      Id: 3,
      Lang: 1,
      Name: "Ã˜Â§Ã™ÂÃ™â€žÃ˜Â§Ã˜Â¯Ã™Ë†Ã™â€ ",
      BgColor: "#00bda4",
      CSSClass: "rabbit",
      Img1: "/images/about/rabbit-1.png",
      Img2: "/images/about/rabbit-2.png",
      Priority: 3,
      Desc: `Ã˜Â§Ã™ÂÃ™â€žÃ˜Â§Ã˜Â¯Ã™Ë†Ã™â€  Ã›Å’ÃšÂ©Ã›Å’ Ã˜Â§Ã˜Â² Ã˜Â¨Ã›Å’Ã¢â‚¬Å’Ã˜Â±Ã›Å’Ã˜Â§Ã¢â‚¬Å’Ã˜ÂªÃ˜Â±Ã›Å’Ã™â€  Ã˜Â®Ã˜Â±ÃšÂ¯Ã™Ë†Ã˜Â´Ã¢â‚¬Å’Ã™â€¡Ã˜Â§Ã›Å’Ã›Å’Ã™â€¡ ÃšÂ©Ã™â€¡ Ã™â€¦Ã™â€¦ÃšÂ©Ã™â€ Ã™â€¡ Ã˜ÂªÃ™Ë† Ã˜Â²Ã™â€ Ã˜Â¯ÃšÂ¯Ã›Å’Ã˜ÂªÃ™Ë†Ã™â€  Ã˜Â¨Ã˜Â§Ã™â€¡Ã˜Â§Ã˜Â´ Ã˜Â¢Ã˜Â´Ã™â€ Ã˜Â§ Ã˜Â¨Ã˜Â´Ã›Å’Ã˜Â¯. Ã˜Â§Ã›Å’Ã™â€  Ã˜Â¨Ãšâ€ Ã™â€¡ Ã˜Â¹Ã›Å’Ã™â€  ÃšÂ©Ã™Â Ã˜Â¯Ã˜Â³Ã˜Âª Ã˜Â¨Ã›Å’Ã¢â‚¬Å’Ã˜ÂºÃ˜Â´Ã™â€¡ Ã™Ë† Ã™â€¦Ã˜Â­Ã˜Â§Ã™â€žÃ™â€¡ Ã˜Â¨Ã™â€¡Ã˜Â´ Ã˜Â¹Ã™â€žÃ˜Â§Ã™â€šÃ™â€¦Ã™â€ Ã˜Â¯ Ã™â€ Ã˜Â´Ã›Å’Ã˜Â¯. Ã™â€¦Ã˜Â¬Ã™â€¦Ã™Ë†Ã˜Â¹Ã™â€¡Ã¢â‚¬Å’Ã›Å’ Ã˜Â¹Ã™â€žÃ˜Â§Ã™â€šÃ™â€¦Ã™â€ Ã˜Â¯Ã›Å’Ã¢â‚¬Å’Ã™â€¡Ã˜Â§Ã›Å’ Ã˜Â§Ã™ÂÃ™â€žÃ˜Â§Ã˜Â¯Ã™Ë†Ã™â€  Ã˜Â®Ã›Å’Ã™â€žÃ›Å’ Ã™Ë†Ã˜Â³Ã›Å’Ã˜Â¹Ã™â€¡: Ã˜Â§Ã˜Â² Ã˜Â®Ã™Ë†Ã˜Â§Ã˜Â¨ Ã™Ë† Ã˜Â®Ã™Ë†Ã˜Â± Ã™Ë† ÃšÂ¯Ã™ÂÃ™â€ž ÃšÂ¯Ã˜Â±Ã™ÂÃ˜ÂªÃ™â€¡ Ã˜ÂªÃ˜Â§ Ã™â€¡Ã™â€ Ã˜Â± Ã™Ë† Ã™ÂÃ™â€žÃ˜Â³Ã™ÂÃ™â€¡ Ã™Ë† Ã˜Â­Ã˜Â±Ã™ÂÃ¢â‚¬Å’Ã™â€¡Ã˜Â§Ã›Å’ Ã™â€šÃ™â€žÃ™â€ Ã˜Â¨Ã™â€¡Ã¢â‚¬Å’Ã˜Â³Ã™â€žÃ™â€ Ã˜Â¨Ã™â€¡. Ã˜Â§Ã™â€žÃ˜Â¨Ã˜ÂªÃ™â€¡ Ã™â€ Ã˜Â§ÃšÂ¯Ã™ÂÃ˜ÂªÃ™â€¡ Ã™â€ Ã™â€¦Ã™Ë†Ã™â€ Ã™â€¡ ÃšÂ©Ã™â€¡ Ã›Å’Ã™â€¡Ã¢â‚¬Å’ÃšÂ©Ã™â€¦ Ã˜Â®Ã˜Â±Ã˜Â§Ã™ÂÃ˜Â§Ã˜ÂªÃ›Å’ Ã™â€¡Ã™â€¦ Ã™â€¡Ã˜Â³Ã˜ÂªÃ˜Å’ Ã™â€¡Ã˜Â±Ãšâ€ Ã™â€ Ã˜Â¯ Ã˜Â®Ã™Ë†Ã˜Â¯Ã˜Â´ Ã˜ÂªÃšÂ©Ã˜Â°Ã›Å’Ã˜Â¨ Ã™â€¦Ã›Å’Ã¢â‚¬Å’ÃšÂ©Ã™â€ Ã™â€¡Ã˜Å’ Ã™Ë†Ã™â€žÃ›Å’ Ã˜Â®Ã˜Â¨! Ã˜Â¨Ã™â€¡ Ã™Â¾Ã›Å’Ã˜Â´Ã™Ë†Ã™â€ Ã›Å’ Ã˜Â¨Ã™â€žÃ™â€ Ã˜Â¯Ã˜Â´ Ã˜Â®Ã›Å’Ã™â€žÃ›Å’ Ã™â€¦Ã›Å’Ã¢â‚¬Å’Ã™â€ Ã˜Â§Ã˜Â²Ã™â€¡. Ã™â€šÃ˜Â¨Ã™â€ž Ã˜Â§Ã˜Â² Ã™â€¡Ã˜Â± Ã˜ÂªÃ˜ÂµÃ™â€¦Ã›Å’Ã™â€¦ Ã™â€¦Ã™â€¡Ã™â€¦Ã›Å’ Ã™ÂÃ˜Â§Ã™â€ž Ã™â€¦Ã›Å’Ã¢â‚¬Å’ÃšÂ¯Ã›Å’Ã˜Â±Ã™â€¡ Ã™Ë† Ã˜Â¯Ã˜Â§Ã˜Â¦Ã™â€¦Ã˜Â§ Ã˜Â¯Ã˜Â§Ã˜Â±Ã™â€¡ Ã˜ÂªÃ™â€šÃ¢â‚¬Å’Ã˜ÂªÃ™â€š Ã™â€¦Ã›Å’Ã¢â‚¬Å’ÃšÂ©Ã™Ë†Ã˜Â¨Ã™â€¡ Ã˜Â¨Ã™â€¡ Ãšâ€ Ã™Ë†Ã˜Â¨. Ã˜Â±Ã˜Â§Ã˜Â³Ã˜ÂªÃ›Å’ Ã˜Â§Ã™ÂÃ™â€žÃ˜Â§Ã˜Â¯Ã™Ë†Ã™â€  Ã˜Â§Ã˜Â² Ã˜Â§Ã™Ë†Ã™â€  Ã˜Â¬Ã™â€ Ã˜Â³ Ã™â€¦Ã™Ë†Ã˜Â¬Ã™Ë†Ã˜Â¯Ã˜Â§Ã˜ÂªÃ›Å’Ã™â€¡ ÃšÂ©Ã™â€¡ Ã˜Â¯Ã˜Â±Ã˜Â¨Ã˜Â§Ã˜Â±Ã˜Â´Ã™Ë†Ã™â€  Ã™â€¦Ã›Å’Ã¢â‚¬Å’ÃšÂ¯Ã™â€  Ã˜Â¯Ã˜Â³Ã˜ÂªÃ¢â‚¬Å’Ã˜Â´Ã™Ë†Ã™â€  Ã˜Â¨Ã™â€¡ ÃšÂ©Ã™â€¦ Ã™â€ Ã™â€¦Ã›Å’Ã˜Â±Ã™â€¡. Ã˜Â®Ã™â€žÃ˜Â§Ã˜ÂµÃ™â€¡Ã˜Å’ Ã˜Â§Ã›Å’Ã™â€  ÃšÂ¯Ã™Ë†Ã˜Â´ Ã˜Â¯Ã˜Â§Ã˜Â²Ã™Â Ã˜Â®Ã™Â¾Ã™â€ž Ã˜Â§Ã›Å’Ã™â€ Ã¢â‚¬Å’Ã™â€šÃ˜Â¯Ã˜Â± Ã™â€¦Ã™â€¡Ã˜Â±Ã˜Â¨Ã™Ë†Ã™â€ Ã™â€¡ ÃšÂ©Ã™â€¡ Ã˜Â¯Ã˜Â± Ã˜Â¯Ã™â€¦ Ã˜Â¯Ã™â€žÃ˜ÂªÃ™Ë†Ã™â€  Ã˜Â±Ã™Ë† Ã˜Â§Ã˜Â³Ã›Å’Ã˜Â±Ã™Â Ã˜Â®Ã™Ë†Ã˜Â¯Ã˜Â´ Ã™â€¦Ã›Å’Ã¢â‚¬Å’ÃšÂ©Ã™â€ Ã™â€¡.`,
    },

    // Ã¢â€â‚¬Ã¢â€â‚¬ English (Lang 2) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    {
      Id: 4,
      Lang: 2,
      Name: "Pishchinko",
      BgColor: "#00c9e9",
      CSSClass: "cat",
      Img1: "/images/about/cat-1.png",
      Img2: "/images/about/cat-2.png",
      Priority: 1,
      Desc: `Ever met a cat with real street cred? If your answer is no, you simply haven't had the pleasure of meeting our Pishchinko yet. The most loyal, down-to-earth, social Ã¢â‚¬â€ and admittedly the most boastful Ã¢â‚¬â€ friend you could ever have is this gorgeous cat. Don't even get us started on his love for adventure and mischief; he practically lives for it. The only thing he's ever scared of in life is a mouse! Oh, and a word of warning: don't get into a football argument with him Ã¢â‚¬â€ his confidence and quick wit might just leave you completely stumped. But don't worry, he's so genuine that he'll win your heart back in a fraction of a second.`,
    },
    {
      Id: 5,
      Lang: 2,
      Name: "Yayobi",
      BgColor: "#c19ade",
      CSSClass: "dog",
      Img1: "/images/about/dog-1.png",
      Img2: "/images/about/dog-2.png",
      Priority: 2,
      Desc: `Allow us to introduce Yayobi Ã¢â‚¬â€ a free-thinking, poetic-souled, and incredibly intelligent dog. Music is Yayobi's true passion; he's always either listening to a song, singing along, or playing an instrument. Though, between us, it's better if neither of us comments on his singing voice Ã¢â‚¬â€ or hears it, for that matter. Yayobi is always impeccably dressed and his cologne is positively intoxicating. He's also a bit of a perfectionist, so you'd better stay tidy and tasteful around him, because he can be quite the grumbler Ã¢â‚¬â€ once he starts complaining, there's no stopping him. All that said, he's an incredibly loveable soul, and once he calls you a friend, he'll never let you down.`,
    },
    {
      Id: 6,
      Lang: 2,
      Name: "Afladoon",
      BgColor: "#00bda4",
      CSSClass: "rabbit",
      Img1: "/images/about/rabbit-1.png",
      Img2: "/images/about/rabbit-2.png",
      Priority: 3,
      Desc: `Afladoon is one of the most sincere rabbits you'll ever have the fortune of meeting in your life. This little one is as transparent as glass, and it's simply impossible not to fall for him. Afladoon's range of interests is vast: from sleeping, eating, and flowers, all the way to art, philosophy, and grand, lofty ideas. It must be said, though, that he's a tiny bit superstitious Ã¢â‚¬â€ even if he denies it! He takes great pride in his broad forehead, consults fortune tellers before any major decision, and is forever knocking on wood. Afladoon is the kind of soul people describe as generous to a fault. In short, this chubby long-eared sweetheart is so warm that he'll capture your heart on the spot.`,
    },

    // Ã¢â€â‚¬Ã¢â€â‚¬ FranÃƒÂ§ais (Lang 3) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
    {
      Id: 7,
      Lang: 3,
      Name: "Pishchinko",
      BgColor: "#00c9e9",
      CSSClass: "cat",
      Img1: "/images/about/cat-1.png",
      Img2: "/images/about/cat-2.png",
      Priority: 1,
      Desc: `Avez-vous dÃƒÂ©jÃƒÂ  rencontrÃƒÂ© un chat vraiment respectable ? Si votre rÃƒÂ©ponse est non, c'est que vous n'avez pas encore eu le plaisir de faire la connaissance de notre Pishchinko. Le plus loyal, le plus terre-ÃƒÂ -terre, le plus sociable Ã¢â‚¬â€ et, avouons-le, le plus vantard Ã¢â‚¬â€ des amis que vous pourriez jamais avoir, c'est ce beau matou. Ne nous lancez mÃƒÂªme pas sur son amour de l'aventure et de l'agitation ; il en vit littÃƒÂ©ralement. La seule chose qui l'effraie dans la vie, c'est une souris ! Et un conseil : n'entrez jamais dans une dispute de football avec lui Ã¢â‚¬â€ son assurance et sa rÃƒÂ©partie pourraient bien vous laisser sans voix. Mais ne vous inquiÃƒÂ©tez pas, il est tellement authentique qu'il reconquerra votre cÃ…â€œur en une fraction de seconde.`,
    },
    {
      Id: 8,
      Lang: 3,
      Name: "Yayobi",
      BgColor: "#c19ade",
      CSSClass: "dog",
      Img1: "/images/about/dog-1.png",
      Img2: "/images/about/dog-2.png",
      Priority: 2,
      Desc: `Permettez-nous de vous prÃƒÂ©senter Yayobi Ã¢â‚¬â€ un chien ÃƒÂ  l'esprit libre, ÃƒÂ  l'ÃƒÂ¢me poÃƒÂ©tique et incroyablement intelligent. La musique est sa vÃƒÂ©ritable passion ; il est toujours en train d'ÃƒÂ©couter une chanson, de la fredonner ou de jouer d'un instrument. Cela dit, entre nous, il vaut mieux ne pas commenter sa voix Ã¢â‚¬â€ ni l'entendre, d'ailleurs. Yayobi est toujours impeccablement mis et son parfum est absolument enivrant. Il est aussi un peu perfectionniste, alors veillez ÃƒÂ  rester soignÃƒÂ© et de bon goÃƒÂ»t en sa prÃƒÂ©sence, car il peut ÃƒÂªtre assez ronchon Ã¢â‚¬â€ une fois lancÃƒÂ© dans ses plaintes, rien ne l'arrÃƒÂªte. Cela dit, c'est une ÃƒÂ¢me incroyablement attachante, et quand il vous considÃƒÂ¨re comme un ami, il ne vous laissera jamais tomber.`,
    },
    {
      Id: 9,
      Lang: 3,
      Name: "Afladoon",
      BgColor: "#00bda4",
      CSSClass: "rabbit",
      Img1: "/images/about/rabbit-1.png",
      Img2: "/images/about/rabbit-2.png",
      Priority: 3,
      Desc: `Afladoon est l'un des lapins les plus sincÃƒÂ¨res que vous aurez la chance de rencontrer dans votre vie. Ce petit ÃƒÂªtre est transparent comme du cristal, et il est tout simplement impossible de ne pas craquer pour lui. Les centres d'intÃƒÂ©rÃƒÂªt d'Afladoon sont trÃƒÂ¨s vastes : du sommeil, de la nourriture et des fleurs jusqu'ÃƒÂ  l'art, la philosophie et les grandes idÃƒÂ©es. Il faut bien admettre qu'il est un tout petit peu superstitieux Ã¢â‚¬â€ mÃƒÂªme s'il le nie ! Il est trÃƒÂ¨s fier de son grand front, consulte les augures avant toute dÃƒÂ©cision importante et ne cesse de toucher du bois. Afladoon est le genre d'ÃƒÂªtre dont on dit qu'il est gÃƒÂ©nÃƒÂ©reux sans compter. Bref, ce doux lapin potelÃƒÂ© aux longues oreilles est si chaleureux qu'il capturera votre cÃ…â€œur sur-le-champ.`,
    },
  ];

  for (const c of characters) {
    await prisma.character.upsert({
      where: { Id: c.Id },
      update: c,
      create: c,
    });
  }

  console.log(`${characters.length} Ã˜Â´Ã˜Â®Ã˜ÂµÃ›Å’Ã˜Âª Ã˜Â§Ã˜Â¶Ã˜Â§Ã™ÂÃ™â€¡ Ã˜Â´Ã˜Â¯`);
}
