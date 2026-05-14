import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/i18n";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductImage({ product, className, eager }: { product: Product; className?: string; eager?: boolean }) {
  const [a, b] = product.gradient;
  return (
    <div className={cn("relative w-full overflow-hidden", className)} style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
      <img
        src={product.image}
        alt={product.name.en}
        width={800}
        height={1000}
        loading={eager ? "eager" : "lazy"}
        className="absolute inset-0 w-full h-full object-cover"
      />
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
