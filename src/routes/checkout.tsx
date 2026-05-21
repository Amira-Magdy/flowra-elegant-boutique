import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/i18n";
import { ProductImage } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Upload, Banknote, CreditCard, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Checkout — Flowra" },
      { name: "description", content: "Complete your order on Flowra." },
    ],
  }),
});

type Payment = "cod" | "bank";

const SHIPPING_FEE = 80;
const TAX_RATE = 0.14;

function Checkout() {
  const { t, lang, cart, cartTotal } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = React.useState({ fullName: "", email: "", address: "", phone: "", phone2: "" });
  const [payment, setPayment] = React.useState<Payment>("cod");
  const [receiptName, setReceiptName] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<Record<string, boolean>>({});
  const [success, setSuccess] = React.useState(false);

  const subtotal = cartTotal;
  const tax = Math.round(subtotal * TAX_RATE);
  const shippingAndTax = cart.length > 0 ? SHIPPING_FEE + tax : 0;
  const grandTotal = subtotal + shippingAndTax;

  React.useEffect(() => {
    if (cart.length === 0 && !success) navigate({ to: "/cart" });
  }, [cart.length, success, navigate]);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(er => ({ ...er, [k]: false }));
  };

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!form.fullName.trim()) e.fullName = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true;
    if (!form.address.trim()) e.address = true;
    if (!form.phone.trim()) e.phone = true;
    if (payment === "bank" && !receiptName) e.receipt = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (success) return <SuccessScreen />;

  return (
    <div className="bg-[var(--rose-soft)]/30 min-h-[80vh]">
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--burgundy)]">{t.brand}</p>
          <h1 className="font-display text-4xl md:text-5xl mt-3">{t.checkout.title}</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
          <div className="bg-background rounded-2xl border border-border p-6 lg:p-10 space-y-8 shadow-sm">
            <section className="space-y-5">
              <h2 className="font-display text-2xl">{lang === "ar" ? "بيانات الشحن" : "Shipping Details"}</h2>
              <Field label={t.checkout.fullName} error={errors.fullName ? t.checkout.required : null}>
                <Input value={form.fullName} onChange={update("fullName")} className="h-11" />
              </Field>
              <Field label={t.checkout.email} error={errors.email ? t.checkout.required : null}>
                <Input type="email" value={form.email} onChange={update("email")} className="h-11" />
              </Field>
              <Field label={t.checkout.address} error={errors.address ? t.checkout.required : null}>
                <textarea rows={3} value={form.address} onChange={update("address")}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none" />
              </Field>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={t.checkout.phone} error={errors.phone ? t.checkout.required : null}>
                  <Input type="tel" dir="ltr" value={form.phone} onChange={update("phone")} className="h-11" />
                </Field>
                <Field label={t.checkout.phone2}>
                  <Input type="tel" dir="ltr" value={form.phone2} onChange={update("phone2")} className="h-11" />
                </Field>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl">{t.checkout.paymentMethod}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <PaymentOption active={payment === "cod"} onClick={() => setPayment("cod")} icon={<Banknote className="size-5" />} label={t.checkout.cod} />
                <PaymentOption active={payment === "bank"} onClick={() => setPayment("bank")} icon={<CreditCard className="size-5" />} label={t.checkout.bank} />
              </div>

              {payment === "bank" && (
                <div className="rounded-xl border border-border bg-secondary/40 p-5 space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.checkout.bankInfo}</p>
                  <label className={cn("flex items-center justify-between gap-3 rounded-lg border border-dashed cursor-pointer p-4 transition hover:border-[var(--burgundy)] bg-background", errors.receipt ? "border-destructive" : "border-border")}>
                    <div className="flex items-center gap-3 min-w-0">
                      <Upload className="size-4 shrink-0 text-[var(--burgundy)]" />
                      <span className="text-sm truncate">{receiptName ?? t.checkout.uploadReceipt}</span>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[var(--burgundy)] shrink-0">{lang === "ar" ? "اختر" : "Browse"}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) { setReceiptName(f.name); setErrors(er => ({ ...er, receipt: false })); }
                    }} />
                  </label>
                  {errors.receipt && <p className="text-xs text-destructive">{t.checkout.required}</p>}
                </div>
              )}
            </section>

            <Button type="submit" className="w-full bg-[var(--burgundy)] hover:bg-[var(--burgundy)]/90 text-white rounded-full tracking-widest uppercase text-xs h-12">
              {t.checkout.placeOrder}
            </Button>
          </div>

          <aside className="bg-background rounded-2xl border border-border p-6 lg:sticky lg:top-24 shadow-sm">
            <h2 className="font-display text-2xl mb-5">{t.checkout.summary}</h2>
            <ul className="divide-y divide-border max-h-[360px] overflow-y-auto pr-1">
              {cart.map((item, idx) => {
                const p = products.find(p => p.id === item.productId);
                if (!p) return null;
                return (
                  <li key={idx} className="py-4 flex gap-3">
                    <div className="size-16 rounded-md overflow-hidden shrink-0 bg-secondary">
                      <ProductImage product={p} className="h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm leading-tight truncate">{p.name[lang]}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{item.color} · {item.size} · ×{item.qty}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatPrice(p.price, lang)} <span className="opacity-60">/ {lang === "ar" ? "قطعة" : "pc"}</span></p>
                    </div>
                    <span className="text-sm font-medium self-center">{formatPrice(p.price * item.qty, lang)}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 pt-5 border-t border-border space-y-2 text-sm">
              <Row label={t.cart.subtotal} value={formatPrice(subtotal, lang)} />
              <Row label={t.checkout.shipping} value={formatPrice(shippingAndTax, lang)} muted />
              <div className="flex justify-between pt-3 mt-2 border-t border-border text-base font-medium">
                <span>{t.checkout.total}</span>
                <span className="text-[var(--burgundy)]">{formatPrice(grandTotal, lang)}</span>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string | null; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
      {error && <span className="text-xs text-destructive block">{error}</span>}
    </label>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={cn("flex justify-between", muted && "text-muted-foreground")}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}

function PaymentOption({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button type="button" onClick={onClick}
      className={cn("flex items-center gap-3 rounded-xl border p-4 text-left rtl:text-right transition", active ? "border-[var(--burgundy)] bg-[var(--rose-soft)]/40 shadow-sm" : "border-border hover:border-[var(--burgundy)]/50")}>
      <span className={cn("size-9 grid place-items-center rounded-full", active ? "bg-[var(--burgundy)] text-white" : "bg-secondary text-foreground")}>{icon}</span>
      <span className="text-sm font-medium flex-1">{label}</span>
      {active && <Check className="size-4 text-[var(--burgundy)]" />}
    </button>
  );
}

function SuccessScreen() {
  const { t } = useStore();
  return (
    <div className="min-h-[80vh] grid place-items-center bg-gradient-to-b from-[var(--rose-soft)]/60 to-background px-4 py-16">
      <div className="max-w-md w-full text-center bg-background rounded-3xl border border-border p-10 shadow-xl animate-in fade-in zoom-in-95 duration-500">
        <div className="relative mx-auto size-20 rounded-full bg-[var(--burgundy)] text-white grid place-items-center mb-6">
          <Check className="size-10" strokeWidth={2.5} />
          <Sparkles className="absolute -top-2 -right-2 size-5 text-[var(--burgundy)]" />
          <Sparkles className="absolute -bottom-1 -left-3 size-4 text-[var(--burgundy)]/80" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl leading-tight">{t.checkout.successTitle}</h1>
        <p className="mt-4 text-sm text-muted-foreground">{t.checkout.successMsg}</p>
        <Button asChild className="mt-8 bg-[var(--burgundy)] hover:bg-[var(--burgundy)]/90 text-white rounded-full px-8 h-12 tracking-widest uppercase text-xs">
          <Link to="/">{t.checkout.backHome}</Link>
        </Button>
      </div>
    </div>
  );
}
