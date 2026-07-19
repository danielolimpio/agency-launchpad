// Exportador estático para hospedagem em Hostinger (Apache).
// Detecta automaticamente o bundle do servidor gerado pelo build
// (.mjs ou .js em dist/server ou .output/server), executa o handler
// para as rotas públicas e grava index.html, sitemap.xml, robots.txt
// e .htaccess dentro de dist/client.
import { existsSync, mkdirSync, writeFileSync, readFileSync, statSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(process.cwd());
const OUT_DIR = join(ROOT, "dist", "client");

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

function findServerEntry() {
  const candidates = [
    "dist/server/server.mjs",
    "dist/server/server.js",
    "dist/server/index.mjs",
    "dist/server/index.js",
    ".output/server/index.mjs",
    ".output/server/index.js",
  ];
  for (const rel of candidates) {
    const p = join(ROOT, rel);
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  // fallback: procurar qualquer .mjs/.js em dist/server ou .output/server
  for (const base of ["dist/server", ".output/server"]) {
    const dir = join(ROOT, base);
    if (!existsSync(dir)) continue;
    const files = readdirSync(dir).filter((f) => f.endsWith(".mjs") || f.endsWith(".js"));
    if (files.length) return join(dir, files[0]);
  }
  return null;
}

async function renderRoute(handler, path) {
  const req = new Request(`http://localhost${path}`, { method: "GET" });
  const res = await handler.fetch(req, {}, {});
  const body = await res.text();
  return { status: res.status, body, contentType: res.headers.get("content-type") || "" };
}

function writeOut(relPath, content) {
  const full = join(OUT_DIR, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  console.log("→", relPath, `(${Buffer.byteLength(content)} bytes)`);
}

const HTACCESS = `# Fallback SPA + compressão
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
  ExpiresByType text/html "access plus 1 hour"
</IfModule>
`;

const ROBOTS = `User-agent: *
Allow: /

Sitemap: https://gaiacreative.com.br/sitemap.xml
`;

async function main() {
  const entry = findServerEntry();
  if (!entry) {
    console.warn("⚠ Servidor não encontrado, gerando somente arquivos estáticos auxiliares.");
    writeOut("robots.txt", ROBOTS);
    writeOut(".htaccess", HTACCESS);
    return;
  }
  console.log("Usando server entry:", entry);

  const mod = await import(pathToFileURL(entry).href);
  const handler = mod.default ?? mod;
  if (!handler?.fetch) throw new Error("Server entry não expõe .fetch()");

  // Home
  const home = await renderRoute(handler, "/");
  if (home.status >= 400) throw new Error(`Falha ao renderizar /: HTTP ${home.status}`);
  writeOut("index.html", home.body);

  // Sitemap
  try {
    const sm = await renderRoute(handler, "/sitemap.xml");
    if (sm.status < 400 && sm.body.trim().startsWith("<")) {
      writeOut("sitemap.xml", sm.body);
    }
  } catch (e) {
    console.warn("sitemap.xml não gerado:", e.message);
  }

  // robots.txt: prioriza public/robots.txt se existir, senão gera o padrão.
  const publicRobots = join(ROOT, "public", "robots.txt");
  if (existsSync(publicRobots) && !existsSync(join(OUT_DIR, "robots.txt"))) {
    writeOut("robots.txt", readFileSync(publicRobots));
  } else if (!existsSync(join(OUT_DIR, "robots.txt"))) {
    writeOut("robots.txt", ROBOTS);
  }

  writeOut(".htaccess", HTACCESS);
  console.log("✓ Export concluído em", OUT_DIR);
}

main().catch((err) => {
  console.error("✗ Export falhou:", err);
  process.exit(1);
});
