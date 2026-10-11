import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Accounts "../types/accounts";
import AccountsLib "../lib/accounts";

mixin (
  accessControlState : AccessControl.AccessControlState,
  accountsState : AccountsLib.AccountsState,
) {
  public query func isOwnerPasswordSet() : async Bool {
    AccountsLib.isOwnerPasswordSet(accountsState);
  };

  public shared ({ caller }) func setOwnerPassword(password : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return;
    };
    if (AccountsLib.isOwnerPasswordSet(accountsState)) {
      return;
    };
    AccountsLib.setOwnerPassword(accountsState, password);
  };

  public shared ({ caller }) func changeOwnerPassword(currentPassword : Text, newPassword : Text) : async Accounts.OwnerAuthResult {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Apenas o proprietário pode alterar a palavra-passe.");
    };
    AccountsLib.changeOwnerPassword(accountsState, currentPassword, newPassword);
  };

  public shared ({ caller }) func ownerSignIn(password : Text) : async Accounts.OwnerAuthResult {
    if (caller.isAnonymous()) {
      return #err("Inicie sessão com a sua identidade para aceder ao painel.");
    };
    switch (AccountsLib.ownerSignIn(accountsState, password)) {
      case (#ok message) {
        // The owner password is an alternative credential to Internet
        // Identity. On success the caller is granted the admin role so
        // `isCallerAdmin` (and therefore the dashboard) unlocks.
        accessControlState.userRoles.add(caller, #admin);
        #ok(message);
      };
      case (#err message) { #err(message) };
    };
  };

  public shared ({ caller }) func createAccount(email : Text, password : Text, displayName : Text) : async Accounts.AccountView {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return { id = 0; email = ""; displayName = ""; createdAt = 0; active = false };
    };
    AccountsLib.createAccount(accountsState, email, password, displayName);
  };

  public shared query ({ caller }) func listAccounts() : async [Accounts.AccountView] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return [];
    };
    AccountsLib.listAccounts(accountsState);
  };

  public shared ({ caller }) func setAccountActive(id : Accounts.AccountId, active : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return;
    };
    AccountsLib.setAccountActive(accountsState, id, active);
  };

  public shared ({ caller }) func deleteAccount(id : Accounts.AccountId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return;
    };
    AccountsLib.deleteAccount(accountsState, id);
  };

  public shared func signIn(email : Text, password : Text) : async Accounts.AuthResult {
    AccountsLib.signIn(accountsState, email, password);
  };

  public shared func signOut(token : Text) : async () {
    AccountsLib.signOut(accountsState, token);
  };

  public query func getSessionAccount(token : Text) : async ?Accounts.AccountView {
    AccountsLib.getSessionAccount(accountsState, token);
  };
};
