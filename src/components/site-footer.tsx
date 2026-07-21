import { images, categories, buzz } from "@/lib/blog-data";
import { Facebook, Twitter, Instagram, Linkedin, Dribbble } from "lucide-react";
import newsletterBg from "@/assets/newsletter-bg.jpg";

export function Newsletter() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(15,15,15,0.75), rgba(15,15,15,0.85)), url(${newsletterBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-blog py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-black mb-2">Fique por Dentro da Nossa Newsletter</h2>
        <p className="text-sm text-muted-foreground mb-8">
          Receba as melhores estratégias para donos de agência direto no seu email.
        </p>
        <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="Seu melhor email"
            aria-label="Email"
            className="flex-1 h-12 px-4 rounded-md bg-card border border-border-strong text-sm placeholder:text-muted-foreground focus:outline-none focus:border-teal"
          />
          <button
            type="submit"
            className="h-12 px-8 rounded-md bg-pink hover:bg-pink-dark text-white text-sm font-bold tracking-wider transition-colors"
          >
            INSCREVER
          </button>
        </form>
        <label className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <input type="checkbox" className="accent-pink" defaultChecked />
          Concordo com os termos e condições.
        </label>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border pt-16 pb-8">
      <div className="container-blog grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={images.authorAvatar}
            alt="Ana Ribeiro"
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover mb-4"
          />
          <h4 className="font-bold mb-2">Ana Ribeiro</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Consultora de agências de marketing. Ajuda founders a escalar de 0 a 7 dígitos com
            operação enxuta e vendas consistentes.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Facebook, name: "Facebook" },
              { Icon: Dribbble, name: "Dribbble" },
              { Icon: Twitter, name: "Twitter" },
              { Icon: Instagram, name: "Instagram" },
              { Icon: Linkedin, name: "LinkedIn" },
            ].map(({ Icon, name }) => (
              <a
                key={name}
                href="#"
                aria-label={`Siga Ana Ribeiro no ${name}`}
                className="p-2 rounded-full border border-border-strong hover:border-teal hover:text-teal transition-colors"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4">Categorias em Alta</h4>
          <ul className="space-y-3">
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug} className="flex items-center gap-3">
                <img
                  src={c.image}
                  alt={c.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div>
                  <a href="#" className="text-sm font-medium hover:text-teal">
                    {c.name}
                  </a>
                  <div className="text-xs text-muted-foreground">{c.count} artigos</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Últimos Posts</h4>
          <ul className="space-y-3">
            {buzz.slice(0, 5).map((a) => (
              <li key={a.title} className="flex items-center gap-3">
                <img
                  src={a.image}
                  alt={a.title}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <a href="#" className="text-sm font-medium hover:text-teal line-clamp-2">
                    {a.title}
                  </a>
                  <div className="text-xs text-muted-foreground">{a.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Mapa do Site</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {[
              "Sobre",
              "Time",
              "Autores",
              "Loja",
              "Minha Conta",
              "Pedidos",
              "Favoritos",
              "Salvos",
              "FAQ",
              "Contato",
              "Termos",
            ].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-teal">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-blog mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © 2026 Gaia Creative. Todos os direitos reservados.
        </p>
        <div className="flex gap-3">
          {[Facebook, Dribbble, Twitter, Instagram, Linkedin].map((I, i) => (
            <a
              key={i}
              href="#"
              aria-label="Rede social"
              className="p-2 rounded-full hover:text-teal transition-colors"
            >
              <I className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
