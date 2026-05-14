import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({ component: Wishlist });

function Wishlist() {
  const { t, wishlist } = useStore();
  const items = products.filter(p => wishlist.includes(p.id));
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <header className="text-center mb-12">
        <h1 className="font-display text-5xl">{t.wishlist.title}</h1>
      </header>
      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">{t.wishlist.empty}</p>
          <Button asChild className="mt-6 bg-[var(--burgundy)] hover:bg-[var(--burgundy)]/90 text-white rounded-full px-8"><Link to="/shop">{t.actions.continueShopping}</Link></Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">{items.map(p => <ProductCard key={p.id} product={p} />)}</div>
      )}
    </div>
  );
}
