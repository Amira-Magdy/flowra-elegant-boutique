import { createFileRoute } from "@tanstack/react-router";
import { byBadge } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/best-sellers")({ component: Page });

function Page() {
  const { t } = useStore();
  const items = byBadge("best");
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <header className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--burgundy)]">{t.brand}</p>
        <h1 className="font-display text-5xl mt-4">{t.sections.best}</h1>
      </header>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">{items.map(p => <ProductCard key={p.id} product={p} />)}</div>
    </div>
  );
}
