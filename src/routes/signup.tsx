import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const { t, login } = useStore();
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || !email.includes("@") || password.length < 6) { toast.error("Please complete the form"); return; }
    login(email, name);
    toast.success(`Welcome to Flowra, ${name}`);
    navigate({ to: "/" });
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="font-display text-4xl text-center mb-8">{t.auth.signupTitle}</h1>
      <form onSubmit={submit} className="space-y-4">
        <Field label={t.auth.name} type="text" value={name} onChange={setName} />
        <Field label={t.auth.email} type="email" value={email} onChange={setEmail} />
        <Field label={t.auth.password} type="password" value={password} onChange={setPassword} />
        <Button type="submit" className="w-full bg-[var(--burgundy)] hover:bg-[var(--burgundy)]/90 text-white rounded-full h-12 tracking-widest uppercase text-xs">{t.actions.signup}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">{t.auth.haveAccount} <Link to="/login" className="underline text-foreground">{t.actions.login}</Link></p>
    </div>
  );
}

function Field({ label, type, value, onChange }: { label: string; type: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} required className="mt-2 block w-full bg-background border border-border rounded h-12 px-4 outline-none focus:border-[var(--burgundy)]" />
    </label>
  );
}
