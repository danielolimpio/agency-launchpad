import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gaia Creative — Blog para Donos de Agência de Marketing" },
      {
        name: "description",
        content:
          "Estratégias, ferramentas e táticas para quem quer abrir e escalar uma agência de marketing lucrativa. Conteúdo em português para founders de agência.",
      },
      { property: "og:site_name", content: "Gaia Creative" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Gaia Creative — Blog para Donos de Agência de Marketing" },
      { name: "twitter:title", content: "Gaia Creative — Blog para Donos de Agência de Marketing" },
      { property: "og:description", content: "Estratégias, ferramentas e táticas para quem quer abrir e escalar uma agência de marketing lucrativa. Conteúdo em português para founders de agência." },
      { name: "twitter:description", content: "Estratégias, ferramentas e táticas para quem quer abrir e escalar uma agência de marketing lucrativa. Conteúdo em português para founders de agência." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8c86b689-c215-4669-8a13-05c4129b15f9/id-preview-fcc1e172--278eed34-7e1b-459b-a4f5-255ad97abab0.lovable.app-1784491319840.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8c86b689-c215-4669-8a13-05c4129b15f9/id-preview-fcc1e172--278eed34-7e1b-459b-a4f5-255ad97abab0.lovable.app-1784491319840.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://elite-agency-hub.lovable.app/#organization",
              name: "Gaia Creative",
              url: "https://elite-agency-hub.lovable.app",
              logo: {
                "@type": "ImageObject",
                url: "https://elite-agency-hub.lovable.app/favicon.ico",
                width: 48,
                height: 48,
              },
              sameAs: [
                "https://www.instagram.com/gaiacreative",
                "https://www.linkedin.com/company/gaiacreative",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://elite-agency-hub.lovable.app/#website",
              name: "Gaia Creative — Blog e Estratégias para Donos de Agência",
              url: "https://elite-agency-hub.lovable.app",
              publisher: {
                "@id": "https://elite-agency-hub.lovable.app/#organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://elite-agency-hub.lovable.app/artigos?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
