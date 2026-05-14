export type Lang = "en" | "ar";

export const translations = {
  en: {
    brand: "Flowra",
    nav: { home: "Home", shop: "Shop", bestSellers: "Best Sellers", newArrivals: "New Arrivals", offers: "Offers", about: "About", contact: "Contact" },
    actions: { search: "Search", wishlist: "Wishlist", cart: "Cart", login: "Login", signup: "Sign Up", logout: "Logout", account: "Account", addToCart: "Add to Cart", buyNow: "Buy Now", viewAll: "View All", checkout: "Checkout", continueShopping: "Continue Shopping", remove: "Remove" },
    hero: { eyebrow: "Flowra Collection", title: "Princess Elegance", subtitle: "Everything you need for your special occasions", cta: "Shop Now" },
    sections: { featured: "Featured Collection", best: "Best Sellers", new: "New Arrivals", offers: "Special Offers", browse: "Browse All" },
    product: { color: "Color", size: "Size", quantity: "Quantity", description: "Description", related: "You may also like", inStock: "In stock", off: "OFF" },
    cart: { title: "Your Cart", empty: "Your cart is empty", subtotal: "Subtotal", shipping: "Free shipping", total: "Total", item: "item", items: "items" },
    wishlist: { title: "Your Wishlist", empty: "Your wishlist is empty" },
    auth: { loginTitle: "Welcome Back", signupTitle: "Create Account", email: "Email", password: "Password", name: "Name", noAccount: "No account?", haveAccount: "Have an account?" },
    footer: { tag: "Timeless elegance, crafted for you.", rights: "All rights reserved." },
    banner: "Free worldwide shipping on orders over $200",
    search: { placeholder: "Search products...", noResults: "No products found" },
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
    banner: "شحن مجاني حول العالم للطلبات فوق 200$",
    search: { placeholder: "ابحث عن منتجات...", noResults: "لا توجد منتجات" },
  },
} as const;

type DeepMutable<T> = { -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K] };
export type Dict = DeepMutable<typeof translations.en>;
