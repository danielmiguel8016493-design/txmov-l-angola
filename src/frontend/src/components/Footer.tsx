import { Mail, MapPin, Phone } from "lucide-react";
import { useGetBusinessInfo } from "../hooks/useQueries";

const FOOTER_LINKS = [
  { href: "#top", label: "Início" },
  { href: "#about", label: "Quem Somos" },
  { href: "#catalogue", label: "Catálogo" },
  { href: "#advantages", label: "Vantagens" },
  { href: "#book", label: "Contacto" },
];

export default function Footer() {
  const { data: info } = useGetBusinessInfo();

  return (
    <footer data-ocid="footer" className="bg-foreground text-background">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-accent font-mono text-sm font-bold text-accent-foreground">
              TX
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              TXMOVÉL
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-background/70">
            {info?.name ??
              "TXMOVÉL ANGOLA — Comércio e Prestação de Serviços, SU Lda"}
          </p>
        </div>

        <div>
          <h3 className="spec-label text-background/50">Contacto</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-accent" />
              <a
                href={`tel:${info?.phone ?? ""}`}
                className="transition-colors hover:text-accent"
              >
                {info?.phone ?? "—"}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-accent" />
              <a
                href={`mailto:${info?.email ?? ""}`}
                className="transition-colors hover:text-accent"
              >
                {info?.email ?? "—"}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="spec-label text-background/50">Localização</h3>
          <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-background/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            {info?.address ?? "Luanda, Angola"}
          </p>
        </div>

        <div>
          <h3 className="spec-label text-background/50">Navegação</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-background/80 transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container flex flex-col items-center gap-2 py-5 text-center text-xs text-background/60 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} TXMOVÉL ANGOLA — Comércio e Prestação
            de Serviços, SU Lda
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            © {new Date().getFullYear()}. Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
