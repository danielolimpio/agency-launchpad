// Exportador estático para hospedagem em Hostinger (Apache).
//
// O build do TanStack Start pode variar o diretório público conforme versão/
// ambiente. Em vez de assumir cegamente dist/client/assets, este script:
// 1) localiza automaticamente o diretório de assets real dentro de dist/.output;
// 2) escolhe o entry JS verdadeiro do cliente;
// 3) normaliza tudo para dist/client, que é a pasta enviada via FTP;
// 4) gera index.html, sitemap.xml, robots.txt, .htaccess e 404.html.
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const OUT_DIR = join(ROOT, "dist", "client");
const SITE_URL = "https://gaiacreative.com.br";

function slash(path) {
  return path.split("\\").join("/");
}

function listFiles(dir) {
  if (!existsSync(dir)) return [];
  const entries = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) entries.push(...listFiles(full));
    else if (stat.isFile()) entries.push(full);
  }
  return entries;
}

function listDirs(dir) {
  if (!existsSync(dir)) return [];
  const entries = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      entries.push(full, ...listDirs(full));
    }
  }
  return entries;
}

function printBuildDiagnostics() {
  console.error("\nDiagnóstico do build encontrado no runner:");
  for (const dir of ["dist", ".output", "build", "out"]) {
    const full = join(ROOT, dir);
    if (!existsSync(full)) {
      console.error(`- ${dir}/ não existe`);
      continue;
    }
    const files = listFiles(full)
      .map((f) => slash(relative(ROOT, f)))
      .slice(0, 80);
    console.error(`- ${dir}/ existe; primeiros arquivos:`);
    for (const file of files) console.error(`  • ${file}`);
  }
}

function findAssetsDir() {
  const directCandidates = [
    join(ROOT, "dist", "client", "assets"),
    join(ROOT, ".output", "public", "assets"),
    join(ROOT, "dist", "public", "assets"),
    join(ROOT, ".output", "client", "assets"),
    join(ROOT, "build", "client", "assets"),
    join(ROOT, "out", "assets"),
  ];

  const discoveredCandidates = ["dist", ".output", "build", "out"]
    .flatMap((dir) => listDirs(join(ROOT, dir)))
    .filter((dir) => dir.endsWith(`${slash("/assets")}`) || dir.endsWith("assets"));

  const candidates = [...new Set([...directCandidates, ...discoveredCandidates])];
  return candidates.find((dir) => listFiles(dir).some((file) => file.endsWith(".js")));
}

function pickEntryJs(assetsDir) {
  const jsFiles = listFiles(assetsDir)
    .filter((file) => file.endsWith(".js"))
    .sort((a, b) => statSync(b).size - statSync(a).size);

  const preferred = jsFiles.find((file) => /^index-[\w-]+\.js$/.test(slash(relative(assetsDir, file))));
  if (preferred) return preferred;

  const hydratedEntry = jsFiles.find((file) => {
    const source = readdirSafeRead(file);
    return source.includes("hydrateRoot") && source.includes("document");
  });
  return hydratedEntry ?? jsFiles[0];
}

function readdirSafeRead(file) {
  try {
    return readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

const ASSETS_DIR = findAssetsDir();
if (!ASSETS_DIR) {
  console.error("✗ Não encontrei assets JS do cliente em dist/ ou .output/ após o build.");
  printBuildDiagnostics();
  process.exit(1);
}

const SOURCE_CLIENT_DIR = dirname(ASSETS_DIR);
const entryJsFile = pickEntryJs(ASSETS_DIR);
if (!entryJsFile) {
  console.error("✗ Encontrei a pasta de assets, mas nenhum arquivo JavaScript do cliente.");
  printBuildDiagnostics();
  process.exit(1);
}

if (resolve(SOURCE_CLIENT_DIR) !== resolve(OUT_DIR)) {
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(dirname(OUT_DIR), { recursive: true });
  cpSync(SOURCE_CLIENT_DIR, OUT_DIR, { recursive: true });
}

const normalizedAssetsDir = join(OUT_DIR, relative(SOURCE_CLIENT_DIR, ASSETS_DIR));
const entryJs = slash("/" + relative(OUT_DIR, join(normalizedAssetsDir, relative(ASSETS_DIR, entryJsFile))));
const cssFiles = listFiles(normalizedAssetsDir)
  .filter((file) => file.endsWith(".css"))
  .sort()
  .map((file) => slash("/" + relative(OUT_DIR, file)));

console.log("Assets detectados em:", slash(relative(ROOT, ASSETS_DIR)));
console.log("Pasta final para FTP:", slash(relative(ROOT, OUT_DIR)));
console.log("Entry JS:", entryJs);
if (cssFiles.length) console.log("CSS:", cssFiles.join(", "));

const assetFiles = listFiles(normalizedAssetsDir)
  .filter((file) => /\.(avif|webp|jpe?g|png|svg)$/i.test(file))
  .map((file) => slash("/" + relative(OUT_DIR, file)));

function asset(prefix) {
  const found = assetFiles.find((href) => href.split("/").pop().startsWith(prefix));
  if (!found) {
    console.error(`✗ Asset não encontrado para prefixo: ${prefix}`);
    printBuildDiagnostics();
    process.exit(1);
  }
  return found;
}

const img = {
  hero: asset("hero-workspace-"),
  abstract: asset("card-abstract-"),
  tools: asset("card-tools-"),
  management: asset("card-management-"),
  sales: asset("card-sales-"),
  niches: asset("card-niches-"),
  career: asset("card-career-"),
  tech: asset("card-tech-"),
  fashion: asset("card-fashion-"),
  content: asset("card-content-"),
  trending: asset("trending-planet-"),
  editor: asset("editors-mountain-"),
  author: asset("author-avatar-"),
  catPhoto: asset("cat-photo-"),
  catLifestyle: asset("cat-lifestyle-"),
  catAutumn: asset("cat-autumn-"),
  catCabin: asset("cat-cabin-"),
  newsletter: asset("newsletter-bg-"),
};

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const badgeClass = {
  orange: "bg-[color:var(--badge-orange)]",
  teal: "bg-[color:var(--badge-teal)]",
  pink: "bg-[color:var(--badge-pink)]",
  blue: "bg-[color:var(--badge-blue)]",
  green: "bg-[color:var(--badge-green)]",
  red: "bg-[color:var(--badge-red)]",
};

function badge(article) {
  return `<span class="badge-pill ${badgeClass[article.badgeColor]}">${esc(article.badge)}</span>`;
}

function authorLine(article) {
  return `<div class="flex items-center gap-2 text-[11px] text-muted-foreground"><span class="inline-block h-5 w-5 rounded-full bg-muted"></span><span class="font-medium text-foreground/80">${esc(article.author)}</span><span>·</span><span>${esc(article.date)}</span>${article.readTime ? `<span>·</span><span>${esc(article.readTime)}</span>` : ""}</div>`;
}

function overlay(article, size = "md", extra = "") {
  const h = size === "lg" ? "h-[520px]" : "h-[320px]";
  const title = size === "lg" ? "text-2xl sm:text-3xl" : "text-lg";
  return `<article class="card-hover group relative overflow-hidden rounded-xl ${h} ${extra}"><a href="#" class="absolute inset-0"><img src="${article.image}" alt="${esc(article.title)}" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div><div class="absolute top-4 left-4">${badge(article)}</div><div class="absolute inset-x-0 bottom-0 p-5"><h3 class="font-black text-white leading-tight mb-2 ${title}">${esc(article.title)}</h3>${authorLine(article)}</div></a></article>`;
}

function sectionTitle(title, subtitle, action = "LEIA MAIS") {
  return `<div class="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 mb-6"><div class="min-w-0"><h2 class="text-2xl sm:text-3xl font-black truncate">${esc(title)}</h2><p class="text-xs text-muted-foreground mt-1">${esc(subtitle)}</p></div><a href="#" class="shrink-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink hover:text-teal transition-colors">${esc(action)}<span class="inline-flex h-8 w-8 items-center justify-center rounded-full border border-pink">→</span></a></div>`;
}

const hero = {
  title: "Construindo Sua Marca Pessoal Online no Mundo das Agências",
  badge: "Destaque",
  badgeColor: "teal",
  author: "Ana Ribeiro",
  date: "3 de Junho, 2026",
  image: img.hero,
  excerpt: "Autoridade é a moeda mais valiosa para donos de agência. Veja como posicionar seu nome antes de vender qualquer serviço.",
  readTime: "8 min",
};

const daily = [
  { title: "Gestão de Tempo Eficaz para Donos de Agência", badge: "Operações", badgeColor: "orange", author: "Ana Ribeiro", date: "1 de Jun, 2026", image: img.abstract, readTime: "6 min" },
  { title: "Guia Rápido de Ferramentas de IA para Marketing", badge: "SaaS", badgeColor: "pink", author: "Anna Freitas", date: "2 de Jun, 2026", image: img.tools, readTime: "10 min" },
  { title: "Prospecção Fria: O Roteiro que Fecha Contratos", badge: "Playbook", badgeColor: "orange", author: "Ana Ribeiro", date: "4 de Jun, 2026", image: img.sales, readTime: "7 min" },
  { title: "Nichos Premium: Onde Cobrar 5x Mais", badge: "Estratégia", badgeColor: "teal", author: "Anna Freitas", date: "5 de Jun, 2026", image: img.niches, readTime: "9 min" },
  { title: "Viajando Enquanto Escala: Rotina Remota Enxuta", badge: "Lifestyle", badgeColor: "teal", author: "Anna Freitas", date: "6 de Jun, 2026", image: img.career, readTime: "5 min" },
];

const trending = [
  { title: "Estrutura de Agência do Zero em 90 Dias", badge: "Guia", badgeColor: "teal", author: "Ana Ribeiro", date: "1 de Jun, 2026", image: img.trending, readTime: "12 min" },
  { title: "Construindo um Blog de Autoridade do Zero", badge: "Conteúdo", badgeColor: "pink", author: "Ana Ribeiro", date: "28 de Mai, 2026", image: img.career, readTime: "9 min" },
  { title: "Rotinas de Foco Extremo para Founders Ocupados", badge: "Produtividade", badgeColor: "blue", author: "Anna Freitas", date: "22 de Mai, 2026", image: img.management, readTime: "6 min" },
  { title: "Como Reciclar Leads Frios em Contratos Ativos", badge: "Aquisição", badgeColor: "green", author: "Ana Ribeiro", date: "18 de Mai, 2026", image: img.sales, readTime: "8 min" },
  { title: "Maximizando Produtividade: 5 Estratégias Simples", badge: "Operações", badgeColor: "orange", author: "Anna Freitas", date: "15 de Mai, 2026", image: img.abstract, readTime: "5 min" },
];

const buzz = [
  { title: "Como Montar uma Oferta Irresistível de Social Media", badge: "Oferta", badgeColor: "pink", author: "Ana Ribeiro", date: "12 de Jun, 2026", image: img.content, readTime: "7 min" },
  { title: "Automação Simples para Onboarding de Clientes", badge: "Automação", badgeColor: "blue", author: "Anna Freitas", date: "11 de Jun, 2026", image: img.tools, readTime: "8 min" },
  { title: "O Que Medir na Primeira Reunião de Performance", badge: "Métricas", badgeColor: "green", author: "Kátia Whitaker", date: "10 de Jun, 2026", image: img.tech, readTime: "6 min" },
  { title: "Processos que Salvam sua Margem de Lucro", badge: "Gestão", badgeColor: "orange", author: "Ana Ribeiro", date: "9 de Jun, 2026", image: img.management, readTime: "9 min" },
  { title: "Como Criar um Calendário de Conteúdo Vendável", badge: "Conteúdo", badgeColor: "teal", author: "Anna Freitas", date: "8 de Jun, 2026", image: img.fashion, readTime: "5 min" },
  { title: "Script de Diagnóstico para Fechar Contratos Maiores", badge: "Vendas", badgeColor: "red", author: "Ana Ribeiro", date: "7 de Jun, 2026", image: img.sales, readTime: "10 min" },
  { title: "Nicho Local: Como Dominar uma Cidade Inteira", badge: "Nichos", badgeColor: "teal", author: "Kátia Whitaker", date: "6 de Jun, 2026", image: img.niches, readTime: "8 min" },
  { title: "Checklist Financeiro Antes de Contratar Equipe", badge: "Finanças", badgeColor: "blue", author: "Ana Ribeiro", date: "5 de Jun, 2026", image: img.abstract, readTime: "6 min" },
];

const categories = [
  { name: "Ferramentas", count: 18, image: img.catPhoto },
  { name: "Gestão", count: 24, image: img.catLifestyle },
  { name: "Vendas", count: 16, image: img.catAutumn },
  { name: "Nichos", count: 12, image: img.catCabin },
  { name: "Carreira", count: 15, image: img.career },
  { name: "Conteúdo", count: 21, image: img.content },
];

const STATIC_BODY = `<header class="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl"><div class="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent"></div><div class="container-blog grid h-20 grid-cols-[auto_1fr_auto] items-center gap-6"><a href="/" class="flex items-center gap-2 text-xl font-black tracking-tight"><span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal to-teal-dark text-primary-foreground shadow-[0_8px_24px_-8px_rgba(20,184,166,0.6)]">g</span><span>gaia<span class="text-teal">.creative</span></span></a><nav class="hidden lg:flex items-center justify-center"><ul class="flex items-center gap-1 rounded-full border border-border/60 bg-surface/60 px-2 py-1.5"><li><a href="#ferramentas" class="group relative flex flex-col items-center px-4 py-1.5 rounded-full transition-all hover:bg-teal/10"><span class="text-[12px] font-bold tracking-[0.12em] text-foreground group-hover:text-teal transition-colors">Ferramentas</span><span class="text-[9px] uppercase tracking-wider text-muted-foreground -mt-0.5">SaaS e IA para marketing</span></a></li><li><a href="#gestão" class="group relative flex flex-col items-center px-4 py-1.5 rounded-full transition-all hover:bg-teal/10"><span class="text-[12px] font-bold tracking-[0.12em] text-foreground group-hover:text-teal transition-colors">Gestão</span><span class="text-[9px] uppercase tracking-wider text-muted-foreground -mt-0.5">Operações da agência</span></a></li><li><a href="#vendas" class="group relative flex flex-col items-center px-4 py-1.5 rounded-full transition-all hover:bg-teal/10"><span class="text-[12px] font-bold tracking-[0.12em] text-foreground group-hover:text-teal transition-colors">Vendas</span><span class="text-[9px] uppercase tracking-wider text-muted-foreground -mt-0.5">Aquisição de clientes</span></a></li><li><a href="#nichos" class="group relative flex flex-col items-center px-4 py-1.5 rounded-full transition-all hover:bg-teal/10"><span class="text-[12px] font-bold tracking-[0.12em] text-foreground group-hover:text-teal transition-colors">Nichos</span><span class="text-[9px] uppercase tracking-wider text-muted-foreground -mt-0.5">Especialização de alto valor</span></a></li><li><a href="#carreira" class="group relative flex flex-col items-center px-4 py-1.5 rounded-full transition-all hover:bg-teal/10"><span class="text-[12px] font-bold tracking-[0.12em] text-foreground group-hover:text-teal transition-colors">Carreira</span><span class="text-[9px] uppercase tracking-wider text-muted-foreground -mt-0.5">Educação e mercado</span></a></li></ul></nav><div class="flex items-center justify-end gap-2"><button aria-label="Buscar" class="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-surface/60 hover:border-teal/50 hover:text-teal transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></button><a href="#newsletter" class="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-teal to-teal-dark px-5 py-2.5 text-[12px] font-bold tracking-wider text-primary-foreground uppercase shadow-[0_8px_24px_-8px_rgba(20,184,166,0.7)] hover:brightness-110 transition">Assinar</a></div></div></header><main><section class="relative overflow-hidden"><div class="relative h-[560px]"><img src="${hero.image}" alt="${esc(hero.title)}" width="1600" height="900" class="absolute inset-0 h-full w-full object-cover" /><div class="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40"></div><div class="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent"></div><div class="container-blog relative h-full flex flex-col justify-end pb-16">${badge(hero)}<h1 class="mt-4 max-w-3xl text-3xl sm:text-5xl font-black leading-tight">${esc(hero.title)}</h1><p class="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">${esc(hero.excerpt)}</p><div class="mt-4">${authorLine(hero)}</div></div></div><div class="container-blog -mt-10 relative z-10"><div class="grid grid-cols-2 md:grid-cols-4 gap-3">${daily.slice(0, 4).map((a) => `<a href="#" class="card-hover flex items-center gap-3 bg-card border border-border rounded-xl p-3"><img src="${a.image}" alt="${esc(a.title)}" width="64" height="64" loading="lazy" class="h-16 w-16 rounded-lg object-cover shrink-0" /><div class="min-w-0">${badge(a)}<div class="mt-1 text-xs font-bold line-clamp-2">${esc(a.title)}</div></div></a>`).join("")}</div></div></section><section id="ferramentas" class="container-blog py-20">${sectionTitle("Descobertas do Dia", "Novidades para Aprender")}<div class="grid gap-6 lg:grid-cols-2">${overlay(daily[0], "lg")}${overlay(daily[1], "lg")}</div><div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${daily.slice(2).map((a) => overlay(a)).join("")}</div></section><section id="gestao" class="bg-card/40 py-20 border-y border-border"><div class="container-blog">${sectionTitle("Posts em Alta", "Você leu na semana")}<div class="grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr]">${overlay(trending[0], "lg", "lg:!h-[600px]")}<div class="flex flex-col gap-6">${trending.slice(1, 3).map((a) => overlay(a, "md", "lg:!h-[288px]")).join("")}</div><div class="flex flex-col gap-6">${trending.slice(3, 5).map((a) => overlay(a, "md", "lg:!h-[288px]")).join("")}</div></div></div></section><section id="vendas" class="container-blog py-20">${sectionTitle("Escolha do Editor", "Nossas Melhores Histórias")}<div class="grid gap-6 lg:grid-cols-[1.6fr_1fr]">${overlay({ title: "Explorando Modelos de Precificação em Agências de Alta Performance", badge: "Editor's Pick", badgeColor: "orange", author: "Ana Ribeiro", date: "10 de Jun, 2026", image: img.editor, readTime: "14 min" }, "lg")}<div class="flex flex-col gap-4">${trending.slice(1).map((a) => `<a href="#" class="card-hover group flex items-center gap-4 bg-card border border-border rounded-xl p-3"><img src="${a.image}" alt="${esc(a.title)}" width="120" height="90" loading="lazy" class="h-[90px] w-[120px] rounded-lg object-cover shrink-0" /><div class="min-w-0">${badge(a)}<h3 class="mt-1 text-sm font-bold group-hover:text-teal line-clamp-2">${esc(a.title)}</h3><div class="mt-1 text-[11px] text-muted-foreground">${esc(a.author)} · ${esc(a.date)}</div></div></a>`).join("")}</div></div></section><section id="nichos" class="bg-card/40 py-20 border-y border-border"><div class="container-blog">${sectionTitle("Crônicas do Buzz", "Explore as Últimas Notícias")}<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${buzz.slice(0, 4).map((a) => overlay(a)).join("")}</div><div class="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${buzz.slice(4, 8).map((a) => overlay(a)).join("")}</div></div></section><section id="carreira" class="container-blog py-20">${sectionTitle("Artigos em Destaque", "Pensamentos e Tendências")}<div class="grid gap-6 lg:grid-cols-3">${buzz.slice(0, 3).map((a) => `<article class="card-hover group overflow-hidden rounded-xl bg-card border border-border"><a href="#" class="block"><div class="relative h-[240px] overflow-hidden"><img src="${a.image}" alt="${esc(a.title)}" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div class="absolute top-3 left-3">${badge(a)}</div></div><div class="p-5"><h3 class="text-lg font-bold mb-2 group-hover:text-teal">${esc(a.title)}</h3><p class="text-sm text-muted-foreground mb-3 line-clamp-2">Estratégia prática para donos de agência que querem crescer com margem, posicionamento e previsibilidade.</p>${authorLine(a)}</div></a></article>`).join("")}</div></section><section class="bg-card/40 py-20 border-y border-border"><div class="container-blog">${sectionTitle("Explore Categorias", "Encontre o que Ama", "VER TUDO")}<div class="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">${categories.map((c) => `<a href="#" class="card-hover group relative overflow-hidden rounded-xl h-[180px]"><img src="${c.image}" alt="${esc(c.name)}" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /><div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div><div class="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between gap-2"><div class="min-w-0"><div class="font-bold text-sm truncate">${esc(c.name)}</div><div class="text-[11px] text-muted-foreground">${c.count} artigos</div></div><span class="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/40 group-hover:bg-pink group-hover:border-pink">→</span></div></a>`).join("")}</div></div></section><section class="relative overflow-hidden" style="background-image:linear-gradient(rgba(15,15,15,0.75),rgba(15,15,15,0.85)),url(${img.newsletter});background-size:cover;background-position:center"><div class="container-blog py-20 text-center"><h2 class="text-3xl sm:text-4xl font-black mb-2">Fique por Dentro da Nossa Newsletter</h2><p class="text-sm text-muted-foreground mb-8">Receba as melhores estratégias para donos de agência direto no seu email.</p><form class="max-w-xl mx-auto flex flex-col sm:flex-row gap-3"><input type="email" required placeholder="Seu melhor email" aria-label="Email" class="flex-1 h-12 px-4 rounded-md bg-card border border-border-strong text-sm placeholder:text-muted-foreground focus:outline-none focus:border-teal" /><button type="submit" class="h-12 px-8 rounded-md bg-pink hover:bg-pink-dark text-white text-sm font-bold tracking-wider transition-colors">INSCREVER</button></form><label class="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" class="accent-pink" checked />Concordo com os termos e condições.</label></div></section></main><footer class="border-t border-border pt-16 pb-8"><div class="container-blog grid gap-10 md:grid-cols-2 lg:grid-cols-4"><div><img src="${img.author}" alt="Ana Ribeiro" width="80" height="80" class="h-20 w-20 rounded-full object-cover mb-4" /><h4 class="font-bold mb-2">Ana Ribeiro</h4><p class="text-sm text-muted-foreground mb-4">Consultora de agências de marketing. Ajuda founders a escalar de 0 a 7 dígitos com operação enxuta e vendas consistentes.</p></div><div><h4 class="font-bold mb-4">Categorias em Alta</h4><ul class="space-y-3">${categories.slice(0, 5).map((c) => `<li class="flex items-center gap-3"><img src="${c.image}" alt="${esc(c.name)}" width="48" height="48" loading="lazy" class="h-12 w-12 rounded-md object-cover" /><div><a href="#" class="text-sm font-medium hover:text-teal">${esc(c.name)}</a><div class="text-xs text-muted-foreground">${c.count} artigos</div></div></li>`).join("")}</ul></div><div><h4 class="font-bold mb-4">Últimos Posts</h4><ul class="space-y-3">${buzz.slice(0, 5).map((a) => `<li class="flex items-center gap-3"><img src="${a.image}" alt="${esc(a.title)}" width="48" height="48" loading="lazy" class="h-12 w-12 rounded-md object-cover" /><div class="min-w-0"><a href="#" class="text-sm font-medium hover:text-teal line-clamp-2">${esc(a.title)}</a><div class="text-xs text-muted-foreground">${esc(a.date)}</div></div></li>`).join("")}</ul></div><div><h4 class="font-bold mb-4">Mapa do Site</h4><ul class="grid grid-cols-2 gap-2 text-sm text-muted-foreground">${["Sobre", "Time", "Autores", "Loja", "Minha Conta", "Pedidos", "Favoritos", "Salvos", "FAQ", "Contato", "Termos"].map((l) => `<li><a href="#" class="hover:text-teal">${l}</a></li>`).join("")}</ul></div></div><div class="container-blog mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"><p class="text-xs text-muted-foreground">© 2026 Gaia Creative. Todos os direitos reservados.</p></div></footer>`;

const INDEX_HTML = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Gaia Creative — Blog para Donos de Agência de Marketing</title>
    <meta name="description" content="Estratégias, ferramentas e táticas em português para quem quer abrir e escalar uma agência de marketing lucrativa." />
    <meta property="og:site_name" content="Gaia Creative" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Gaia Creative — Blog para Donos de Agência de Marketing" />
    <meta property="og:description" content="Estratégias, ferramentas e táticas em português para quem quer abrir e escalar uma agência de marketing lucrativa." />
    <meta property="og:url" content="${SITE_URL}/" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="canonical" href="${SITE_URL}/" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap" />
${cssFiles.map((href) => `    <link rel="stylesheet" href="${href}" />`).join("\n")}
    <link rel="modulepreload" href="${entryJs}" />
  </head>
  <body>
    ${STATIC_BODY}
  </body>
</html>
`;

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
</urlset>
`;

const ROBOTS = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

const HTACCESS = `# Fallback SPA + compressão + cache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>
`;

function writeOut(relPath, content) {
  const full = join(OUT_DIR, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  const size = typeof content === "string" ? Buffer.byteLength(content) : content.length;
  console.log("→", relPath, `(${size} bytes)`);
}

// Copiar public/ (favicon, robots.txt do usuário etc) se ainda não estiver em dist/client
const PUBLIC_DIR = join(ROOT, "public");
if (existsSync(PUBLIC_DIR)) {
  for (const name of readdirSync(PUBLIC_DIR)) {
    const src = join(PUBLIC_DIR, name);
    const dst = join(OUT_DIR, name);
    if (statSync(src).isFile() && !existsSync(dst)) {
      copyFileSync(src, dst);
      console.log("→", name, "(copiado de public/)");
    }
  }
}

writeOut("index.html", INDEX_HTML);
writeOut("404.html", INDEX_HTML);
writeOut("sitemap.xml", SITEMAP);
writeOut("robots.txt", ROBOTS);
writeOut(".htaccess", HTACCESS);

console.log("✓ Export concluído em", OUT_DIR);
