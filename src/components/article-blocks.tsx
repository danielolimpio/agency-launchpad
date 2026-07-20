import type { ArticleBlock } from "@/lib/articles";
import { Lightbulb, AlertTriangle, Sparkles, Check, ArrowRight, Quote as QuoteIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

const calloutStyles = {
  tip: {
    icon: Lightbulb,
    ring: "border-l-4 border-teal",
    bg: "bg-teal/5",
    iconBg: "bg-teal/15 text-teal",
    label: "DICA",
  },
  warning: {
    icon: AlertTriangle,
    ring: "border-l-4 border-[color:var(--badge-orange)]",
    bg: "bg-[color:var(--badge-orange)]/5",
    iconBg: "bg-[color:var(--badge-orange)]/15 text-[color:var(--badge-orange)]",
    label: "ATENÇÃO",
  },
  insight: {
    icon: Sparkles,
    ring: "border-l-4 border-pink",
    bg: "bg-pink/5",
    iconBg: "bg-pink/15 text-pink",
    label: "INSIGHT",
  },
} as const;

export function BlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p
          className="text-[17px] leading-[1.85] text-foreground/85 mb-6"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );

    case "h2":
      return (
        <h2
          id={block.id}
          className="scroll-mt-24 mt-14 mb-5 text-2xl sm:text-3xl font-black tracking-tight relative pl-4 border-l-4 border-teal"
        >
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 id={block.id} className="scroll-mt-24 mt-10 mb-4 text-xl sm:text-2xl font-bold">
          {block.text}
        </h3>
      );

    case "quote":
      return (
        <figure className="my-10 rounded-2xl border border-border bg-card/60 p-6 sm:p-8 relative overflow-hidden">
          <QuoteIcon className="absolute top-4 right-4 h-16 w-16 text-teal/10" />
          <blockquote className="text-lg sm:text-xl font-medium leading-relaxed text-foreground italic">
            “{block.text}”
          </blockquote>
          {block.cite && (
            <figcaption className="mt-4 text-sm text-muted-foreground font-medium">— {block.cite}</figcaption>
          )}
        </figure>
      );

    case "callout": {
      const cfg = calloutStyles[block.variant];
      const Icon = cfg.icon;
      return (
        <aside className={`my-8 rounded-xl ${cfg.ring} ${cfg.bg} p-5 sm:p-6 flex gap-4`}>
          <div className={`shrink-0 h-10 w-10 rounded-lg ${cfg.iconBg} flex items-center justify-center`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold tracking-widest text-muted-foreground mb-1">
              {cfg.label}
            </div>
            <div className="font-bold text-base mb-1">{block.title}</div>
            <p className="text-sm leading-relaxed text-foreground/80">{block.body}</p>
          </div>
        </aside>
      );
    }

    case "list":
      return block.ordered ? (
        <ol className="my-6 space-y-3 pl-5 list-decimal marker:text-teal marker:font-bold">
          {block.items.map((it, i) => (
            <li key={i} className="text-[16px] leading-relaxed text-foreground/85 pl-2">
              {it}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="my-6 space-y-3">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-foreground/85">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-pink shrink-0" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );

    case "checklist":
      return (
        <ul className="my-8 grid gap-3 sm:grid-cols-2">
          {block.items.map((it, i) => (
            <li
              key={i}
              className="flex gap-3 items-start rounded-xl border border-border bg-card/50 p-4"
            >
              <span className="shrink-0 h-6 w-6 rounded-md bg-teal/15 text-teal flex items-center justify-center">
                <Check className="h-4 w-4" />
              </span>
              <span className="text-sm leading-relaxed">{it}</span>
            </li>
          ))}
        </ul>
      );

    case "stats":
      return (
        <div className="my-10 grid gap-3 grid-cols-2 lg:grid-cols-4">
          {block.items.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-gradient-to-br from-card to-background p-5"
            >
              <div className="text-2xl sm:text-3xl font-black text-teal leading-none">{s.value}</div>
              <div className="mt-2 text-xs text-muted-foreground leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      );

    case "steps":
      return (
        <ol className="my-8 space-y-4">
          {block.items.map((s, i) => (
            <li
              key={i}
              className="relative rounded-xl border border-border bg-card/50 p-5 pl-16"
            >
              <span className="absolute left-4 top-5 h-9 w-9 rounded-full bg-pink text-white font-black text-sm flex items-center justify-center">
                {i + 1}
              </span>
              <div className="font-bold mb-1">{s.title}</div>
              <p className="text-sm leading-relaxed text-foreground/80">{s.body}</p>
            </li>
          ))}
        </ol>
      );

    case "divider":
      return <hr className="my-10 border-border" />;

    case "cta":
      return (
        <div className="my-10 rounded-2xl border border-teal/40 bg-gradient-to-br from-teal/10 via-card to-pink/5 p-6 sm:p-8">
          <div className="text-[11px] font-bold tracking-widest text-teal mb-2">PRÓXIMA LEITURA</div>
          <h4 className="text-xl sm:text-2xl font-black mb-2">{block.title}</h4>
          <p className="text-sm text-foreground/80 mb-4 leading-relaxed">{block.body}</p>
          <Link
            to={block.href as never}
            className="inline-flex items-center gap-2 rounded-full bg-pink hover:bg-pink-dark transition-colors px-5 py-2.5 text-sm font-bold text-white"
          >
            {block.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      );
  }
}
