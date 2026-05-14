import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductImage({ product, className }: { product: Product; className?: string }) {
  const [a, b] = product.gradient;
  return (
    <div className={cn("relative w-full overflow-hidden", className)} style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
      <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{
        background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.6), transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.2), transparent 60%)"
      }} />
      <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 text-[10px] tracking-[0.3em] uppercase text-white/80 font-medium">Flowra</div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { t, lang, wishlist, toggleWishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const discount = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;
  return (
    <Link to="/product/$slug" params={{ slug: product.slug }} className="group block">
      <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-secondary">
        <ProductImage product={product} className="h-full transition-transform duration-700 group-hover:scale-105" />
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          aria-label={t.actions.wishlist}
          className="absolute top-3 right-3 rtl:right-auto rtl:left-3 size-9 grid place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-background transition"
        >
          <Heart className={cn("size-4", wished && "fill-[var(--burgundy)] text-[var(--burgundy)]")} />
        </button>
        {product.badge === "new" && <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2 py-1 text-[10px] tracking-widest uppercase bg-background text-foreground rounded">New</span>}
        {product.badge === "best" && <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2 py-1 text-[10px] tracking-widest uppercase bg-foreground text-background rounded">Best</span>}
        {discount > 0 && <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2 py-1 text-[10px] tracking-widest uppercase bg-[var(--burgundy)] text-white rounded">-{discount}%</span>}
      </div>
      <div className="mt-3 px-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.category[lang]}</p>
        <h3 className="font-display text-lg mt-1">{product.name[lang]}</h3>
        <div className="flex items-baseline gap-2 mt-1 rtl:flex-row-reverse rtl:justify-end">
          <span className="text-base">${product.price}</span>
          {product.compareAt && <span className="text-sm text-muted-foreground line-through">${product.compareAt}</span>}
        </div>
      </div>
    </Link>
  );
}
