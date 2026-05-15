import navyEveningDress from "@/assets/products/navy-evening-dress.jpg";
import beigeAbaya from "@/assets/products/beige-embroidered-abaya.jpg";
import pinkBlouse from "@/assets/products/pink-silk-blouse.jpg";
import leatherHandbag from "@/assets/products/classic-leather-handbag.jpg";
import pearlEarrings from "@/assets/products/pearl-drop-earrings.jpg";
import burgundyHeels from "@/assets/products/velvet-burgundy-heels.jpg";
import linenKaftan from "@/assets/products/linen-summer-kaftan.jpg";
import goldNecklace from "@/assets/products/gold-chain-necklace.jpg";
import ivoryCoat from "@/assets/products/ivory-wool-coat.jpg";
import farhaDress from "@/assets/products/farha-dress.jpg";
import emeraldGown from "@/assets/products/satin-emerald-gown.jpg";
import crystalClutch from "@/assets/products/crystal-clutch.jpg";
import lilacScarf from "@/assets/products/lilac-chiffon-scarf.jpg";
import noirBlazer from "@/assets/products/velvet-noir-blazer.jpg";
import champagneSlip from "@/assets/products/champagne-silk-slip.jpg";

export type Product = {
  id: string;
  slug: string;
  name: { en: string; ar: string };
  category: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  compareAt?: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  image: string;
  gradient: [string, string];
  badge?: "new" | "best" | "offer";
  tags: string[];
};

const C = {
  blush: ["#fde6ed", "#f7c6d3"] as [string, string],
  rose: ["#f7c6d3", "#e89aab"] as [string, string],
  navy: ["#1a2540", "#2d3a5f"] as [string, string],
  beige: ["#f1e4d0", "#d9c2a3"] as [string, string],
  burgundy: ["#3a1420", "#6b2438"] as [string, string],
  ivory: ["#f6f2ea", "#e3dccd"] as [string, string],
  gold: ["#e9d49a", "#c9a24e"] as [string, string],
  pearl: ["#f4eef0", "#dac9d1"] as [string, string],
  emerald: ["#1f3d34", "#3a6b5a"] as [string, string],
  black: ["#1a1418", "#2d2329"] as [string, string],
  lilac: ["#e7d6f0", "#c9a9d6"] as [string, string],
  champagne: ["#efe1c9", "#cdb38a"] as [string, string],
  sage: ["#dde6d4", "#a9b89a"] as [string, string],
};

const sizes = ["S", "M", "L", "XL"];
const oneSize = ["One Size"];
const shoeSizes = ["36", "37", "38", "39", "40", "41"];

export const products: Product[] = [
  {
    id: "1", slug: "navy-evening-dress",
    name: { en: "Navy Evening Dress", ar: "فستان سهرة كحلي" },
    category: { en: "Evening Wear", ar: "ملابس سهرة" },
    description: { en: "A flowing midnight-navy gown with delicate beadwork and a dramatic open back. Crafted from premium silk crêpe.", ar: "فستان كحلي انسيابي بتطريزات دقيقة وفتحة ظهر أنيقة، مصنوع من حرير الكريب الفاخر." },
    price: 2899, compareAt: 3799, colors: [{name:"Navy",hex:"#1a2540"},{name:"Black",hex:"#111"}], sizes, image: navyEveningDress, gradient: C.navy, badge: "best", tags: ["dress","evening"]
  },
  {
    id: "2", slug: "beige-embroidered-abaya",
    name: { en: "Beige Embroidered Abaya", ar: "عباية بيج مطرزة" },
    category: { en: "Abayas", ar: "عبايات" },
    description: { en: "Hand-embroidered beige abaya with floral motifs along the cuffs and hem. Lightweight and graceful.", ar: "عباية بيج مطرزة يدوياً بزخارف زهرية على الأطراف، خفيفة ورقيقة." },
    price: 2499, colors: [{name:"Beige",hex:"#d9c2a3"},{name:"Ivory",hex:"#f0e6d2"}], sizes, image: beigeAbaya, gradient: C.beige, badge: "new", tags: ["abaya"]
  },
  {
    id: "3", slug: "pink-silk-blouse",
    name: { en: "Pink Silk Blouse", ar: "بلوزة حرير وردية" },
    category: { en: "Tops", ar: "بلوزات" },
    description: { en: "A pure mulberry silk blouse in soft blush pink with mother-of-pearl buttons.", ar: "بلوزة حرير توت نقي بلون وردي ناعم وأزرار من عرق اللؤلؤ." },
    price: 1299, colors: [{name:"Blush",hex:"#f7c6d3"},{name:"Ivory",hex:"#f0e6d2"}], sizes, image: pinkBlouse, gradient: C.blush, tags: ["top","silk"]
  },
  {
    id: "4", slug: "classic-leather-handbag",
    name: { en: "Classic Leather Handbag", ar: "حقيبة جلدية كلاسيكية" },
    category: { en: "Bags", ar: "حقائب" },
    description: { en: "Structured Italian leather handbag with gold-tone hardware and suede-lined interior.", ar: "حقيبة جلدية إيطالية بتفاصيل ذهبية وبطانة جلد الشمواه." },
    price: 3499, colors: [{name:"Camel",hex:"#c39a6b"},{name:"Black",hex:"#111"}], sizes: oneSize, image: leatherHandbag, gradient: C.champagne, badge: "best", tags: ["bag"]
  },
  {
    id: "5", slug: "pearl-drop-earrings",
    name: { en: "Pearl Drop Earrings", ar: "أقراط لؤلؤ متدلية" },
    category: { en: "Jewelry", ar: "مجوهرات" },
    description: { en: "Freshwater pearl drops set on 18k gold-plated sterling silver.", ar: "لآلئ مياه عذبة على فضة مطلية بالذهب عيار 18." },
    price: 899, colors: [{name:"Pearl",hex:"#f0e6e8"}], sizes: oneSize, image: pearlEarrings, gradient: C.pearl, tags: ["jewelry"]
  },
  {
    id: "6", slug: "velvet-burgundy-heels",
    name: { en: "Velvet Burgundy Heels", ar: "كعب مخمل عنابي" },
    category: { en: "Shoes", ar: "أحذية" },
    description: { en: "Pointed-toe velvet pumps in deep burgundy with a 90mm heel.", ar: "حذاء بكعب عالٍ من المخمل العنابي بمقدمة مدببة." },
    price: 1899, compareAt: 2599, colors: [{name:"Burgundy",hex:"#6b2438"},{name:"Black",hex:"#111"}], sizes: shoeSizes, image: burgundyHeels, gradient: C.burgundy, badge: "offer", tags: ["shoes"]
  },
  {
    id: "7", slug: "linen-summer-kaftan",
    name: { en: "Linen Summer Kaftan", ar: "قفطان كتان صيفي" },
    category: { en: "Resort", ar: "ملابس صيفية" },
    description: { en: "Breezy Belgian linen kaftan with hand-stitched tassels.", ar: "قفطان من الكتان البلجيكي بشراشيب مخيطة يدوياً." },
    price: 1499, colors: [{name:"Ivory",hex:"#f0e6d2"},{name:"Sage",hex:"#a9b89a"}], sizes, image: linenKaftan, gradient: C.sage, badge: "new", tags: ["kaftan"]
  },
  {
    id: "8", slug: "gold-chain-necklace",
    name: { en: "Gold Chain Necklace", ar: "عقد سلسلة ذهبية" },
    category: { en: "Jewelry", ar: "مجوهرات" },
    description: { en: "Layered 18k gold-plated chain necklace with adjustable length.", ar: "عقد ذهبي متعدد الطبقات مطلي ذهب عيار 18 بطول قابل للتعديل." },
    price: 1099, colors: [{name:"Gold",hex:"#c9a24e"}], sizes: oneSize, image: goldNecklace, gradient: C.gold, tags: ["jewelry"]
  },
  {
    id: "9", slug: "ivory-wool-coat",
    name: { en: "Ivory Wool Coat", ar: "معطف صوف عاجي" },
    category: { en: "Outerwear", ar: "ملابس خارجية" },
    description: { en: "Double-breasted Italian wool coat in ivory with notched lapels.", ar: "معطف صوف إيطالي مزدوج الصدر بلون عاجي." },
    price: 4099, colors: [{name:"Ivory",hex:"#f0e6d2"},{name:"Camel",hex:"#c39a6b"}], sizes, image: ivoryCoat, gradient: C.ivory, tags: ["coat"]
  },
  {
    id: "10", slug: "farha-dress",
    name: { en: "Farha Dress", ar: "فستان فرحة" },
    category: { en: "Evening Wear", ar: "ملابس سهرة" },
    description: { en: "Signature Flowra rose dress with cascading tulle layers and bodice embroidery.", ar: "فستان فلورا المميز بطبقات تول متتالية وتطريز على الصدر." },
    price: 3299, compareAt: 3999, colors: [{name:"Blush",hex:"#f7c6d3"},{name:"Champagne",hex:"#cdb38a"}], sizes, image: farhaDress, gradient: C.rose, badge: "best", tags: ["dress","evening"]
  },
  {
    id: "11", slug: "satin-emerald-gown",
    name: { en: "Satin Emerald Gown", ar: "فستان ساتان زمردي" },
    category: { en: "Evening Wear", ar: "ملابس سهرة" },
    description: { en: "Floor-length emerald satin gown with cowl neckline and side slit.", ar: "فستان ساتان زمردي طويل بياقة منسدلة وفتحة جانبية." },
    price: 2799, colors: [{name:"Emerald",hex:"#1f3d34"}], sizes, image: emeraldGown, gradient: C.emerald, badge: "new", tags: ["dress"]
  },
  {
    id: "12", slug: "crystal-clutch",
    name: { en: "Crystal Embellished Clutch", ar: "كلاتش مرصع بالكريستال" },
    category: { en: "Bags", ar: "حقائب" },
    description: { en: "Hand-beaded crystal clutch with detachable chain strap.", ar: "كلاتش مرصع بالكريستال يدوياً مع سلسلة قابلة للفصل." },
    price: 1799, compareAt: 2399, colors: [{name:"Pearl",hex:"#f0e6e8"},{name:"Black",hex:"#111"}], sizes: oneSize, image: crystalClutch, gradient: C.pearl, badge: "offer", tags: ["bag","accessory"]
  },
  {
    id: "13", slug: "lilac-chiffon-scarf",
    name: { en: "Lilac Chiffon Scarf", ar: "وشاح شيفون ليلكي" },
    category: { en: "Accessories", ar: "إكسسوارات" },
    description: { en: "Sheer silk chiffon scarf with hand-rolled edges.", ar: "وشاح شيفون حريري شفاف بحواف ملفوفة يدوياً." },
    price: 599, colors: [{name:"Lilac",hex:"#c9a9d6"},{name:"Blush",hex:"#f7c6d3"}], sizes: oneSize, image: lilacScarf, gradient: C.lilac, tags: ["accessory"]
  },
  {
    id: "14", slug: "velvet-noir-blazer",
    name: { en: "Velvet Noir Blazer", ar: "بليزر مخمل أسود" },
    category: { en: "Outerwear", ar: "ملابس خارجية" },
    description: { en: "Tailored black velvet blazer with satin-trimmed lapels.", ar: "بليزر مخمل أسود مفصل بحواف ساتان." },
    price: 2599, colors: [{name:"Black",hex:"#111"},{name:"Burgundy",hex:"#6b2438"}], sizes, image: noirBlazer, gradient: C.black, badge: "new", tags: ["blazer"]
  },
  {
    id: "15", slug: "champagne-silk-slip",
    name: { en: "Champagne Silk Slip Dress", ar: "فستان حرير شامبانيا" },
    category: { en: "Dresses", ar: "فساتين" },
    description: { en: "Bias-cut champagne silk slip with delicate spaghetti straps.", ar: "فستان حرير شامبانيا بقصة مائلة وحمالات رفيعة." },
    price: 1999, compareAt: 2699, colors: [{name:"Champagne",hex:"#cdb38a"},{name:"Blush",hex:"#f7c6d3"}], sizes, image: champagneSlip, gradient: C.champagne, badge: "offer", tags: ["dress"]
  },
];

export const getProduct = (slug: string) => products.find(p => p.slug === slug);
export const byBadge = (b: Product["badge"]) => products.filter(p => p.badge === b);
