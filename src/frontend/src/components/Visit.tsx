import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useGetBusinessInfo } from "../hooks/useQueries";
import BookingForm from "./BookingForm";

export default function Visit() {
  const { data: info } = useGetBusinessInfo();

  return (
    <section
      id="visit"
      className="bg-foreground py-20 text-background md:py-28"
    >
      <div className="container grid gap-12 lg:grid-cols-2">
        <div>
          <span className="spec-label text-background/50">Contacto</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Peça a sua cotação
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-background/75">
            Diga-nos o material e a quantidade. Respondemos com o preço e o
            prazo de entrega — em Luanda e em todo o país.
          </p>

          {info && (
            <dl className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <dt className="spec-label text-background/50">Endereço</dt>
                  <dd className="mt-1">{info.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <dt className="spec-label text-background/50">Horário</dt>
                  <dd className="mt-1 space-y-1">
                    {info.openingHours.map((entry) => (
                      <div key={entry.days} className="flex gap-4">
                        <span className="w-44">{entry.days}</span>
                        <span className="text-background/75">
                          {entry.hours}
                        </span>
                      </div>
                    ))}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <dt className="spec-label text-background/50">Telefone</dt>
                  <dd className="mt-1">{info.phone}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <dt className="spec-label text-background/50">E-mail</dt>
                  <dd className="mt-1">{info.email}</dd>
                </div>
              </div>
            </dl>
          )}
        </div>

        <BookingForm />
      </div>
    </section>
  );
}
