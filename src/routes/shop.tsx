import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/lib/store";
import * as React from "react";

export const Route = createFileRoute("/shop")({ component: Shop });

function Shop() {
  const { t, lang } = useStore();
  const cats = React.useMemo(() => Array.from(new Set(products.map(p => p.category[lang]))), [lang]);
  const [active, setActive] = React.useState<string | null>(null);
  const filtered = active ? products.filter(p => p.category[lang] === active) : products;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <header className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--burgundy)]">{t.brand}</p>
        <h1 className="font-display text-5xl mt-4">{t.nav.shop}</h1>
      </header>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button onClick={() => setActive(null)} className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border ${!active ? "bg-foreground text-background border-foreground" : "border-border"}`}>All</button>
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border ${active === c ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"}`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
