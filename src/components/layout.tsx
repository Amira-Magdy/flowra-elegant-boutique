import * as React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User as UserIcon, Sun, Moon, Menu, X, Globe } from "lucide-react";
import { useStore } from "@/lib/store";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, lang, setLang, theme, toggleTheme, cartCount, wishlist, user, logout } = useStore();
  const [open, setOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const navigate = useNavigate();

  const results = q.trim().length > 0
    ? products.filter(p => p.name.en.toLowerCase().includes(q.toLowerCase()) || p.name.ar.includes(q) || p.category.en.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
    : [];

  const navLinks = [
    { to: "/", label: t.nav.home },
    { to: "/shop", label: t.nav.shop },
    { to: "/best-sellers", label: t.nav.bestSellers },
    { to: "/new-arrivals", label: t.nav.newArrivals },
    { to: "/offers", label: t.nav.offers },
  ] as const;

  return (
    <>
      <div className="bg-foreground text-background text-center text-xs tracking-widest uppercase py-2 px-4">{t.banner}</div>
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Menu"><Menu className="size-5" /></button>

          <Link to="/" className="font-display text-2xl tracking-[0.25em] uppercase">{t.brand}</Link>

          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em]">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} className="hover:text-[var(--burgundy)] transition-colors" activeProps={{ className: "text-[var(--burgundy)]" }}>{l.label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(true)} className="size-9 grid place-items-center rounded-full hover:bg-secondary transition" aria-label={t.actions.search}><Search className="size-4" /></button>
            <button onClick={() => setLang(lang === "en" ? "ar" : "en")} className="size-9 grid place-items-center rounded-full hover:bg-secondary transition text-[11px] font-medium" aria-label="Language">
              <span className="hidden sm:inline">{lang === "en" ? "AR" : "EN"}</span>
              <Globe className="size-4 sm:hidden" />
            </button>
            <button onClick={toggleTheme} className="size-9 grid place-items-center rounded-full hover:bg-secondary transition" aria-label="Theme">
              {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </button>
            <Link to="/wishlist" className="size-9 grid place-items-center rounded-full hover:bg-secondary transition relative" aria-label={t.actions.wishlist}>
              <Heart className="size-4" />
              {wishlist.length > 0 && <span className="absolute -top-0.5 -right-0.5 size-4 text-[10px] grid place-items-center bg-[var(--burgundy)] text-white rounded-full">{wishlist.length}</span>}
            </Link>
            {user ? (
              <div className="hidden sm:flex items-center gap-1">
                <Link to="/account" className="size-9 grid place-items-center rounded-full hover:bg-secondary transition" aria-label={t.actions.account}><UserIcon className="size-4" /></Link>
                <button onClick={logout} className="text-xs px-2 hover:text-[var(--burgundy)]">{t.actions.logout}</button>
              </div>
            ) : (
              <Link to="/login" className="size-9 grid place-items-center rounded-full hover:bg-secondary transition" aria-label={t.actions.login}><UserIcon className="size-4" /></Link>
            )}
            <Link to="/cart" className="size-9 grid place-items-center rounded-full hover:bg-secondary transition relative" aria-label={t.actions.cart}>
              <ShoppingBag className="size-4" />
              {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 size-4 text-[10px] grid place-items-center bg-[var(--burgundy)] text-white rounded-full">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-50 lg:hidden transition", open ? "visible" : "invisible")}>
        <div className={cn("absolute inset-0 bg-black/40 transition-opacity", open ? "opacity-100" : "opacity-0")} onClick={() => setOpen(false)} />
        <div className={cn("absolute top-0 left-0 rtl:left-auto rtl:right-0 h-full w-72 bg-background shadow-2xl transition-transform p-6", open ? "translate-x-0" : "-translate-x-full rtl:translate-x-full")}>
          <div className="flex justify-between items-center mb-8">
            <span className="font-display text-xl tracking-[0.2em] uppercase">{t.brand}</span>
            <button onClick={() => setOpen(false)}><X className="size-5" /></button>
          </div>
          <nav className="flex flex-col gap-5 text-sm uppercase tracking-[0.2em]">
            {navLinks.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>)}
          </nav>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 lg:px-8 pt-8">
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <Search className="size-5 text-muted-foreground" />
              <input
                autoFocus value={q} onChange={e => setQ(e.target.value)}
                placeholder={t.search.placeholder}
                className="flex-1 bg-transparent outline-none text-lg"
              />
              <button onClick={() => { setSearchOpen(false); setQ(""); }}><X className="size-5" /></button>
            </div>
            <div className="mt-8 max-w-3xl mx-auto">
              {q.trim() === "" ? null : results.length === 0 ? (
                <p className="text-muted-foreground text-center py-12">{t.search.noResults}</p>
              ) : (
                <ul className="space-y-3">
                  {results.map(p => (
                    <li key={p.id}>
                      <button onClick={() => { setSearchOpen(false); setQ(""); navigate({ to: "/product/$slug", params: { slug: p.slug } }); }}
                        className="w-full flex items-center gap-4 p-3 hover:bg-secondary rounded-lg transition text-left">
                        <div className="size-14 rounded shrink-0" style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }} />
                        <div className="flex-1">
                          <p className="font-display text-base">{p.name[lang]}</p>
                          <p className="text-xs text-muted-foreground">{p.category[lang]}</p>
                        </div>
                        <span className="text-sm">${p.price}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer() {
  const { t } = useStore();
  return (
    <footer className="mt-24 border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-2xl tracking-[0.2em] uppercase">{t.brand}</p>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">{t.footer.tag}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-4">Shop</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop">{t.nav.shop}</Link></li>
            <li><Link to="/new-arrivals">{t.nav.newArrivals}</Link></li>
            <li><Link to="/best-sellers">{t.nav.bestSellers}</Link></li>
            <li><Link to="/offers">{t.nav.offers}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-4">Help</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Shipping & Returns</li><li>Size Guide</li><li>Care Instructions</li><li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-4">Newsletter</p>
          <p className="text-sm text-muted-foreground mb-3">Be first to know about drops & offers.</p>
          <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="email@example.com" className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm outline-none focus:border-[var(--burgundy)]" />
            <Button type="submit" variant="default" size="sm">→</Button>
          </form>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} {t.brand}. {t.footer.rights}</div>
    </footer>
  );
}
