import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter, Newsletter } from "@/components/site-footer";
import { articles } from "@/lib/articles";
import { Calendar, Clock } from "lucide-react";

const BASE_URL = "https://gaiacreative.com.br";

export const Route = createFileRoute("/artigos/")({
  head: () => ({
    meta: [
      { title: "Todos os Artigos — Gaia Creative" },
      {
        name: "description",
        content:
          "Todos os artigos do Gaia Creative sobre como abrir, gerir e escalar agências de marketing no Brasil.",
      },
      { property: "og:title", content: "Todos os Artigos — Gaia Creative" },
      { property: "og:url", content: `${BASE_URL}/artigos` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${BASE_URL}/artigos` }],
  }),
  component: ArticlesIndex,
});

function ArticlesIndex() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container-blog py-16">
        <header className="mb-12 max-w-3xl">
          <span className="badge-pill bg-[color:var(--badge-teal)]">Biblioteca</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
            Todos os Artigos
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Estratégia, vendas, precificação e ferramentas para founders de agência que
            querem crescer com previsibilidade.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a.slug}
              to="/artigos/$slug"
              params={{ slug: a.slug }}
              className="card-hover group overflow-hidden rounded-2xl bg-card border border-border block"
            >
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={a.image}
                  alt={a.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className={`absolute top-3 left-3 badge-pill bg-[color:var(--badge-${a.badgeColor})]`}>
                  {a.badge}
                </span>
              </div>
              <div className="p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-pink mb-2">
                  {a.category}
                </div>
                <h2 className="text-xl font-black leading-snug group-hover:text-teal transition-colors">
                  {a.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {a.subtitle}
                </p>
                <div className="mt-4 flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {a.date}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {a.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Newsletter />
      <SiteFooter />
    </div>
  );
}
