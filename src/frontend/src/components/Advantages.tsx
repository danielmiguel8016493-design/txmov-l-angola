import { BadgeCheck, Tag, Truck } from "lucide-react";

const ADVANTAGES = [
  {
    icon: BadgeCheck,
    title: "Qualidade Garantida",
    body: "Material certificado e resistente, escolhido para durar em cada obra.",
  },
  {
    icon: Truck,
    title: "Entrega Rápida",
    body: "Na sua obra em Luanda em 24h, com viatura própria e stock permanente.",
  },
  {
    icon: Tag,
    title: "Melhor Preço",
    body: "Preço de fábrica, com desconto para grandes quantidades.",
  },
];

export default function Advantages() {
  return (
    <section
      id="advantages"
      className="border-b border-border bg-background py-20 md:py-28"
    >
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <span className="spec-label text-muted-foreground">Vantagens</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Porquê a TXMOVÉL
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Três razões para confiar o abastecimento da sua obra a nós.
          </p>
        </div>

        <ul className="grid gap-5 md:grid-cols-3">
          {ADVANTAGES.map(({ icon: Icon, title, body }, index) => (
            <li
              key={title}
              data-ocid={`advantages.card.${index + 1}`}
              className="rounded-lg border border-border bg-card p-7 shadow-subtle transition-smooth hover:border-primary hover:shadow-elevated"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
