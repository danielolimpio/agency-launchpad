import { badgeClass, type Article, type BadgeColor } from "@/lib/blog-data";
import { ArrowRight, Clock } from "lucide-react";

export function Badge({ color, children }: { color: BadgeColor; children: React.ReactNode }) {
  return <span className={`badge-pill ${badgeClass[color]}`}>{children}</span>;
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 mb-6">
      <div className="min-w-0">
        <h2 className="text-2xl sm:text-3xl font-black truncate">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action && (
        <a
          href="#"
          className="shrink-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink hover:text-teal transition-colors"
        >
          {action}
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-pink">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </a>
      )}
    </div>
  );
}

export function AuthorLine({ author, date, readTime }: { author: string; date: string; readTime?: string }) {
  return (
    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
      <span className="inline-block h-5 w-5 rounded-full bg-muted" />
      <span className="font-medium text-foreground/80">{author}</span>
      <span>·</span>
      <span>{date}</span>
      {readTime && (
        <>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {readTime}
          </span>
        </>
      )}
    </div>
  );
}

export function ArticleCard({ article, size = "md" }: { article: Article; size?: "sm" | "md" | "lg" }) {
  const heights =
    size === "lg" ? "h-[400px]" : size === "sm" ? "h-[180px]" : "h-[240px]";
  return (
    <article className="card-hover group overflow-hidden rounded-xl bg-card border border-border">
      <a href="#" className="block relative">
        <div className={`relative ${heights} overflow-hidden`}>
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge color={article.badgeColor}>{article.badge}</Badge>
          </div>
        </div>
        <div className="p-4">
          <h3
            className={`font-bold leading-snug mb-2 group-hover:text-teal transition-colors ${
              size === "lg" ? "text-2xl" : "text-base"
            }`}
          >
            {article.title}
          </h3>
          <AuthorLine author={article.author} date={article.date} readTime={article.readTime} />
        </div>
      </a>
    </article>
  );
}

export function OverlayCard({ article, size = "md" }: { article: Article; size?: "md" | "lg" }) {
  const h = size === "lg" ? "h-[520px]" : "h-[320px]";
  return (
    <article className={`card-hover group relative overflow-hidden rounded-xl ${h}`}>
      <a href="#" className="absolute inset-0">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <Badge color={article.badgeColor}>{article.badge}</Badge>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3
            className={`font-black text-white leading-tight mb-2 ${
              size === "lg" ? "text-2xl sm:text-3xl" : "text-lg"
            }`}
          >
            {article.title}
          </h3>
          <AuthorLine author={article.author} date={article.date} readTime={article.readTime} />
        </div>
      </a>
    </article>
  );
}
