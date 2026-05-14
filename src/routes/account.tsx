import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import * as React from "react";

export const Route = createFileRoute("/account")({ component: Account });

function Account() {
  const { t, user, logout } = useStore();
  const navigate = useNavigate();
  React.useEffect(() => { if (!user) navigate({ to: "/login" }); }, [user, navigate]);
  if (!user) return null;
  return (
    <div className="container mx-auto px-4 py-16 max-w-md text-center">
      <h1 className="font-display text-4xl">{t.actions.account}</h1>
      <p className="mt-4 text-muted-foreground">{user.name}</p>
      <p className="text-sm text-muted-foreground">{user.email}</p>
      <div className="mt-8 flex gap-3 justify-center">
        <Button asChild variant="outline" className="rounded-full"><Link to="/wishlist">{t.actions.wishlist}</Link></Button>
        <Button onClick={logout} className="rounded-full bg-[var(--burgundy)] hover:bg-[var(--burgundy)]/90 text-white">{t.actions.logout}</Button>
      </div>
    </div>
  );
}
