export type HoverType = "swap" | "flavor" | "none";

export type CatProduct = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  hoverImage?: string;
  hoverType: HoverType;
};

export type CatCategory = {
  label: string;
  href: string;
};

export const catCategories: CatCategory[] = [
  { label: "ظرف خاک", href: "/cat/cat-soil/" },
  { label: "وود پلت", href: "/cat/cat-pallets/" },
  { label: "جای خواب", href: "/cat/cats-bed/" },
  { label: "اسکرچر گربه", href: "/cat/scratchoooti/" },
  { label: "اسباب بازی گربه", href: "/cat/cat-toys/" },
  { label: "پودرهای گیاهی", href: "/cat/powder/" },
  { label: "بذر طبیعی", href: "/cat/seeds/" },
  { label: "همه محصولات گربه", href: "/cat/" },
];

export const catProducts: CatProduct[] = [
  {
    id: "soil-container",
    title: "ظرف خاک",
    subtitle: "آنتی‌باکتریال، ضد آب",
    href: "/cat/cat-soil/soil-container/",
    image: "/images/products/ProductL_5.jpg",
    hoverImage: "/images/products/ProductLO_5.jpg",
    hoverType: "swap",
  },
  {
    id: "wood-pellet",
    title: "وود پلت",
    subtitle: "چوب درخت کاج سفید",
    href: "/cat/cat-pallets/wood-pellet/",
    image: "/images/products/ProductL_15.png",
    hoverImage: "/images/products/ProductLO_15.jpg",
    hoverType: "swap",
  },
  {
    id: "thin-seed",
    title: "بذر نازک",
    subtitle: "دفع توپ مویی",
    href: "/cat/cat-soil/thin-seed/",
    image: "/images/products/ProductL_21.png",
    hoverImage: "/images/products/ProductLO_21.png",
    hoverType: "flavor",
  },
  {
    id: "thick-seed",
    title: "بذر ضخیم",
    subtitle: "دفع توپ مویی",
    href: "/cat/cat-soil/thick-seed/",
    image: "/images/products/ProductL_22.png",
    hoverImage: "/images/products/ProductLO_22.png",
    hoverType: "flavor",
  },
  {
    id: "cats-bed-circle",
    title: "جای خواب گربه دودوتی",
    subtitle: "مدل دایره",
    href: "/cat/cats-bed/cats-bed-circle/",
    image: "/images/products/ProductL_160.jpg",
    hoverType: "none",
  },
  {
    id: "cats-bed-ellipse",
    title: "جای خواب گربه دودوتی",
    subtitle: "مدل بیضی",
    href: "/cat/cats-bed/cats-bed-ellipse/",
    image: "/images/products/ProductL_161.jpg",
    hoverType: "none",
  },
  {
    id: "scratchoooti",
    title: "اسکرچر گربه دودوتی",
    subtitle: "دست‌ساز و سازگار با محیط زیست",
    href: "/cat/scratchoooti/scratchoooti/",
    image: "/images/products/ProductL_162.jpg",
    hoverType: "none",
  },
  {
    id: "scratchoooti-with-ball",
    title: "اسکرچر گربه دودوتی به همراه توپ",
    subtitle: "دست‌ساز و سازگار با محیط زیست به همراه توپ",
    href: "/cat/scratchoooti/scratchoooti-with-ball/",
    image: "/images/products/ProductL_163.jpg",
    hoverType: "none",
  },
  {
    id: "catnipball",
    title: "کت‌نیپ بال دودوتی",
    subtitle: "دارای کت‌نیپ، پر و زنگوله",
    href: "/cat/cat-toys/catnipball/",
    image: "/images/products/ProductL_166.jpg",
    hoverType: "none",
  },
  {
    id: "valerian",
    title: "پودر والرین دودوتی",
    subtitle: "۱۰۰ درصد طبیعی",
    href: "/cat/powder/valerian/",
    image: "/images/products/ProductL_167.jpg",
    hoverType: "none",
  },
  {
    id: "dandelion-powder",
    title: "پودر دندلیون دودوتی",
    subtitle: "۱۰۰ درصد طبیعی",
    href: "/cat/powder/dandelion/",
    image: "/images/products/ProductL_168.jpg",
    hoverType: "none",
  },
  {
    id: "catnip-powder",
    title: "پودر کت‌نیپ دودوتی",
    subtitle: "۱۰۰ درصد طبیعی",
    href: "/cat/powder/catnip/",
    image: "/images/products/ProductL_169.jpg",
    hoverType: "none",
  },
  {
    id: "seeds-dandelion",
    title: "بذر دندلیون گربه دودوتی",
    subtitle: "رشد سریع و باعث ایجاد تنوع در محیط زندگی گربه",
    href: "/cat/seeds/seeds-dandelion/",
    image: "/images/products/ProductL_170.jpg",
    hoverType: "none",
  },
  {
    id: "seeds-catnip",
    title: "بذر کت‌نیپ دودوتی",
    subtitle: "رشد سریع و باعث ایجاد تنوع در محیط زندگی گربه",
    href: "/cat/seeds/seeds-catnip/",
    image: "/images/products/ProductL_171.jpg",
    hoverType: "none",
  },
];
