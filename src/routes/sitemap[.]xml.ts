import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { articles } from "@/lib/articles";

const BASE_URL = "https://gaiacreative.com.br";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = [
          { loc: `${BASE_URL}/`, priority: "1.0", changefreq: "weekly" },
          { loc: `${BASE_URL}/artigos`, priority: "0.9", changefreq: "weekly" },
          ...articles.map((a) => ({
            loc: `${BASE_URL}/artigos/${a.slug}`,
            priority: "0.8",
            changefreq: "monthly",
            lastmod: a.dateISO,
          })),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc>${"lastmod" in u ? `<lastmod>${u.lastmod}</lastmod>` : ""}<changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
