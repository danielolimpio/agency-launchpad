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
    <script type="module" src="${entryJs}"></script>
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
