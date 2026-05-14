import { createFileRoute, Link } from "@tanstack/react-router";
import { products, byBadge } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { t } = useStore();
  const featured = products.slice(0, 4);
  const newArrivals = byBadge("new").slice(0, 4);
  const offers = byBadge("offer").slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[var(--rose-soft)] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 z-10 text-center lg:text-left rtl:lg:text-right">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--burgundy)]">{t.hero.eyebrow}</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mt-6 leading-[1.05]">{t.hero.title}</h1>
            <div className="my-6 mx-auto lg:mx-0 rtl:lg:mx-0 h-px w-16 bg-[var(--burgundy)]" />
            <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">{t.hero.subtitle}</p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-[var(--burgundy)] hover:bg-[var(--burgundy)]/90 text-white rounded-full px-10 h-12 tracking-widest uppercase text-xs">
                <Link to="/shop">{t.hero.cta}</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-8 rounded-full bg-[var(--rose-blush)] blur-3xl opacity-50" />
            <img src={heroImg} alt={t.hero.title} width={1600} height={1100} className="relative rounded-2xl object-cover w-full h-[500px] lg:h-[640px]" />
          </div>
        </div>
      </section>

      {/* Featured */}
      <Section title={t.sections.featured} link="/shop" linkLabel={t.sections.browse}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      {/* Editorial */}
      <section className="container mx-auto px-4 lg:px-8 my-24">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-[var(--rose-blush)] to-[var(--rose-soft)] p-10 flex flex-col justify-end">
            <p className="text-xs uppercase tracking-widest text-[var(--burgundy)]">Edit 01</p>
            <h3 className="font-display text-4xl mt-3">The Rose Collection</h3>
            <Link to="/new-arrivals" className="mt-4 text-sm underline underline-offset-4">{t.sections.browse} →</Link>
          </div>
          <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-[#1a2540] to-[#2d3a5f] p-10 flex flex-col justify-end text-white">
            <p className="text-xs uppercase tracking-widest text-white/70">Edit 02</p>
            <h3 className="font-display text-4xl mt-3">Evening Allure</h3>
            <Link to="/best-sellers" className="mt-4 text-sm underline underline-offset-4 text-white">{t.sections.browse} →</Link>
          </div>
        </div>
      </section>

      <Section title={t.sections.new} link="/new-arrivals" linkLabel={t.sections.browse}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>

      <Section title={t.sections.offers} link="/offers" linkLabel={t.sections.browse}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {offers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, link, linkLabel, children }: { title: string; link: string; linkLabel: string; children: React.ReactNode }) {
  return (
    <section className="container mx-auto px-4 lg:px-8 my-20">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
        <Link to={link} className="text-xs uppercase tracking-[0.2em] hover:text-[var(--burgundy)]">{linkLabel} →</Link>
      </div>
      {children}
    </section>
  );
}
