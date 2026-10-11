import { ArrowRight, Package } from "lucide-react";
import { useGetCatalogueNote, useGetServices } from "../hooks/useQueries";

export default function Services() {
  const { data: services = [] } = useGetServices();
  const { data: catalogueNote } = useGetCatalogueNote();

  return (
    <section
      id="catalogue"
      className="border-b border-border bg-muted/40 py-20 md:py-28"
    >
      <div className="container">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="spec-label text-muted-foreground">Catálogo</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Os nossos produtos
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Material certificado para estruturas, iluminação pública e
              acabamentos — disponível para entrega imediata.
            </p>
          </div>
          <p
            data-ocid="catalogue.note"
            className="spec-label inline-flex shrink-0 items-center gap-2 self-start rounded-sm border border-accent/40 bg-accent/15 px-4 py-2.5 text-accent-foreground md:self-auto"
          >
            <Package className="h-4 w-4" />
            {catalogueNote?.note ?? "Vendemos a grosso e a retalho."}
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li
              key={service.id.toString()}
              data-ocid={`catalogue.card.${index + 1}`}
              className="group flex flex-col rounded-lg border border-border bg-card p-6 shadow-subtle transition-smooth hover:border-primary hover:shadow-elevated"
            >
              <span className="spec-label text-muted-foreground">
                {String(index + 1).padStart(2, "0")} · Produto
              </span>
              <h3 className="mt-3 font-display text-xl font-bold text-foreground">
                {service.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="spec-label text-muted-foreground">
                  {service.duration}
                </span>
                <a
                  href="#book"
                  data-ocid={`catalogue.quote_link.${index + 1}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  Cotar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
