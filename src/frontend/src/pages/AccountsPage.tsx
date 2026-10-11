import {
  CheckCircle2,
  Loader2,
  Mail,
  Power,
  PowerOff,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { AccountView } from "../backend";
import {
  useCreateAccount,
  useDeleteAccount,
  useListAccounts,
  useSetAccountActive,
} from "../hooks/useQueries";

const inputClasses =
  "w-full rounded-sm border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

function formatDate(createdAt: bigint): string {
  const date = new Date(Number(createdAt / 1_000_000n));
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, { dateStyle: "medium" });
}

function CreateAccountForm() {
  const createAccount = useCreateAccount();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFeedback(null);
    if (password.length < 6) {
      setFeedback({
        kind: "error",
        message: "A palavra-passe deve ter pelo menos 6 caracteres.",
      });
      return;
    }
    createAccount.mutate(
      {
        email: email.trim(),
        password,
        displayName: displayName.trim(),
      },
      {
        onSuccess: () => {
          setDisplayName("");
          setEmail("");
          setPassword("");
          setFeedback({
            kind: "success",
            message:
              "Conta criada. O utilizador já pode iniciar sessão com este e-mail e palavra-passe.",
          });
        },
        onError: () =>
          setFeedback({
            kind: "error",
            message:
              "Não foi possível criar a conta. Verifique se o e-mail já existe.",
          }),
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-ocid="accounts.create.panel"
      className="space-y-5"
    >
      <div className="space-y-1.5">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-foreground">
          <UserPlus className="h-5 w-5 text-primary" />
          Criar conta de acesso
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Crie um e-mail e palavra-passe para outro utilizador. Com estas
          credenciais, o utilizador pode iniciar sessão e aceder ao site.
        </p>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          Nome a apresentar
        </span>
        <input
          type="text"
          data-ocid="accounts.create.display_name_input"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Ex.: João Mateus"
          className={inputClasses}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          E-mail
        </span>
        <input
          type="email"
          data-ocid="accounts.create.email_input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nome@exemplo.ao"
          className={inputClasses}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          Palavra-passe
        </span>
        <input
          type="password"
          data-ocid="accounts.create.password_input"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          className={inputClasses}
        />
      </label>

      <button
        type="submit"
        data-ocid="accounts.create.submit_button"
        disabled={
          createAccount.isPending || !displayName || !email || !password
        }
        className="flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {createAccount.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        Criar conta
      </button>

      {feedback && (
        <p
          data-ocid={
            feedback.kind === "success"
              ? "accounts.create.success_state"
              : "accounts.create.error_state"
          }
          className={`flex items-start gap-2 rounded-sm border px-4 py-3 text-sm ${
            feedback.kind === "success"
              ? "border-success/40 bg-success/10 text-foreground"
              : "border-destructive/40 bg-destructive/10 text-foreground"
          }`}
        >
          {feedback.kind === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          ) : (
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
          )}
          <span>{feedback.message}</span>
        </p>
      )}
    </form>
  );
}

function AccountRow({
  account,
  index,
}: { account: AccountView; index: number }) {
  const setActive = useSetAccountActive();
  const deleteAccount = useDeleteAccount();

  return (
    <li
      data-ocid={`accounts.item.${index}`}
      className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 shadow-subtle sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-display text-base font-bold text-foreground">
            {account.displayName}
          </span>
          <span
            data-ocid={`accounts.status.${index}`}
            className={`spec-label rounded-sm px-2 py-0.5 ${
              account.active
                ? "bg-success/15 text-success"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {account.active ? "Ativa" : "Inativa"}
          </span>
        </div>
        <p className="mt-1 truncate text-sm text-muted-foreground">
          {account.email}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Criada em {formatDate(account.createdAt)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          data-ocid={`accounts.toggle_button.${index}`}
          onClick={() =>
            setActive.mutate({ id: account.id, active: !account.active })
          }
          disabled={setActive.isPending}
          className="flex items-center gap-1.5 rounded-sm border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          {account.active ? (
            <>
              <PowerOff className="h-4 w-4" />
              Desativar
            </>
          ) : (
            <>
              <Power className="h-4 w-4" />
              Ativar
            </>
          )}
        </button>
        <button
          type="button"
          data-ocid={`accounts.delete_button.${index}`}
          onClick={() => deleteAccount.mutate(account.id)}
          disabled={deleteAccount.isPending}
          aria-label={`Eliminar conta de ${account.displayName}`}
          className="flex items-center gap-1.5 rounded-sm border border-destructive/40 px-3 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Trash2 className="h-4 w-4" />
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default function AccountsPage() {
  const { data: accounts = [], isPending } = useListAccounts(true);

  const sorted = [...accounts].sort((a, b) => Number(b.id - a.id));

  return (
    <main data-ocid="accounts.page" className="container max-w-3xl py-12">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Contas
          </h1>
          <p className="text-sm text-muted-foreground">
            Contas de acesso criadas pelo proprietário.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-subtle sm:p-8">
        <CreateAccountForm />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
          Contas criadas
        </h2>

        {isPending ? (
          <div
            data-ocid="accounts.loading_state"
            className="mt-6 flex justify-center py-10"
          >
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : sorted.length === 0 ? (
          <div
            data-ocid="accounts.empty_state"
            className="mt-6 flex flex-col items-center rounded-lg border border-dashed border-border p-12 text-center"
          >
            <Users className="h-10 w-10 text-muted-foreground" />
            <p className="mt-4 font-medium text-foreground">
              Ainda não existem contas
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Crie a primeira conta de acesso no formulário acima.
            </p>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {sorted.map((account, index) => (
              <AccountRow
                key={account.id.toString()}
                account={account}
                index={index + 1}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
