import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter, Newsletter } from "@/components/site-footer";
import { ArticleCard, OverlayCard, SectionTitle, Badge, AuthorLine } from "@/components/article-parts";
import {
  hero,
  dailyDiscoveries,
  trending,
  editorLarge,
  editorSmall,
  featured,
  categories,
  buzz,
} from "@/lib/blog-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gaia Creative — Blog para Donos de Agência de Marketing" },
      {
        name: "description",
        content:
          "Estratégias, ferramentas e táticas para quem quer abrir e escalar uma agência de marketing lucrativa. Conteúdo em português para founders de agência.",
      },
      { property: "og:title", content: "Gaia Creative — Blog para Donos de Agência" },
      {
        property: "og:description",
        content:
          "Estratégias, ferramentas e táticas para quem quer abrir e escalar uma agência de marketing lucrativa.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Gaia Creative",
          inLanguage: "pt-BR",
          description:
            "Blog em português sobre como abrir, gerir e escalar agências de marketing digital.",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="relative h-[560px]">
            <img
              src={hero.image}
              alt={hero.title}
              width={1600}
              height={900}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
            <div className="container-blog relative h-full flex flex-col justify-end pb-16">
              <Badge color={hero.badgeColor}>{hero.badge}</Badge>
              <h1 className="mt-4 max-w-3xl text-3xl sm:text-5xl font-black leading-tight">
                {hero.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">{hero.excerpt}</p>
              <div className="mt-4">
                <AuthorLine author={hero.author} date={hero.date} readTime={hero.readTime} />
              </div>
            </div>
          </div>

          {/* Featured strip */}
          <div className="container-blog -mt-10 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dailyDiscoveries.slice(0, 4).map((a) => (
                <a key={a.title} href="#" className="card-hover flex items-center gap-3 bg-card border border-border rounded-xl p-3">
                  <img src={a.image} alt={a.title} width={64} height={64} loading="lazy" className="h-16 w-16 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0">
                    <Badge color={a.badgeColor}>{a.badge}</Badge>
                    <div className="mt-1 text-xs font-bold line-clamp-2">{a.title}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* DAILY DISCOVERIES */}
        <section id="ferramentas" className="container-blog py-20">
          <SectionTitle title="Descobertas do Dia" subtitle="Novidades para Aprender" action="LEIA MAIS" />
          <div className="grid gap-6 lg:grid-cols-2">
            <OverlayCard article={dailyDiscoveries[0]} size="lg" />
            <OverlayCard article={dailyDiscoveries[1]} size="lg" />
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dailyDiscoveries.slice(2).map((a) => (
              <OverlayCard key={a.title} article={a} />
            ))}
          </div>
        </section>

        {/* TRENDING */}
        <section id="gestão" className="bg-card/40 py-20 border-y border-border">
          <div className="container-blog">
            <SectionTitle title="Posts em Alta" subtitle="Você leu na semana" action="LEIA MAIS" />
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr]">
              <OverlayCard article={trending[0]} size="lg" className="!h-[600px]" />
              <div className="flex flex-col gap-6">
                {trending.slice(1, 3).map((a) => (
                  <OverlayCard key={a.title} article={a} className="!h-[288px]" />
                ))}
              </div>
              <div className="flex flex-col gap-6">
                {trending.slice(3, 5).map((a) => (
                  <OverlayCard key={a.title} article={a} className="!h-[288px]" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EDITOR'S CHOICE */}
        <section id="vendas" className="container-blog py-20">
          <SectionTitle title="Escolha do Editor" subtitle="Nossas Melhores Histórias" action="LEIA MAIS" />
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <OverlayCard article={editorLarge} size="lg" />
            <div className="flex flex-col gap-4">
              {editorSmall.map((a) => (
                <a key={a.title} href="#" className="card-hover group flex items-center gap-4 bg-card border border-border rounded-xl p-3">
                  <img src={a.image} alt={a.title} width={120} height={90} loading="lazy" className="h-[90px] w-[120px] rounded-lg object-cover shrink-0" />
                  <div className="min-w-0">
                    <Badge color={a.badgeColor}>{a.badge}</Badge>
                    <h3 className="mt-1 text-sm font-bold group-hover:text-teal line-clamp-2">{a.title}</h3>
                    <div className="mt-1 text-[11px] text-muted-foreground">{a.author} · {a.date}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* BUZZ CHRONICLES */}
        <section id="nichos" className="bg-card/40 py-20 border-y border-border">
          <div className="container-blog">
            <SectionTitle title="Crônicas do Buzz" subtitle="Explore as Últimas Notícias" action="LEIA MAIS" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {buzz.slice(0, 4).map((a) => (
                <OverlayCard key={a.title} article={a} />
              ))}
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {buzz.slice(4, 8).map((a) => (
                <OverlayCard key={a.title} article={a} />
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED ARTICLES */}
        <section id="carreira" className="container-blog py-20">
          <SectionTitle title="Artigos em Destaque" subtitle="Pensamentos e Tendências" action="LEIA MAIS" />
          <div className="grid gap-6 lg:grid-cols-3">
            {featured.map((a) => (
              <article key={a.title} className="card-hover group overflow-hidden rounded-xl bg-card border border-border">
                <a href="#" className="block">
                  <div className="relative h-[240px] overflow-hidden">
                    <img src={a.image} alt={a.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 left-3">
                      <Badge color={a.badgeColor}>{a.badge}</Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-teal">{a.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{a.excerpt}</p>
                    <AuthorLine author={a.author} date={a.date} readTime={a.readTime} />
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* EXPLORE CATEGORIES */}
        <section className="bg-card/40 py-20 border-y border-border">
          <div className="container-blog">
            <SectionTitle title="Explore Categorias" subtitle="Encontre o que Ama" action="VER TUDO" />
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((c) => (
                <a key={c.slug} href="#" className="card-hover group relative overflow-hidden rounded-xl h-[180px]">
                  <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-bold text-sm truncate">{c.name}</div>
                      <div className="text-[11px] text-muted-foreground">{c.count} artigos</div>
                    </div>
                    <span className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/40 group-hover:bg-pink group-hover:border-pink">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </a>
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

// Silence unused import lint
void ArticleCard;
