import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { products } from "@/lib/products";
import { ProductImage } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";

export const Route = createFileRoute("/cart")({ component: Cart });

function Cart() {
  const { t, lang, cart, updateQty, removeFromCart, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-4xl">{t.cart.empty}</h1>
        <Button asChild className="mt-8 bg-[var(--burgundy)] hover:bg-[var(--burgundy)]/90 text-white rounded-full px-8"><Link to="/shop">{t.actions.continueShopping}</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 grid lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <h1 className="font-display text-4xl mb-8">{t.cart.title}</h1>
        <ul className="divide-y divide-border">
          {cart.map((item, idx) => {
            const p = products.find(p => p.id === item.productId)!;
            return (
              <li key={idx} className="py-6 flex gap-4">
                <Link to="/product/$slug" params={{ slug: p.slug }} className="size-24 sm:size-32 rounded-lg overflow-hidden shrink-0">
                  <ProductImage product={p} className="h-full" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to="/product/$slug" params={{ slug: p.slug }} className="font-display text-xl">{p.name[lang]}</Link>
                  <p className="text-xs text-muted-foreground mt-1">{item.color} · {item.size}</p>
                  <div className="mt-3 flex items-center justify-between gap-4 flex-wrap">
                    <div className="inline-flex items-center border border-border rounded">
                      <button className="size-8 grid place-items-center" onClick={() => updateQty(idx, item.qty - 1)}><Minus className="size-3" /></button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button className="size-8 grid place-items-center" onClick={() => updateQty(idx, item.qty + 1)}><Plus className="size-3" /></button>
                    </div>
                    <span className="text-base">${(p.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
                <button onClick={() => removeFromCart(idx)} className="size-8 grid place-items-center text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
              </li>
            );
          })}
        </ul>
      </div>
      <aside className="bg-secondary/50 rounded-xl p-6 h-fit lg:sticky lg:top-24">
        <h2 className="font-display text-2xl mb-4">Summary</h2>
        <div className="flex justify-between text-sm py-2"><span>{t.cart.subtotal}</span><span>${cartTotal.toFixed(2)}</span></div>
        <div className="flex justify-between text-sm py-2 text-muted-foreground"><span>{t.cart.shipping}</span><span>—</span></div>
        <div className="flex justify-between text-base font-medium py-3 border-t border-border mt-2"><span>{t.cart.total}</span><span>${cartTotal.toFixed(2)}</span></div>
        <Button className="w-full mt-4 bg-[var(--burgundy)] hover:bg-[var(--burgundy)]/90 text-white rounded-full h-12 tracking-widest uppercase text-xs">{t.actions.checkout}</Button>
      </aside>
    </div>
  );
}
