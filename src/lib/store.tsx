import * as React from "react";
import { translations, type Lang, type Dict } from "@/lib/i18n";
import type { Product } from "@/lib/products";

type CartItem = { productId: string; color: string; size: string; qty: number };
type User = { name: string; email: string };

type Store = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  theme: "light" | "dark";
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (p: Product, color: string, size: string, qty?: number) => void;
  updateQty: (i: number, qty: number) => void;
  removeFromCart: (i: number) => void;
  cartCount: number;
  cartTotal: number;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
};

const StoreCtx = React.createContext<Store | null>(null);

const read = <T,>(k: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : fallback; } catch { return fallback; }
};

export function StoreProvider({ children, products }: { children: React.ReactNode; products: Product[] }) {
  const [lang, setLangState] = React.useState<Lang>("en");
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [user, setUser] = React.useState<User | null>(null);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setLangState(read("flowra:lang", "en"));
    setTheme(read("flowra:theme", "light"));
    setCart(read("flowra:cart", []));
    setWishlist(read("flowra:wishlist", []));
    setUser(read("flowra:user", null));
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem("flowra:theme", JSON.stringify(theme));
    localStorage.setItem("flowra:lang", JSON.stringify(lang));
  }, [theme, lang, hydrated]);

  React.useEffect(() => { if (hydrated) localStorage.setItem("flowra:cart", JSON.stringify(cart)); }, [cart, hydrated]);
  React.useEffect(() => { if (hydrated) localStorage.setItem("flowra:wishlist", JSON.stringify(wishlist)); }, [wishlist, hydrated]);
  React.useEffect(() => { if (hydrated) localStorage.setItem("flowra:user", JSON.stringify(user)); }, [user, hydrated]);

  const value: Store = {
    lang,
    setLang: setLangState,
    t: translations[lang],
    theme,
    toggleTheme: () => setTheme(t => t === "light" ? "dark" : "light"),
    cart,
    addToCart: (p, color, size, qty = 1) => setCart(c => {
      const i = c.findIndex(x => x.productId === p.id && x.color === color && x.size === size);
      if (i >= 0) { const n = [...c]; n[i] = { ...n[i], qty: n[i].qty + qty }; return n; }
      return [...c, { productId: p.id, color, size, qty }];
    }),
    updateQty: (i, qty) => setCart(c => c.map((x, idx) => idx === i ? { ...x, qty: Math.max(1, qty) } : x)),
    removeFromCart: (i) => setCart(c => c.filter((_, idx) => idx !== i)),
    cartCount: cart.reduce((s, x) => s + x.qty, 0),
    cartTotal: cart.reduce((s, x) => {
      const p = products.find(p => p.id === x.productId); return s + (p ? p.price * x.qty : 0);
    }, 0),
    wishlist,
    toggleWishlist: (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]),
    user,
    login: (email, name) => setUser({ email, name: name || email.split("@")[0] }),
    logout: () => setUser(null),
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export const useStore = () => {
  const v = React.useContext(StoreCtx);
  if (!v) throw new Error("useStore must be used within StoreProvider");
  return v;
};
