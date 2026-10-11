import { ArrowRight, MapPin, PackageCheck, Truck } from "lucide-react";
import { useGetBusinessInfo } from "../hooks/useQueries";

const HERO_IMAGE =
  "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600";

const HERO_SPECS = [
  { icon: PackageCheck, label: "Material certificado" },
  { icon: Truck, label: "Entrega em 24h" },
];

export default function Hero() {
  const { data: info } = useGetBusinessInfo();

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border bg-background"
    >
      <div className="surface-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="container relative grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="animate-fade-up">
          <p className="spec-label mb-5 inline-flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-1.5 text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-rivet-pulse" />
            {info?.tagline ?? "Construir Angola, com qualidade e resistência."}
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl">
            Construir Angola, com qualidade e resistência.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Postes de iluminação pública, chapas caneladas, varões e perfis
            metálicos. Material certificado, com entrega rápida em Luanda e em
            todo o país.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#book"
              data-ocid="hero.primary_button"
              className="group inline-flex items-center gap-2 rounded-sm bg-accent px-7 py-3.5 font-semibold text-accent-foreground transition-smooth hover:bg-accent/90"
            >
              Faça a sua cotação
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#catalogue"
              data-ocid="hero.secondary_button"
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-7 py-3.5 font-semibold text-foreground transition-smooth hover:border-primary hover:text-primary"
            >
              Ver catálogo
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            {HERO_SPECS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </span>
            ))}
            {info && (
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {info.address}
              </span>
            )}
          </div>
        </div>

        <div className="relative animate-fade-up">
          <img
            src={HERO_IMAGE}
            alt="Estruturas metálicas e material de construção em stock"
            className="aspect-[4/3] w-full rounded-lg border border-border object-cover shadow-elevated"
          />
          <div className="absolute -bottom-5 left-6 rounded-sm border border-border bg-card px-5 py-3 shadow-elevated">
            <span className="spec-label text-muted-foreground">
              Stock permanente
            </span>
            <p className="mt-0.5 font-display text-sm font-bold text-foreground">
              Luanda · todo o país
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
