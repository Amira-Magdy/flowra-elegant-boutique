export type Lang = "en" | "ar";

export type Dict = {
  brand: string;
  nav: { home: string; shop: string; bestSellers: string; newArrivals: string; offers: string; about: string; contact: string };
  actions: { search: string; wishlist: string; cart: string; login: string; signup: string; logout: string; account: string; addToCart: string; buyNow: string; viewAll: string; checkout: string; continueShopping: string; remove: string; theme: string };
  hero: { eyebrow: string; title: string; subtitle: string; cta: string };
  sections: { featured: string; best: string; new: string; offers: string; browse: string };
  product: { color: string; size: string; quantity: string; description: string; related: string; inStock: string; off: string };
  cart: { title: string; empty: string; subtotal: string; shipping: string; total: string; item: string; items: string };
  wishlist: { title: string; empty: string };
  auth: { loginTitle: string; signupTitle: string; email: string; password: string; name: string; noAccount: string; haveAccount: string };
  footer: { tag: string; rights: string };
  banner: string;
  search: { placeholder: string; noResults: string };
  checkout: {
    title: string; summary: string; shipping: string; tax: string; total: string;
    fullName: string; email: string; address: string; phone: string; phone2: string;
    paymentMethod: string; cod: string; bank: string; uploadReceipt: string; placeOrder: string;
    successTitle: string; successMsg: string; backHome: string;
    bankInfo: string; required: string;
  };
};

export const translations: Record<Lang, Dict> = {
  en: {
    brand: "Flowra",
    nav: { home: "Home", shop: "Shop", bestSellers: "Best Sellers", newArrivals: "New Arrivals", offers: "Offers", about: "About", contact: "Contact" },
    actions: { search: "Search", wishlist: "Wishlist", cart: "Cart", login: "Login", signup: "Sign Up", logout: "Logout", account: "Account", addToCart: "Add to Cart", buyNow: "Buy Now", viewAll: "View All", checkout: "Checkout", continueShopping: "Continue Shopping", remove: "Remove", theme: "Theme" },
    hero: { eyebrow: "Flowra Collection", title: "Princess Elegance", subtitle: "Everything you need for your special occasions", cta: "Shop Now" },
    sections: { featured: "Featured Collection", best: "Best Sellers", new: "New Arrivals", offers: "Special Offers", browse: "Browse All" },
    product: { color: "Color", size: "Size", quantity: "Quantity", description: "Description", related: "You may also like", inStock: "In stock", off: "OFF" },
    cart: { title: "Your Cart", empty: "Your cart is empty", subtotal: "Subtotal", shipping: "Free shipping", total: "Total", item: "item", items: "items" },
    wishlist: { title: "Your Wishlist", empty: "Your wishlist is empty" },
    auth: { loginTitle: "Welcome Back", signupTitle: "Create Account", email: "Email", password: "Password", name: "Name", noAccount: "No account?", haveAccount: "Have an account?" },
    footer: { tag: "Timeless elegance, crafted for you.", rights: "All rights reserved." },
    banner: "Free shipping on orders over 5,000 EGP",
    search: { placeholder: "Search products...", noResults: "No products found" },
    checkout: {
      title: "Checkout", summary: "Order Summary", shipping: "Shipping & Taxes", tax: "Tax", total: "Total",
      fullName: "Full Name", email: "Email Address", address: "Detailed Shipping Address", phone: "Primary Phone Number", phone2: "Secondary Phone Number",
      paymentMethod: "Payment Method", cod: "Cash on Delivery", bank: "Bank Transfer", uploadReceipt: "Please upload your transfer receipt", placeOrder: "Place Order",
      successTitle: "Your order has been placed successfully!", successMsg: "Thank you for shopping with Flowra. We will contact you shortly to confirm your order.", backHome: "Back to Home",
      bankInfo: "Bank: Flowra Bank · Account: 1234-5678-9012 · IBAN: EG00 0000 0000 0000",
      required: "This field is required",
    },
  },
  ar: {
    brand: "فلورا",
    nav: { home: "الرئيسية", shop: "المتجر", bestSellers: "الأكثر مبيعاً", newArrivals: "وصل حديثاً", offers: "العروض", about: "من نحن", contact: "تواصل" },
    actions: { search: "بحث", wishlist: "المفضلة", cart: "السلة", login: "تسجيل الدخول", signup: "إنشاء حساب", logout: "خروج", account: "حسابي", addToCart: "أضف إلى السلة", buyNow: "اشترِ الآن", viewAll: "عرض الكل", checkout: "إتمام الشراء", continueShopping: "متابعة التسوق", remove: "إزالة" },
    hero: { eyebrow: "مجموعة فلورا", title: "أناقة الأميرات", subtitle: "كل ما تحتاجينه لمناسباتك", cta: "تسوقي الآن" },
    sections: { featured: "المجموعة المميزة", best: "الأكثر مبيعاً", new: "وصل حديثاً", offers: "عروض خاصة", browse: "تصفحي الكل" },
    product: { color: "اللون", size: "المقاس", quantity: "الكمية", description: "الوصف", related: "قد يعجبك أيضاً", inStock: "متوفر", off: "خصم" },
    cart: { title: "سلتك", empty: "السلة فارغة", subtotal: "المجموع الفرعي", shipping: "شحن مجاني", total: "الإجمالي", item: "منتج", items: "منتجات" },
    wishlist: { title: "المفضلة", empty: "قائمة المفضلة فارغة" },
    auth: { loginTitle: "مرحباً بعودتك", signupTitle: "إنشاء حساب", email: "البريد الإلكتروني", password: "كلمة المرور", name: "الاسم", noAccount: "ليس لديك حساب؟", haveAccount: "لديك حساب؟" },
    footer: { tag: "أناقة خالدة، صُممت من أجلك.", rights: "جميع الحقوق محفوظة." },
    banner: "شحن مجاني للطلبات فوق ٥٠٠٠ ج.م",
    search: { placeholder: "ابحث عن منتجات...", noResults: "لا توجد منتجات" },
  },
};

const arDigits = (n: string) => n.replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[+d]);

export function formatPrice(amount: number, lang: Lang): string {
  const rounded = Math.round(amount);
  const grouped = rounded.toLocaleString("en-US");
  if (lang === "ar") return `${arDigits(grouped)} ج.م`;
  return `${grouped} EGP`;
}
