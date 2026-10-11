import { CheckCircle2, KeyRound, Loader2, ShieldAlert } from "lucide-react";
import { useState } from "react";
import {
  useChangeOwnerPassword,
  useIsOwnerPasswordSet,
  useSetOwnerPassword,
} from "../hooks/useQueries";

const inputClasses =
  "w-full rounded-sm border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

function Feedback({
  kind,
  message,
}: {
  kind: "success" | "error";
  message: string;
}) {
  const isSuccess = kind === "success";
  return (
    <p
      data-ocid={isSuccess ? "settings.success_state" : "settings.error_state"}
      className={`flex items-start gap-2 rounded-sm border px-4 py-3 text-sm ${
        isSuccess
          ? "border-success/40 bg-success/10 text-foreground"
          : "border-destructive/40 bg-destructive/10 text-foreground"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
      ) : (
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
      )}
      <span>{message}</span>
    </p>
  );
}

function SetPasswordForm() {
  const setOwnerPassword = useSetOwnerPassword();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [feedback, setFeedback] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);

  const mismatch = confirm.length > 0 && password !== confirm;

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
    if (password !== confirm) {
      setFeedback({
        kind: "error",
        message: "As palavras-passe não coincidem.",
      });
      return;
    }
    const captured = password;
    setOwnerPassword.mutate(captured, {
      onSuccess: () => {
        setPassword("");
        setConfirm("");
        setFeedback({
          kind: "success",
          message:
            "Palavra-passe do proprietário definida. Já pode iniciar sessão.",
        });
      },
      onError: () =>
        setFeedback({
          kind: "error",
          message: "Não foi possível definir a palavra-passe. Tente novamente.",
        }),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-ocid="settings.set_password.panel"
      className="space-y-5"
    >
      <div className="space-y-1.5">
        <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
          Definir palavra-passe
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Ainda não existe uma palavra-passe de proprietário. Defina uma para
          aceder ao painel de gestão.
        </p>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          Nova palavra-passe
        </span>
        <input
          type="password"
          data-ocid="settings.set_password.input"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          className={inputClasses}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          Confirmar palavra-passe
        </span>
        <input
          type="password"
          data-ocid="settings.set_password.confirm_input"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Repita a palavra-passe"
          className={inputClasses}
        />
      </label>

      {mismatch && (
        <p
          data-ocid="settings.set_password.error_state"
          className="text-sm text-destructive"
        >
          As palavras-passe não coincidem.
        </p>
      )}

      <button
        type="submit"
        data-ocid="settings.set_password.submit_button"
        disabled={setOwnerPassword.isPending || !password || !confirm}
        className="flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {setOwnerPassword.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        Definir palavra-passe
      </button>

      {feedback && <Feedback kind={feedback.kind} message={feedback.message} />}
    </form>
  );
}

function ChangePasswordForm() {
  const changeOwnerPassword = useChangeOwnerPassword();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [feedback, setFeedback] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);

  const mismatch = confirm.length > 0 && next !== confirm;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFeedback(null);
    if (next.length < 6) {
      setFeedback({
        kind: "error",
        message: "A nova palavra-passe deve ter pelo menos 6 caracteres.",
      });
      return;
    }
    if (next !== confirm) {
      setFeedback({
        kind: "error",
        message: "As palavras-passe não coincidem.",
      });
      return;
    }
    changeOwnerPassword.mutate(
      { currentPassword: current, newPassword: next },
      {
        onSuccess: (result) => {
          if (result.__kind__ === "err") {
            setFeedback({ kind: "error", message: result.err });
            return;
          }
          setCurrent("");
          setNext("");
          setConfirm("");
          setFeedback({
            kind: "success",
            message: "Palavra-passe alterada com sucesso.",
          });
        },
        onError: () =>
          setFeedback({
            kind: "error",
            message:
              "Não foi possível alterar a palavra-passe. Tente novamente.",
          }),
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-ocid="settings.change_password.panel"
      className="space-y-5"
    >
      <div className="space-y-1.5">
        <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
          Alterar palavra-passe
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Introduza a palavra-passe atual e escolha uma nova.
        </p>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          Palavra-passe atual
        </span>
        <input
          type="password"
          data-ocid="settings.change_password.current_input"
          required
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder="••••••••"
          className={inputClasses}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          Nova palavra-passe
        </span>
        <input
          type="password"
          data-ocid="settings.change_password.new_input"
          required
          minLength={6}
          value={next}
          onChange={(e) => setNext(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          className={inputClasses}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">
          Confirmar nova palavra-passe
        </span>
        <input
          type="password"
          data-ocid="settings.change_password.confirm_input"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Repita a nova palavra-passe"
          className={inputClasses}
        />
      </label>

      {mismatch && (
        <p
          data-ocid="settings.change_password.error_state"
          className="text-sm text-destructive"
        >
          As palavras-passe não coincidem.
        </p>
      )}

      <button
        type="submit"
        data-ocid="settings.change_password.submit_button"
        disabled={
          changeOwnerPassword.isPending || !current || !next || !confirm
        }
        className="flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {changeOwnerPassword.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        Alterar palavra-passe
      </button>

      {feedback && <Feedback kind={feedback.kind} message={feedback.message} />}
    </form>
  );
}

export default function SettingsPage() {
  const { data: isSet, isPending } = useIsOwnerPasswordSet();

  return (
    <main data-ocid="settings.page" className="container max-w-2xl py-12">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-primary/10">
          <KeyRound className="h-5 w-5 text-primary" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Definições
          </h1>
          <p className="text-sm text-muted-foreground">
            Gestão da palavra-passe do proprietário.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-subtle sm:p-8">
        {isPending ? (
          <div
            data-ocid="settings.loading_state"
            className="flex justify-center py-10"
          >
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : isSet ? (
          <ChangePasswordForm />
        ) : (
          <SetPasswordForm />
        )}
      </div>
    </main>
  );
}
