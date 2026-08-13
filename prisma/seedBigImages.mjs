import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rows = [
  {
    Id: 1,
    Pic1: "/images/Theme/cat-1.png",
    Title: "پیشچِنکو",
    Priority: 3,
    Link: null,
    Text2: `تا حالا دیدین یا شنیدین که یه گربه بامرام باشه؟
اگه می‌گید نه، یعنی هنوز افتخار آشنایی با پیشچنکوی ما رو پیدا نکردین. رفیق‌باز‌ترین، خاکی‌ترین، معاشرتی‌‌ترین و در عین حال خالی‌بند‌ترین رفیقی که می‌تونید داشته‌باشید، این گربه‌ی خوشگله. از ماجراجویی و دَدَری بودنش که دیگه نگم براتون. اصلا سرش درد می‌کنه برای ماجرا و دردسر. تو زندگیش فقط از یه چیز میترسه، اون هم موشه! راستی حواستون باشه سر فوتبال باهاش کل‌کل نکنین، ممکنه با اعتماد به سقف وحاضر جوابیش بدجوری بچزونتتون. ولی غم به دلتون راه ندین، اینقدر بامرامه که در کسری از ثانیه از دلتون در‌میاره.`,
    Pic2: "/images/Theme/cat-2.png",
    Type: 1,
    Class: "cat",
    Lang: 1,
  },
  {
    Id: 2,
    Pic1: "/images/Theme/dog-1.png",
    Title: "یایوبی",
    Priority: 2,
    Link: null,
    Text2: `خدمتتون عرض شود که ایشون یایوبی هستن، یه سگ روشن‌فکر، شاعرمسلک و خیلی باهوش. علاقه‌ی اصلی یایوبی موسیقیه، همیشه یا در حال آهنگ گوش دادنه یا آوازخوندن یا ساز زدن. البته بین خودمون باشه، درباره‌ی صداش بهتره نه ما حرفی بزنیم و نه خودتون بشنوین. یایوبی همیشه قرتی و آلامده و سیاژ عطرش دل و دین میبره. وسواسی هم هست و خیلی باید حواس جمع باشیم که شلختگی و بی‌سلیقگی نکنیم، آخه خیلی هم غرغرو و زودرنجه. یعنی اگه بیفته رو خط غرزدن دیگه توقف نداره. با این همه، موجودی بسیار دوست‌داشتنیه و اگه با کسی دوست بشه تو رفاقت کم نمیزاره.`,
    Pic2: "/images/Theme/dog-2.png",
    Type: 1,
    Class: "dog",
    Lang: 1,
  },
  {
    Id: 3,
    Pic1: "/images/Theme/rabbit-1.png",
    Title: "افلادون",
    Priority: 1,
    Link: null,
    Text2: `افلادون یکی از بی‌ریا‌ترین خرگوش‌هاییه که ممکنه تو زندگیتون باهاش آشنا بشید. این بچه عین کف دست بی‌غشه و محاله بهش علاقمند نشید. مجموعه‌ی علاقمندی‌های افلادون خیلی وسیعه: از خواب و خور و گُل گرفته تا هنر و فلسفه و حرف‌های قلنبه‌سلنبه. البته ناگفته نمونه که یه‌کم خرافاتی هم هست، هرچند خودش تکذیب می‌کنه، ولی خب! به پیشونی بلندش خیلی می‌نازه. قبل از هر تصمیم مهمی فال می‌گیره و دائما داره تق‌تق می‌کوبه به چوب. حالا اگه براتون سوال پیش اومده که ربط فلسفه و خرافه به‌هم چیه، اون رو دیگه باید از خود افلادون بپرسید. راستی افلادون از اون جنس موجوداتیه که دربارشون می‌گن دست‌شون به کم نمیره. خلاصه، این گوش دازِ خپل این‌قدر مهربونه که در دم دلتون رو اسیرِ خودش می‌کنه.`,
    Pic2: "/images/Theme/rabbit-2.png",
    Type: 1,
    Class: "rabbit",
    Lang: 1,
  },
  {
    Id: 4,
    Pic1: "/images/Theme/cat-1.png",
    Title: "Pishchenko",
    Priority: 3,
    Link: null,
    Text2: `Have you ever seen or heard of a cat being calm?
If you say no, then you haven't had the honor of meeting our Pishchenko yet. The most friendly, down-to-earth, sociable and at the same time the most relaxed friend you could have, this beautiful cat. I won't tell you about his adventurousness and his fearlessness. He doesn't give a damn about adventures and trouble. He's only afraid of one thing in his life, and that's mice! Be careful not to mess with him at football, he might bite you badly with his trust in the ceiling and his ready answers. But don't let sadness enter your heart, he's so calm that he'll rip you out of your heart in a split second.`,
    Pic2: "/images/Theme/cat-2.png",
    Type: 1,
    Class: "cat",
    Lang: 2,
  },
  {
    Id: 5,
    Pic1: "/images/Theme/dog-1.png",
    Title: "Yayubi",
    Priority: 2,
    Link: null,
    Text2: `Let me tell you that this is Yayubi, an intellectual dog, a professional poet, and very intelligent. Yayubi's main interest is music, he is always either listening to music, singing, or playing an instrument. Of course, between us, it is better for us not to talk about his voice and for you to hear it yourself. Yayubi is always sad and worried, and his scent of siag is heart-wrenching. He is also obsessive, and we have to be very careful not to be sloppy and tasteless, because he is also very grumpy and irritable. That is, if he gets into the habit of growling, he will never stop. Despite all this, he is a very lovable creature, and if he becomes friends with someone, he will not be lacking in companionship.`,
    Pic2: "/images/Theme/dog-2.png",
    Type: 1,
    Class: "dog",
    Lang: 2,
  },
  {
    Id: 6,
    Pic1: "/images/Theme/rabbit-1.png",
    Title: "Afladon",
    Priority: 1,
    Link: null,
    Text2: `Afladon is one of the most honest rabbits you will ever meet. This kid is as innocent as a palm and it is impossible not to be interested in him. Afladon's interests are very wide: from sleeping, eating, and flowers to art, philosophy, and gossip. Of course, it goes without saying that he is also a bit superstitious, although he denies it himself, but hey! He is very fond of his high forehead. Before every important decision, he consults fortune-tellers and is constantly knocking on wood. Now, if you have a question about what philosophy and superstition have to do with each other, you should ask Afladon himself. Indeed, Afladon is one of those creatures about whom they say that their hands are never short. In short, this attentive listener is so kind that he will capture your heart in an instant.`,
    Pic2: "/images/Theme/rabbit-2.png",
    Type: 1,
    Class: "rabbit",
    Lang: 2,
  },
  {
    Id: 7,
    Pic1: "/images/Theme/cat-1.png",
    Title: "Pishchenko",
    Priority: 3,
    Link: null,
    Text2: `Avez-vous déjà vu ou entendu parler d'un chat calme ?
Si vous répondez non, vous n'avez pas encore eu l'honneur de rencontrer notre Pishchenko. L'ami le plus amical, le plus terre-à-terre, le plus sociable et en même temps le plus détendu que vous puissiez avoir, ce magnifique chat. Je ne vous parlerai pas de son côté aventureux et de son intrépidité. Il se fiche éperdument des aventures et des ennuis. Il n'a peur que d'une chose dans la vie : les souris ! Attention à ne pas le taquiner au football, il pourrait vous mordre gravement avec sa confiance en soi et ses réponses toutes faites. Mais ne laissez pas la tristesse vous envahir, il est si calme qu'il vous arracherait votre cœur en une fraction de seconde.`,
    Pic2: "/images/Theme/cat-2.png",
    Type: 1,
    Class: "cat",
    Lang: 3,
  },
  {
    Id: 8,
    Pic1: "/images/Theme/dog-1.png",
    Title: "Yayubi",
    Priority: 2,
    Link: null,
    Text2: `Voici Yayubi, un chien intellectuel, poète professionnel et très intelligent. Son principal intérêt est la musique ; il est toujours en train d'écouter de la musique, de chanter ou de jouer d'un instrument. Bien sûr, entre nous, il vaut mieux ne pas parler de sa voix et que vous l'entendiez par vous-même. Yayubi est toujours triste et inquiet, et son odeur de siag est déchirante. Il est également obsessionnel, et nous devons faire très attention à ne pas être négligents et de mauvais goût, car il est aussi très grincheux et irritable. Autrement dit, s'il prend l'habitude de grogner, il ne s'arrêtera jamais. Malgré tout, c'est une créature très attachante, et s'il se lie d'amitié avec quelqu'un, il ne manquera pas de compagnie.`,
    Pic2: "/images/Theme/dog-2.png",
    Type: 1,
    Class: "dog",
    Lang: 3,
  },
  {
    Id: 9,
    Pic1: "/images/Theme/rabbit-1.png",
    Title: "Afladon",
    Priority: 1,
    Link: null,
    Text2: `Afladon est l'un des lapins les plus honnêtes que vous puissiez rencontrer. Ce gamin est innocent comme un sou neuf et il est impossible de ne pas s'intéresser à lui. Ses centres d'intérêt sont très variés : du sommeil à la nourriture, en passant par les fleurs, l'art, la philosophie et les ragots. Bien sûr, il est aussi un peu superstitieux, même s'il s'en défend lui-même, mais bon ! Il adore son front haut. Avant chaque décision importante, il consulte des diseurs de bonne aventure et touche constamment du bois. Si vous vous demandez quel est le lien entre philosophie et superstition, posez la question à Afladon lui-même. En effet, Afladon est de ces créatures dont on dit qu'elles n'ont jamais les mains courtes. En bref, cet auditeur attentif est si gentil qu'il vous séduira instantanément.`,
    Pic2: "/images/Theme/rabbit-2.png",
    Type: 1,
    Class: "rabbit",
    Lang: 3,
  },
];

async function main() {
  console.log("🌱 Seeding BigImage...");
  for (const row of rows) {
    await prisma.bigImage.upsert({
      where: { Id: row.Id },
      update: row,
      create: row,
    });
    console.log(`  ✓ Id=${row.Id} — ${row.Title} (Lang=${row.Lang})`);
  }
  console.log("✅ Done!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
