import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Inbox, LogOut, PanelTop, Settings, Users } from "lucide-react";

export type DashboardView = "site" | "inbox" | "settings" | "accounts";

const VIEW_BUTTONS: Array<{
  view: DashboardView;
  label: string;
  icon: typeof Inbox;
}> = [
  { view: "site", label: "Site", icon: PanelTop },
  { view: "inbox", label: "Pedidos", icon: Inbox },
  { view: "settings", label: "Definições", icon: Settings },
  { view: "accounts", label: "Contas", icon: Users },
];

export default function AdminBar({
  view,
  onChangeView,
  onSignOut,
}: {
  view: DashboardView;
  onChangeView: (view: DashboardView) => void;
  onSignOut: () => void;
}) {
  const { clear } = useInternetIdentity();

  const handleSignOut = () => {
    clear();
    onSignOut();
  };

  return (
    <div
      data-ocid="dashboard.panel"
      className="sticky top-0 z-50 border-b border-primary-foreground/10 bg-primary text-primary-foreground"
    >
      <div className="container flex flex-col gap-2 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <span className="spec-label text-primary-foreground/70">
          Painel do proprietário
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {VIEW_BUTTONS.map(({ view: target, label, icon: Icon }) => (
            <button
              key={target}
              type="button"
              data-ocid={`dashboard.${target}.tab`}
              onClick={() => onChangeView(target)}
              aria-pressed={view === target}
              className={`flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-semibold transition-colors ${
                view === target
                  ? "bg-primary-foreground text-primary"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
          <button
            type="button"
            data-ocid="dashboard.signout_button"
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-semibold text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
