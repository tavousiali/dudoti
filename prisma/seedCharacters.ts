import { createPrismaClient } from "./prismaClient";

const prisma = createPrismaClient();

export async function seedCharacters() {
  const characters = [
    // ===== Lang 1 (Persian) =====
    { Id: 1, Lang: 1, Name: "پیشچِنکو", Desc: "تا حالا دیدین یا شنیدین که یه گربه بامرام باشه؟\nاگه می‌گید نه، یعنی هنوز افتخار آشنایی با پیشچنکوی ما رو پیدا نکردین. رفیق‌باز‌ترین، خاکی‌ترین، معاشرتی‌‌ترین و در عین حال خالی‌بند‌ترین رفیقی که می‌تونید داشته‌باشید، این گربه‌ی خوشگله. از ماجراجویی و دَدَری بودنش که دیگه نگم براتون. اصلا سرش درد می‌کنه برای ماجرا و دردسر. تو زندگیش فقط از یه چیز میترسه، اون هم موشه! راستی حواستون باشه سر فوتبال باهاش کل‌کل نکنین، ممکنه با اعتماد به سقف و حاضر جوابیش بدجوری بچزونتتون. ولی غم به دلتون راه ندین، اینقدر بامرامه که در کسری از ثانیه از دلتون در‌میاره.",
      Img1: "/images/about/cat-1.png", Img2: "/images/about/cat-2.png",
      BgColor: "#00c9e9", CSSClass: "cat", Priority: 1 },
    { Id: 2, Lang: 1, Name: "یایوبی", Desc: "خدمتتون عرض شود که ایشون یایوبی هستن، یه سگ روشن‌فکر، شاعرمسلک و خیلی باهوش. علاقه‌ی اصلی یایوبی موسیقیه، همیشه یا در حال آهنگ گوش دادنه یا آوازخوندن یا ساز زدن. البته بین خودمون باشه، درباره‌ی صداش بهتره نه ما حرفی بزنیم و نه خودتون بشنوین. یایوبی همیشه قرتی و آلامده و سیاژ عطرش دل و دین میبره. وسواسی هم هست و خیلی باید حواس جمع باشیم که شلختگی و بی‌سلیقگی نکنیم، آخه خیلی هم غرغرو و زودرنجه. یعنی اگه بیفته رو خط غرزدن دیگه توقف نداره. با این همه، موجودی بسیار دوست‌داشتنیه و اگه با کسی دوست بشه تو رفاقت کم نمیزاره.",
      Img1: "/images/about/dog-1.png", Img2: "/images/about/dog-2.png",
      BgColor: "#c19ade", CSSClass: "dog", Priority: 2 },
    { Id: 3, Lang: 1, Name: "افلادون", Desc: "افلادون یکی از بی‌ریا‌ترین خرگوش‌هاییه که ممکنه تو زندگیتون باهاش آشنا بشید. این بچه عین کف دست بی‌غشه و محاله بهش علاقمند نشید. مجموعه‌ی علاقمندی‌های افلادون خیلی وسیعه: از خواب و خور و گُل گرفته تا هنر و فلسفه و حرف‌های قلنبه‌سلنبه. البته ناگفته نمونه که یه‌کم خرافاتی هم هست، هرچند خودش تکذیب می‌کنه، ولی خب! به پیشونی بلندش خیلی می‌نازه. قبل از هر تصمیم مهمی فال می‌گیره و دائما داره تق‌تق می‌کوبه به چوب. راستی افلادون از اون جنس موجوداتیه که دربارشون می‌گن دست‌شون به کم نمیره. خلاصه، این گوش دازِ خپل این‌قدر مهربونه که در دم دلتون رو اسیرِ خودش می‌کنه.",
      Img1: "/images/about/rabbit-1.png", Img2: "/images/about/rabbit-2.png",
      BgColor: "#00bda4", CSSClass: "rabbit", Priority: 3 },
    // ===== Lang 2 (English) =====
    { Id: 4, Lang: 2, Name: "Pishchinko", Desc: "Ever met a cat with real street cred? If your answer is no, you simply haven't had the pleasure of meeting our Pishchinko yet. The most loyal, down-to-earth, social — and admittedly the most boastful — friend you could ever have is this gorgeous cat. Don't even get us started on his love for adventure and mischief; he practically lives for it. The only thing he's ever scared of in life is a mouse! Oh, and a word of warning: don't get into a football argument with him — his confidence and quick wit might just leave you completely stumped. But don't worry, he's so genuine that he'll win your heart back in a fraction of a second.",
      Img1: "/images/about/cat-1.png", Img2: "/images/about/cat-2.png",
      BgColor: "#00c9e9", CSSClass: "cat", Priority: 1 },
    { Id: 5, Lang: 2, Name: "Yayobi", Desc: "Allow us to introduce Yayobi — a free-thinking, poetic-souled, and incredibly intelligent dog. Music is Yayobi's true passion; he's always either listening to a song, singing along, or playing an instrument. Though, between us, it's better if neither of us comments on his singing voice — or hears it, for that matter. Yayobi is always impeccably dressed and his cologne is positively intoxicating. He's also a bit of a perfectionist, so you'd better stay tidy and tasteful around him, because he can be quite the grumbler — once he starts complaining, there's no stopping him. All that said, he's an incredibly loveable soul, and once he calls you a friend, he'll never let you down.",
      Img1: "/images/about/dog-1.png", Img2: "/images/about/dog-2.png",
      BgColor: "#c19ade", CSSClass: "dog", Priority: 2 },
    { Id: 6, Lang: 2, Name: "Afladoon", Desc: "Afladoon is one of the most sincere rabbits you'll ever have the fortune of meeting in your life. This little one is as transparent as glass, and it's simply impossible not to fall for him. Afladoon's range of interests is vast: from sleeping, eating, and flowers, all the way to art, philosophy, and grand, lofty ideas. It must be said, though, that he's a tiny bit superstitious — even if he denies it! He takes great pride in his broad forehead, consults fortune tellers before any major decision, and is forever knocking on wood. Afladoon is the kind of soul people describe as generous to a fault. In short, this chubby long-eared sweetheart is so warm that he'll capture your heart on the spot.",
      Img1: "/images/about/rabbit-1.png", Img2: "/images/about/rabbit-2.png",
      BgColor: "#00bda4", CSSClass: "rabbit", Priority: 3 },
    // ===== Lang 3 (French) =====
    { Id: 7, Lang: 3, Name: "Pishchinko", Desc: "Avez-vous déjà rencontré un chat vraiment respectable ? Si votre réponse est non, c'est que vous n'avez pas encore eu le plaisir de faire la connaissance de notre Pishchinko. Le plus loyal, le plus terre-à-terre, le plus sociable — et, avouons-le, le plus vantard — des amis que vous pourriez jamais avoir, c'est ce beau matou. Ne nous lancez même pas sur son amour de l'aventure et de l'agitation ; il en vit littéralement. La seule chose qui l'effraie dans la vie, c'est une souris ! Et un conseil : n'entrez jamais dans une dispute de football avec lui — son assurance et sa répartie pourraient bien vous laisser sans voix. Mais ne vous inquiétez pas, il est tellement authentique qu'il reconquerra votre cœur en une fraction de seconde.",
      Img1: "/images/about/cat-1.png", Img2: "/images/about/cat-2.png",
      BgColor: "#00c9e9", CSSClass: "cat", Priority: 1 },
    { Id: 8, Lang: 3, Name: "Yayobi", Desc: "Permettez-nous de vous présenter Yayobi — un chien à l'esprit libre, à l'âme poétique et incroyablement intelligent. La musique est sa véritable passion ; il est toujours en train d'écouter une chanson, de la fredonner ou de jouer d'un instrument. Cela dit, entre nous, il vaut mieux ne pas commenter sa voix — ni l'entendre, d'ailleurs. Yayobi est toujours impeccablement mis et son parfum est absolument enivrant. Il est aussi un peu perfectionniste, alors veillez à rester soigné et de bon goût en sa présence, car il peut être assez ronchon — une fois lancé dans ses plaintes, rien ne l'arrête. Cela dit, c'est une âme incroyablement attachante, et quand il vous considère comme un ami, il ne vous laissera jamais tomber.",
      Img1: "/images/about/dog-1.png", Img2: "/images/about/dog-2.png",
      BgColor: "#c19ade", CSSClass: "dog", Priority: 2 },
    { Id: 9, Lang: 3, Name: "Afladoon", Desc: "Afladoon est l'un des lapins les plus sincères que vous aurez la chance de rencontrer dans votre vie. Ce petit être est transparent comme du cristal, et il est tout simplement impossible de ne pas craquer pour lui. Les centres d'intérêt d'Afladoon sont très vastes : du sommeil, de la nourriture et des fleurs jusqu'à l'art, la philosophie et les grandes idées. Il faut bien admettre qu'il est un tout petit peu superstitieux — même s'il le nie ! Il est très fier de son grand front, consulte les augures avant toute décision importante et ne cesse de toucher du bois. Afladoon est le genre d'être dont on dit qu'il est généreux sans compter. Bref, ce doux lapin potelé aux longues oreilles est si chaleureux qu'il capturera votre cœur sur-le-champ.",
      Img1: "/images/about/rabbit-1.png", Img2: "/images/about/rabbit-2.png",
      BgColor: "#00bda4", CSSClass: "rabbit", Priority: 3 },
  ];

  for (const c of characters) {
    await prisma.character.upsert({
      where: { Id: c.Id },
      update: c,
      create: c,
    });
  }

  console.log(`${characters.length} شخصیت اضافه شد`);
}
