import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getProduct, products } from "@/lib/products";
import { ProductImage, ProductCard } from "@/components/product-card";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
  notFoundComponent: () => <div className="container mx-auto py-24 text-center"><h1 className="font-display text-4xl">Product not found</h1><Link to="/shop" className="underline mt-4 inline-block">Back to shop</Link></div>,
  errorComponent: ({ error }) => <div className="container mx-auto py-24 text-center">{error.message}</div>,
});

function ProductPage() {
  const data = Route.useLoaderData() as { product: import("@/lib/products").Product };
  const product = data.product;
  const { t, lang, addToCart, wishlist, toggleWishlist } = useStore();
  const [color, setColor] = React.useState(product.colors[0].name);
  const [size, setSize] = React.useState(product.sizes[0]);
  const [qty, setQty] = React.useState(1);
  const wished = wishlist.includes(product.id);
  const related = products.filter(p => p.id !== product.id && p.tags.some(t => product.tags.includes(t))).slice(0, 4);

  return (
    <div>
      <div className="container mx-auto px-4 lg:px-8 py-10 grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-[4/5] rounded-xl overflow-hidden">
            <ProductImage product={product} className="h-full" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[0,1,2].map(i => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden opacity-70 hover:opacity-100 cursor-pointer transition">
                <ProductImage product={product} className="h-full" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{product.category[lang]}</p>
          <h1 className="font-display text-4xl md:text-5xl mt-3">{product.name[lang]}</h1>
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-2xl font-display">{formatPrice(product.price, lang)}</span>
            {product.compareAt && <span className="text-base text-muted-foreground line-through">{formatPrice(product.compareAt, lang)}</span>}
            {product.compareAt && <span className="text-xs px-2 py-1 bg-[var(--burgundy)] text-white rounded">-{Math.round((1 - product.price / product.compareAt) * 100)}% {t.product.off}</span>}
          </div>
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description[lang]}</p>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-widest mb-3">{t.product.color}: <span className="text-muted-foreground normal-case tracking-normal">{color}</span></p>
            <div className="flex gap-2">
              {product.colors.map(c => (
                <button key={c.name} onClick={() => setColor(c.name)} aria-label={c.name}
                  className={cn("size-9 rounded-full border-2 transition", color === c.name ? "border-[var(--burgundy)] ring-2 ring-[var(--burgundy)]/20" : "border-border")}
                  style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest mb-3">{t.product.size}</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSize(s)}
                  className={cn("min-w-12 h-11 px-4 rounded border text-sm transition", size === s ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground")}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest mb-3">{t.product.quantity}</p>
            <div className="inline-flex items-center border border-border rounded">
              <button className="size-11 grid place-items-center hover:bg-secondary" onClick={() => setQty(q => Math.max(1, q - 1))}><Minus className="size-4" /></button>
              <span className="w-12 text-center">{qty}</span>
              <button className="size-11 grid place-items-center hover:bg-secondary" onClick={() => setQty(q => q + 1)}><Plus className="size-4" /></button>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button size="lg" className="flex-1 bg-[var(--burgundy)] hover:bg-[var(--burgundy)]/90 text-white rounded-full h-13 py-3 tracking-widest uppercase text-xs"
              onClick={() => { addToCart(product, color, size, qty); toast.success(`${product.name[lang]} added to cart`); }}>
              {t.actions.addToCart}
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-13 px-5" onClick={() => toggleWishlist(product.id)}>
              <Heart className={cn("size-5", wished && "fill-[var(--burgundy)] text-[var(--burgundy)]")} />
            </Button>
          </div>

          <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">✓ {t.product.inStock} · {t.cart.shipping}</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container mx-auto px-4 lg:px-8 my-20">
          <h2 className="font-display text-3xl mb-8">{t.product.related}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
