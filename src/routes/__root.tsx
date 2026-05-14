import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { StoreProvider } from "@/lib/store";
import { products } from "@/lib/products";
import { Header, Footer } from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <p className="mt-4 text-muted-foreground">This page doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block underline">Back home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="font-display text-2xl">Something went wrong</h1>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-4 underline">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Flowra — Princess Elegance" },
      { name: "description", content: "Flowra: timeless elegance crafted for your special occasions." },
      { property: "og:title", content: "Flowra — Princess Elegance" },
      { name: "twitter:title", content: "Flowra — Princess Elegance" },
      { property: "og:description", content: "Flowra: timeless elegance crafted for your special occasions." },
      { name: "twitter:description", content: "Flowra: timeless elegance crafted for your special occasions." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0514d71b-e6a9-4574-98f9-18ee1e0e1175/id-preview-dd37a20d--464df162-43a0-41a6-8530-f9601b5e5859.lovable.app-1778745395367.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0514d71b-e6a9-4574-98f9-18ee1e0e1175/id-preview-dd37a20d--464df162-43a0-41a6-8530-f9601b5e5859.lovable.app-1778745395367.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Amiri:wght@400;700&family=Tajawal:wght@300;400;500;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider products={products}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1"><Outlet /></main>
          <Footer />
        </div>
        <Toaster />
      </StoreProvider>
    </QueryClientProvider>
  );
}
