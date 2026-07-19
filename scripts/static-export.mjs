// Exportador estático para hospedagem em Hostinger (Apache).
// O build do TanStack Start gera:
//   dist/client/  → assets do navegador (JS/CSS/imagens hasheados)
//   dist/server/  → bundle Cloudflare Workers (NÃO roda em Node)
// Como o alvo é hospedagem estática, geramos um index.html SPA que carrega
// o bundle do cliente. O TanStack Router hidrata e roteia no navegador.
// Também emitimos sitemap.xml, robots.txt e .htaccess com fallback SPA.
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync, statSync, copyFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const OUT_DIR = join(ROOT, "dist", "client");
const ASSETS_DIR = join(OUT_DIR, "assets");

if (!existsSync(ASSETS_DIR)) {
  console.error("✗ dist/client/assets não existe — rode `npm run build` antes.");
  process.exit(1);
}

const files = readdirSync(ASSETS_DIR);
const entryJs = files.find((f) => /^index-.*\.js$/.test(f));
const entryCss = files.find((f) => /\.css$/.test(f));
if (!entryJs) {
  console.error("✗ Não encontrei o entry JS (index-*.js) em dist/client/assets.");
  process.exit(1);
}
console.log("Entry JS:", entryJs);
if (entryCss) console.log("Entry CSS:", entryCss);

const SITE_URL = "https://gaiacreative.com.br";

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
${entryCss ? `    <link rel="stylesheet" href="/assets/${entryCss}" />\n` : ""}    <link rel="modulepreload" href="/assets/${entryJs}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${entryJs}"></script>
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
writeOut("sitemap.xml", SITEMAP);
// Só sobrescreve robots se ninguém copiou de public/
if (!existsSync(join(OUT_DIR, "robots.txt"))) writeOut("robots.txt", ROBOTS);
writeOut(".htaccess", HTACCESS);

console.log("✓ Export concluído em", OUT_DIR);
