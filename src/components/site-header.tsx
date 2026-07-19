import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { menu } from "@/lib/blog-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-blog flex h-16 items-center justify-between gap-6">
        <Link to="/" className="text-lg font-black tracking-tight">
          gaia<span className="text-teal">.creative</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {menu.map((m) => (
            <a
              key={m.title}
              href={`#${m.title.toLowerCase()}`}
              className="group flex flex-col px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              <span className="text-[13px] font-bold tracking-wider text-foreground group-hover:text-teal">
                {m.title}
              </span>
              <span className="text-[10px] text-muted-foreground -mt-0.5">{m.subtitle}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button aria-label="Buscar" className="p-2 rounded-full hover:bg-muted transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <button aria-label="Conta" className="p-2 rounded-full hover:bg-muted transition-colors hidden sm:block">
            <User className="h-4 w-4" />
          </button>
          <button aria-label="Salvos" className="p-2 rounded-full hover:bg-muted transition-colors hidden sm:block">
            <ShoppingBag className="h-4 w-4" />
          </button>
          <button
            aria-label="Menu"
            className="lg:hidden p-2 rounded-full hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-blog py-4 flex flex-col gap-2">
            {menu.map((m) => (
              <a
                key={m.title}
                href={`#${m.title.toLowerCase()}`}
                className="flex flex-col px-3 py-2 rounded-md hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <span className="text-sm font-bold">{m.title}</span>
                <span className="text-xs text-muted-foreground">{m.subtitle}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
