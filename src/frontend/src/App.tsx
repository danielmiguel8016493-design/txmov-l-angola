import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import About from "./components/About";
import AdminBar, { type DashboardView } from "./components/AdminBar";
import AdminInbox from "./components/AdminInbox";
import Advantages from "./components/Advantages";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import SignInPage from "./components/SignInPage";
import Visit from "./components/Visit";
import { useGetSessionAccount, useIsCallerAdmin } from "./hooks/useQueries";
import AccountsPage from "./pages/AccountsPage";
import SettingsPage from "./pages/SettingsPage";

const SESSION_TOKEN_KEY = "txmovel.sessionToken";

function App() {
  const { isInitializing, identity } = useInternetIdentity();
  const { data: isCallerAdmin = false } = useIsCallerAdmin();
  const [view, setView] = useState<DashboardView>("site");
  const [showSignIn, setShowSignIn] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(() =>
    typeof window === "undefined"
      ? null
      : window.localStorage.getItem(SESSION_TOKEN_KEY),
  );
  const { data: sessionAccount, isPending: isSessionPending } =
    useGetSessionAccount(sessionToken);
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity || !!sessionAccount;

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    if (!isInitializing) {
      queryClient.invalidateQueries();
    }
  }, [isAuthenticated, isInitializing, queryClient]);

  useEffect(() => {
    if (sessionToken && !isSessionPending && !sessionAccount) {
      window.localStorage.removeItem(SESSION_TOKEN_KEY);
      setSessionToken(null);
    }
  }, [sessionToken, isSessionPending, sessionAccount]);

  useEffect(() => {
    if (!isCallerAdmin && !sessionAccount) {
      setView("site");
    }
  }, [isCallerAdmin, sessionAccount]);

  const handleSignOut = () => {
    window.localStorage.removeItem(SESSION_TOKEN_KEY);
    setSessionToken(null);
    setView("site");
  };

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    );
  }

  if (showSignIn) {
    return (
      <SignInPage
        onBack={() => setShowSignIn(false)}
        onOwnerAuthenticated={() => {
          // ownerSignIn grants #admin server-side, but the identity was already
          // set by login() before the grant, so isAuthenticated never changes
          // and the invalidateQueries effect above does not re-run. Refetch
          // isCallerAdmin explicitly so hasDashboardAccess flips to true.
          void queryClient.invalidateQueries({ queryKey: ["isCallerAdmin"] });
          setShowSignIn(false);
          setView("inbox");
        }}
        onAccountAuthenticated={(token) => {
          window.localStorage.setItem(SESSION_TOKEN_KEY, token);
          setSessionToken(token);
          setShowSignIn(false);
          setView("inbox");
        }}
      />
    );
  }

  const hasDashboardAccess = isCallerAdmin || !!sessionAccount;

  return (
    <div className="min-h-screen bg-background">
      {hasDashboardAccess && (
        <AdminBar
          view={view}
          onChangeView={setView}
          onSignOut={handleSignOut}
        />
      )}
      {hasDashboardAccess && view === "inbox" ? (
        <AdminInbox />
      ) : hasDashboardAccess && view === "settings" ? (
        <SettingsPage />
      ) : hasDashboardAccess && view === "accounts" ? (
        <AccountsPage />
      ) : (
        <>
          <Header
            showDashboard={hasDashboardAccess && view !== "site"}
            onToggleDashboard={() =>
              setView((current) => (current === "site" ? "inbox" : "site"))
            }
            onSignIn={() => setShowSignIn(true)}
            isAuthenticated={isAuthenticated}
          />
          <main>
            <Hero />
            <About />
            <Services />
            <Advantages />
            <Visit />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
