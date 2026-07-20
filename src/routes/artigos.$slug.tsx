import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter, Newsletter } from "@/components/site-footer";
import { BlockRenderer } from "@/components/article-blocks";
import { articles, getArticle, type FullArticle } from "@/lib/articles";
import { Clock, Calendar, User, ChevronRight, Share2, Link2, ExternalLink } from "lucide-react";

const BASE_URL = "https://gaiacreative.com.br";

export const Route = createFileRoute("/artigos/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Artigo — Gaia Creative" }] };
    const a = loaderData.article;
    const url = `${BASE_URL}/artigos/${params.slug}`;
    return {
      meta: [
        { title: `${a.title} | Gaia Creative` },
        { name: "description", content: a.metaDescription },
        { name: "keywords", content: a.keywords.join(", ") },
        { name: "author", content: a.author },
        { name: "article:published_time", content: a.dateISO },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: a.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: a.title },
        { name: "twitter:description", content: a.metaDescription },
        { name: "twitter:image", content: a.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.metaDescription,
            image: a.image,
            author: { "@type": "Person", name: a.author },
            publisher: { "@type": "Organization", name: "Gaia Creative" },
            datePublished: a.dateISO,
            dateModified: a.dateISO,
            mainEntityOfPage: url,
            inLanguage: "pt-BR",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: a.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Início", item: `${BASE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Artigos", item: `${BASE_URL}/artigos` },
              { "@type": "ListItem", position: 3, name: a.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-center px-4">
      <div>
        <h1 className="text-4xl font-black mb-2">Artigo não encontrado</h1>
        <p className="text-muted-foreground mb-6">Talvez tenha sido movido ou nunca existiu.</p>
        <Link to="/" className="text-teal font-bold">
          Voltar para o início
        </Link>
      </div>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article: a } = Route.useLoaderData();
  const headings = a.blocks.filter(
    (b): b is Extract<typeof a.blocks[number], { type: "h2"; id?: string }> =>
      b.type === "h2" && !!b.id,
  );

  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* HERO */}
        <header className="relative">
          <div className="relative h-[440px] sm:h-[520px]">
            <img
              src={a.image}
              alt={a.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-transparent" />
            <div className="container-blog relative h-full flex flex-col justify-end pb-10">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Link to="/" className="hover:text-teal">Início</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground/80">{a.category}</span>
              </nav>
              <span className="badge-pill bg-[color:var(--badge-teal)] w-fit">{a.badge}</span>
              <h1 className="mt-4 max-w-4xl text-3xl sm:text-5xl font-black leading-[1.1] tracking-tight">
                {a.title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm sm:text-lg text-muted-foreground leading-relaxed">
                {a.subtitle}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4 text-teal" /> {a.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-teal" /> {a.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-teal" /> {a.readTime} de leitura
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* BODY */}
        <div className="container-blog py-14 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            {/* Article */}
            <article className="min-w-0">
              {/* TL;DR */}
              <div className="mb-10 rounded-2xl border border-teal/30 bg-teal/5 p-5 sm:p-6">
                <div className="text-[11px] font-bold tracking-widest text-teal mb-3">
                  RESUMO EXECUTIVO
                </div>
                <ul className="space-y-2">
                  {a.tldr.map((t, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {a.blocks.map((b, i) => (
                <BlockRenderer key={i} block={b} />
              ))}

              {/* Divider */}
              <hr className="my-12 border-border" />

              {/* FAQ */}
              <section aria-labelledby="faq-title">
                <h2 id="faq-title" className="text-2xl sm:text-3xl font-black mb-6 pl-4 border-l-4 border-pink">
                  Perguntas Frequentes
                </h2>
                <div className="space-y-3">
                  {a.faq.map((f, i) => (
                    <details
                      key={i}
                      className="group rounded-xl border border-border bg-card/40 p-5 open:bg-card/70 transition"
                    >
                      <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-bold">
                        <span>{f.q}</span>
                        <ChevronRight className="h-5 w-5 shrink-0 text-teal transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/80">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* External sources */}
              {a.externalLinks.length > 0 && (
                <section className="mt-12">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-pink" /> Fontes e leituras externas
                  </h3>
                  <ul className="space-y-2">
                    {a.externalLinks.map((l, i) => (
                      <li key={i} className="text-sm">
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-teal hover:underline"
                        >
                          {l.title}
                        </a>{" "}
                        <span className="text-muted-foreground">— {l.source}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Author card */}
              <section className="mt-12 rounded-2xl border border-border bg-card/50 p-6 flex gap-4 items-center">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-teal to-pink shrink-0" />
                <div className="min-w-0">
                  <div className="text-[11px] font-bold tracking-widest text-muted-foreground">
                    ESCRITO POR
                  </div>
                  <div className="font-bold">{a.author}</div>
                  <p className="text-sm text-foreground/70 mt-1">{a.authorBio}</p>
                </div>
              </section>
            </article>

            {/* SIDEBAR */}
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
              {headings.length > 0 && (
                <nav className="rounded-2xl border border-border bg-card/50 p-5">
                  <div className="text-[11px] font-bold tracking-widest text-muted-foreground mb-3">
                    NESTE ARTIGO
                  </div>
                  <ul className="space-y-2 text-sm">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="flex gap-2 text-foreground/75 hover:text-teal transition-colors leading-snug"
                        >
                          <span className="text-pink">›</span>
                          <span>{h.text}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="rounded-2xl border border-border bg-card/50 p-5">
                <div className="text-[11px] font-bold tracking-widest text-muted-foreground mb-3">
                  <Share2 className="h-3.5 w-3.5 inline mr-1" /> COMPARTILHAR
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${a.title} — ${BASE_URL}/artigos/${a.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-bold rounded-lg bg-teal/15 text-teal py-2 hover:bg-teal/25"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${BASE_URL}/artigos/${a.slug}`)}&text=${encodeURIComponent(a.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-bold rounded-lg bg-pink/15 text-pink py-2 hover:bg-pink/25"
                  >
                    X / Twitter
                  </a>
                </div>
              </div>

              {a.internalLinks.length > 0 && (
                <div className="rounded-2xl border border-border bg-card/50 p-5">
                  <div className="text-[11px] font-bold tracking-widest text-muted-foreground mb-3">
                    <Link2 className="h-3.5 w-3.5 inline mr-1" /> LEIA TAMBÉM
                  </div>
                  <ul className="space-y-3">
                    {a.internalLinks.map((l) => (
                      <li key={l.slug}>
                        <Link
                          to="/artigos/$slug"
                          params={{ slug: l.slug }}
                          className="text-sm font-medium text-foreground/85 hover:text-teal leading-snug block"
                        >
                          {l.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>

        {/* RELATED */}
        <section className="bg-card/40 border-y border-border py-16">
          <div className="container-blog">
            <h2 className="text-2xl sm:text-3xl font-black mb-8">Continue Explorando</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/artigos/$slug"
                  params={{ slug: r.slug }}
                  className="card-hover group overflow-hidden rounded-xl bg-card border border-border block"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className={`absolute top-3 left-3 badge-pill bg-[color:var(--badge-${r.badgeColor})]`}>
                      {r.badge}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold leading-snug group-hover:text-teal transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {r.author} · {r.date} · {r.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}
