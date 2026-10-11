import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useGetServices, useSubmitBookingRequest } from "../hooks/useQueries";

const inputClasses =
  "w-full rounded-sm border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export default function BookingForm() {
  const { data: services = [] } = useGetServices();
  const submitBooking = useSubmitBookingRequest();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [service, setService] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    await submitBooking.mutateAsync({
      name: name.trim(),
      contact: contact.trim(),
      service,
      preferredTime: preferredTime.trim(),
      message: message.trim(),
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        id="book"
        data-ocid="quote.success_state"
        className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-10 text-center shadow-subtle"
      >
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h3 className="mt-5 font-display text-2xl font-bold text-foreground">
          Cotação enviada!
        </h3>
        <p className="mt-3 max-w-sm text-muted-foreground">
          Obrigado, {name.trim()}. Vamos responder-lhe com o preço e a
          disponibilidade do material.
        </p>
        <button
          type="button"
          data-ocid="quote.reset_button"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setContact("");
            setService("");
            setPreferredTime("");
            setMessage("");
          }}
          className="mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Pedir outra cotação
        </button>
      </div>
    );
  }

  return (
    <form
      id="book"
      data-ocid="quote.form"
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-card p-8 shadow-subtle"
    >
      <span className="spec-label text-muted-foreground">Cotação</span>
      <h3 className="mt-3 font-display text-2xl font-bold text-foreground">
        Faça a sua cotação
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Diga-nos o que precisa e devolvemos o preço e o prazo de entrega.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            Nome *
          </span>
          <input
            type="text"
            data-ocid="quote.name_input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: João Mateus"
            className={inputClasses}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            Telefone ou e-mail *
          </span>
          <input
            type="text"
            data-ocid="quote.contact_input"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="+244 923 000 000"
            className={inputClasses}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            Produto
          </span>
          <select
            data-ocid="quote.product_select"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={inputClasses}
          >
            <option value="">Ainda não sei</option>
            {services.map((option) => (
              <option key={option.id.toString()} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            Onde é a obra?
          </span>
          <input
            type="text"
            data-ocid="quote.location_input"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            placeholder="Luanda, Talatona…"
            className={inputClasses}
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          Quantidades e detalhes
        </span>
        <textarea
          data-ocid="quote.message_textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Ex.: 40 varões A500 de 12mm e 20 chapas caneladas lacadas."
          className={inputClasses}
        />
      </label>

      {submitBooking.isError && (
        <p
          data-ocid="quote.error_state"
          className="mt-4 text-sm text-destructive"
        >
          Não foi possível enviar o pedido. Tente novamente.
        </p>
      )}

      <button
        type="submit"
        data-ocid="quote.submit_button"
        disabled={submitBooking.isPending}
        className="mt-6 w-full rounded-sm bg-accent px-7 py-3.5 font-semibold text-accent-foreground transition-smooth hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitBooking.isPending ? "A enviar…" : "Enviar pedido de cotação"}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Sem necessidade de conta. Usamos os seus dados apenas para responder à
        cotação.
      </p>
    </form>
  );
}
