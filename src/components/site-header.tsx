import { Link } from "@tanstack/react-router";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { menu } from "@/lib/blog-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
      <div className="container-blog grid h-20 grid-cols-[auto_1fr_auto] items-center gap-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal to-teal-dark text-primary-foreground shadow-[0_8px_24px_-8px_rgba(20,184,166,0.6)]">
            g
          </span>
          <span>
            gaia<span className="text-teal">.creative</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center justify-center">
          <ul className="flex items-center gap-1 rounded-full border border-border/60 bg-surface/60 px-2 py-1.5 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]">
            {menu.map((m) => (
              <li key={m.title}>
                <a
                  href={`#${m.title.toLowerCase()}`}
                  className="group relative flex flex-col items-center px-4 py-1.5 rounded-full transition-all hover:bg-teal/10"
                >
                  <span className="text-[12px] font-bold tracking-[0.12em] text-foreground group-hover:text-teal transition-colors">
                    {m.title}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground -mt-0.5">
                    {m.subtitle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <button
            aria-label="Buscar"
            className="grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-surface/60 hover:border-teal/50 hover:text-teal transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
          <a
            href="#newsletter"
            className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-teal to-teal-dark px-5 py-2.5 text-[12px] font-bold tracking-wider text-primary-foreground uppercase shadow-[0_8px_24px_-8px_rgba(20,184,166,0.7)] hover:brightness-110 transition"
          >
            Assinar
          </a>
          <button
            aria-label="Menu"
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-surface/60"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-blog py-4 flex flex-col gap-1">
            {menu.map((m) => (
              <a
                key={m.title}
                href={`#${m.title.toLowerCase()}`}
                className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                <span className="text-sm font-bold tracking-wider">{m.title}</span>
                <span className="text-xs text-muted-foreground">{m.subtitle}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
