import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { ArrowLeft, KeyRound, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  useGetBusinessInfo,
  useOwnerSignIn,
  useSignIn,
} from "../hooks/useQueries";

const inputClasses =
  "w-full rounded-sm border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export default function SignInPage({
  onBack,
  onOwnerAuthenticated,
  onAccountAuthenticated,
}: {
  onBack: () => void;
  onOwnerAuthenticated: () => void;
  onAccountAuthenticated: (token: string) => void;
}) {
  const { data: info } = useGetBusinessInfo();
  const { login, isAuthenticated, isLoggingIn, loginError } =
    useInternetIdentity();
  const ownerSignIn = useOwnerSignIn();
  const signIn = useSignIn();
  const [mode, setMode] = useState<"owner" | "account">("owner");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ownerLoginPending, setOwnerLoginPending] = useState(false);

  const runOwnerSignIn = useCallback(() => {
    ownerSignIn.mutate(password, {
      onSuccess: (result) => {
        if (result.__kind__ === "err") {
          setError(result.err);
          return;
        }
        setPassword("");
        onOwnerAuthenticated();
      },
      onError: () =>
        setError("Não foi possível iniciar sessão. Tente novamente."),
    });
  }, [ownerSignIn, password, onOwnerAuthenticated]);

  // The owner password path requires a non-anonymous identity: the backend
  // rejects anonymous callers. Trigger Internet Identity login first, then run
  // ownerSignIn once the identity is available.
  useEffect(() => {
    if (ownerLoginPending && isAuthenticated) {
      setOwnerLoginPending(false);
      runOwnerSignIn();
    }
  }, [ownerLoginPending, isAuthenticated, runOwnerSignIn]);

  useEffect(() => {
    if (ownerLoginPending && loginError) {
      setOwnerLoginPending(false);
      setError("Não foi possível iniciar sessão. Tente novamente.");
    }
  }, [ownerLoginPending, loginError]);

  const handleOwnerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!isAuthenticated) {
      setOwnerLoginPending(true);
      login();
      return;
    }
    runOwnerSignIn();
  };

  const handleAccountSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    signIn.mutate(
      { email: email.trim(), password: accountPassword },
      {
        onSuccess: (result) => {
          if (result.__kind__ === "err") {
            setError(result.err);
            return;
          }
          setEmail("");
          setAccountPassword("");
          onAccountAuthenticated(result.ok.token);
        },
        onError: () =>
          setError("Não foi possível iniciar sessão. Tente novamente."),
      },
    );
  };

  const isPending =
    ownerSignIn.isPending ||
    signIn.isPending ||
    isLoggingIn ||
    ownerLoginPending;

  return (
    <div
      data-ocid="signin.page"
      className="flex min-h-screen flex-col bg-background"
    >
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center">
          <button
            type="button"
            data-ocid="signin.back_button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-subtle sm:p-10">
          <div className="mb-8 text-center">
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-sm bg-primary/10">
              <KeyRound className="h-6 w-6 text-primary" />
            </span>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Iniciar sessão
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Acesso ao painel de {info?.name ?? "TXMOVÉL ANGOLA"}.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-1 rounded-sm border border-border p-1">
            <button
              type="button"
              data-ocid="signin.owner.tab"
              onClick={() => {
                setMode("owner");
                setError(null);
              }}
              aria-pressed={mode === "owner"}
              className={`rounded-sm px-3 py-2 text-sm font-semibold transition-colors ${
                mode === "owner"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Proprietário
            </button>
            <button
              type="button"
              data-ocid="signin.account.tab"
              onClick={() => {
                setMode("account");
                setError(null);
              }}
              aria-pressed={mode === "account"}
              className={`rounded-sm px-3 py-2 text-sm font-semibold transition-colors ${
                mode === "account"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Conta criada
            </button>
          </div>

          {mode === "owner" ? (
            <form onSubmit={handleOwnerSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  Palavra-passe do proprietário
                </span>
                <input
                  type="password"
                  data-ocid="signin.owner.input"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClasses}
                />
              </label>
              <button
                type="submit"
                data-ocid="signin.owner.submit_button"
                disabled={isPending || !password}
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Entrar como proprietário
              </button>
            </form>
          ) : (
            <form onSubmit={handleAccountSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">
                  E-mail
                </span>
                <input
                  type="email"
                  data-ocid="signin.account.email_input"
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
                  data-ocid="signin.account.password_input"
                  required
                  value={accountPassword}
                  onChange={(e) => setAccountPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClasses}
                />
              </label>
              <button
                type="submit"
                data-ocid="signin.account.submit_button"
                disabled={isPending || !email || !accountPassword}
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {signIn.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Entrar
              </button>
            </form>
          )}

          {error && (
            <p
              data-ocid="signin.error_state"
              className="mt-5 text-center text-sm text-destructive"
            >
              {error}
            </p>
          )}

          <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
            O proprietário pode definir a palavra-passe em Definições e criar
            contas de acesso no painel.
          </p>
        </div>
      </main>
    </div>
  );
}
