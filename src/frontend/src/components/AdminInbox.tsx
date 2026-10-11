import { Check, Inbox, Trash2, Undo2 } from "lucide-react";
import type { BookingRequest } from "../backend";
import {
  useDeleteBookingRequest,
  useListBookingRequests,
  useSetBookingRequestHandled,
} from "../hooks/useQueries";

function formatDate(createdAt: bigint): string {
  return new Date(Number(createdAt / 1_000_000n)).toLocaleString("pt-PT", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function RequestCard({ request }: { request: BookingRequest }) {
  const setHandled = useSetBookingRequestHandled();
  const deleteRequest = useDeleteBookingRequest();

  return (
    <li
      className={`rounded-2xl border p-6 ${
        request.handled
          ? "border-espresso/10 bg-sand/50 opacity-70"
          : "border-clay/40 bg-cream"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg font-medium">{request.name}</h3>
          <p className="text-sm text-cocoa">{request.contact}</p>
        </div>
        <span className="text-xs text-cocoa/70">
          {formatDate(request.createdAt)}
        </span>
      </div>
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-cocoa">Serviço</dt>
          <dd>{request.service || "Ainda por definir"}</dd>
        </div>
        <div>
          <dt className="font-semibold text-cocoa">Data preferida</dt>
          <dd>{request.preferredTime || "—"}</dd>
        </div>
      </dl>
      {request.message && (
        <p className="mt-3 text-sm leading-relaxed">{request.message}</p>
      )}
      <div className="mt-5 flex items-center gap-4 border-t border-espresso/10 pt-4 text-sm font-semibold">
        <button
          type="button"
          onClick={() =>
            setHandled.mutate({ id: request.id, handled: !request.handled })
          }
          disabled={setHandled.isPending}
          className="flex items-center gap-1.5 text-clay-dark hover:opacity-80 disabled:opacity-50"
        >
          {request.handled ? (
            <>
              <Undo2 className="h-4 w-4" /> Marcar como novo
            </>
          ) : (
            <>
              <Check className="h-4 w-4" /> Marcar como tratado
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => deleteRequest.mutate(request.id)}
          disabled={deleteRequest.isPending}
          className="flex items-center gap-1.5 text-cocoa hover:text-red-700 disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" /> Eliminar
        </button>
      </div>
    </li>
  );
}

export default function AdminInbox() {
  const { data: requests = [], isPending } = useListBookingRequests(true);

  const sorted = [...requests].sort((a, b) => {
    if (a.handled !== b.handled) return a.handled ? 1 : -1;
    return Number(b.id - a.id);
  });

  return (
    <main className="container max-w-3xl py-12">
      <h1 className="font-serif text-3xl font-medium tracking-tight">
        Pedidos recebidos
      </h1>
      <p className="mt-2 text-cocoa">
        Pedidos enviados através do site. Confirme-os por telefone ou e-mail e
        depois marque-os como tratados.
      </p>
      {isPending ? (
        <div className="mt-10 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-clay" />
        </div>
      ) : sorted.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-espresso/20 p-12 text-center text-cocoa">
          <Inbox className="h-10 w-10 text-clay" />
          <p className="mt-4 font-medium">Ainda não há pedidos</p>
          <p className="mt-1 text-sm">
            Os novos pedidos enviados pelo site aparecerão aqui.
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {sorted.map((request) => (
            <RequestCard key={request.id.toString()} request={request} />
          ))}
        </ul>
      )}
    </main>
  );
}
