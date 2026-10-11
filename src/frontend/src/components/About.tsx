import { BadgeCheck, MapPin, Truck, Warehouse } from "lucide-react";
import { useGetBusinessInfo } from "../hooks/useQueries";

const PILLARS = [
  {
    icon: BadgeCheck,
    title: "Resistência e durabilidade",
    body: "Material selecionado para aguentar o trabalho e o tempo, ao melhor preço do mercado.",
  },
  {
    icon: Warehouse,
    title: "Stock permanente",
    body: "Armazém em Luanda sempre abastecido, para responder no momento em que a obra precisa.",
  },
  {
    icon: Truck,
    title: "Entrega com viatura própria",
    body: "Levamos o material à sua obra com frota própria, em Luanda e em todo o país.",
  },
];

export default function About() {
  const { data: info } = useGetBusinessInfo();

  return (
    <section
      id="about"
      className="border-b border-border bg-background py-20 md:py-28"
    >
      <div className="container grid gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="spec-label text-muted-foreground">Quem Somos</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {info?.name ??
              "TXMOVÉL ANGOLA — Comércio e Prestação de Serviços, SU Lda"}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Somos uma empresa angolana de comércio de materiais de construção,
            focada em resistência, durabilidade e no melhor preço do mercado.
            Trabalhamos com stock permanente em Luanda e entrega com viatura
            própria, para que cada obra avance sem esperas.
          </p>
          <p className="mt-6 flex items-start gap-3 rounded-sm border-l-2 border-accent bg-card px-5 py-4 font-display text-lg font-bold text-foreground">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />A sua obra
            nunca para por falta de material.
          </p>
        </div>

        <ul className="grid gap-4 self-start">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="flex gap-4 rounded-lg border border-border bg-card p-6 shadow-subtle transition-smooth hover:shadow-elevated"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-foreground">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
