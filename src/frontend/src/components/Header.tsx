import { LogIn, Menu, PanelTop, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#top", label: "Início" },
  { href: "#about", label: "Quem Somos" },
  { href: "#catalogue", label: "Catálogo" },
  { href: "#advantages", label: "Vantagens" },
  { href: "#book", label: "Contacto" },
];

const RAZAO_SOCIAL =
  "TXMOVÉL ANGOLA - COMÉRCIO E PRESTAÇÃO DE SERVIÇOS, SU LDA";

export default function Header({
  showDashboard,
  onToggleDashboard,
  onSignIn,
  isAuthenticated,
}: {
  showDashboard: boolean;
  onToggleDashboard: () => void;
  onSignIn: () => void;
  isAuthenticated: boolean;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      data-ocid="header"
      className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur"
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-primary font-mono text-sm font-bold text-primary-foreground">
            TX
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-display text-xs font-bold tracking-tight text-foreground sm:text-base md:text-lg">
              {RAZAO_SOCIAL}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {!isAuthenticated && (
            <button
              type="button"
              data-ocid="signin.open_button"
              onClick={onSignIn}
              className="hidden items-center gap-2 rounded-sm bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:flex"
            >
              <LogIn className="h-4 w-4" />
              Entrar
            </button>
          )}
          <button
            type="button"
            data-ocid="dashboard.toggle"
            onClick={onToggleDashboard}
            aria-pressed={showDashboard}
            className="hidden items-center gap-2 rounded-sm border border-border px-3.5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:flex"
          >
            <PanelTop className="h-4 w-4" />
            {showDashboard ? "Ver site" : "Painel"}
          </button>
          <button
            type="button"
            data-ocid="nav.mobile_toggle"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-card md:hidden">
          <div className="container flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-border/60 py-3 text-sm font-medium text-foreground last:border-b-0"
              >
                {link.label}
              </a>
            ))}
            {!isAuthenticated && (
              <button
                type="button"
                data-ocid="signin.open_button_mobile"
                onClick={() => {
                  setMobileOpen(false);
                  onSignIn();
                }}
                className="flex items-center gap-2 py-3 text-sm font-semibold text-primary"
              >
                <LogIn className="h-4 w-4" />
                Entrar
              </button>
            )}
            <button
              type="button"
              data-ocid="dashboard.toggle_mobile"
              onClick={() => {
                setMobileOpen(false);
                onToggleDashboard();
              }}
              className="flex items-center gap-2 py-3 text-sm font-semibold text-primary"
            >
              <PanelTop className="h-4 w-4" />
              {showDashboard ? "Ver site" : "Painel do proprietário"}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
