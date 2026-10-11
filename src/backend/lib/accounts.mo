import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Char "mo:core/Char";
import Time "mo:core/Time";
import Accounts "../types/accounts";

module {
  public type AccountsState = {
    accounts : Map.Map<Accounts.AccountId, Accounts.Account>;
    var nextAccountId : Accounts.AccountId;
    sessions : Map.Map<Text, Accounts.Session>;
    var ownerPasswordHash : ?Text;
  };

  // Deterministic salted hash. Not cryptographic, but stable and one-way
  // enough for this app's password storage.
  public func hashPassword(password : Text) : Text {
    var h : Nat = 5381;
    for (c in password.toIter()) {
      h := (h * 33) + c.toNat32().toNat();
    };
    h.toText();
  };

  public func isOwnerPasswordSet(state : AccountsState) : Bool {
    switch (state.ownerPasswordHash) {
      case (?_) { true };
      case null { false };
    };
  };

  public func setOwnerPassword(state : AccountsState, password : Text) : () {
    state.ownerPasswordHash := ?hashPassword(password);
  };

  public func changeOwnerPassword(state : AccountsState, currentPassword : Text, newPassword : Text) : Accounts.OwnerAuthResult {
    switch (state.ownerPasswordHash) {
      case (?hash) {
        if (hash == hashPassword(currentPassword)) {
          state.ownerPasswordHash := ?hashPassword(newPassword);
          #ok("Palavra-passe alterada com sucesso.");
        } else {
          #err("Palavra-passe actual incorrecta.");
        };
      };
      case null {
        #err("Ainda não existe palavra-passe definida.");
      };
    };
  };

  public func ownerSignIn(state : AccountsState, password : Text) : Accounts.OwnerAuthResult {
    switch (state.ownerPasswordHash) {
      case (?hash) {
        if (hash == hashPassword(password)) {
          #ok("Sessão iniciada.");
        } else {
          #err("Palavra-passe incorrecta.");
        };
      };
      case null {
        #err("Ainda não existe palavra-passe definida.");
      };
    };
  };

  public func createAccount(
    state : AccountsState,
    email : Text,
    password : Text,
    displayName : Text,
  ) : Accounts.AccountView {
    let id = state.nextAccountId;
    state.nextAccountId := id + 1;
    let account : Accounts.Account = {
      id;
      email;
      passwordHash = hashPassword(password);
      displayName;
      createdAt = Time.now().toNat();
      active = true;
    };
    state.accounts.add(id, account);
    Accounts.toView(account);
  };

  public func listAccounts(state : AccountsState) : [Accounts.AccountView] {
    state.accounts.values().map(func a = Accounts.toView(a)).toArray();
  };

  public func setAccountActive(state : AccountsState, id : Accounts.AccountId, active : Bool) : () {
    switch (state.accounts.get(id)) {
      case (?account) {
        state.accounts.add(id, { account with active });
      };
      case null {};
    };
  };

  public func deleteAccount(state : AccountsState, id : Accounts.AccountId) : () {
    state.accounts.remove(id);
  };

  public func signIn(state : AccountsState, email : Text, password : Text) : Accounts.AuthResult {
    let hash = hashPassword(password);
    switch (state.accounts.values().find(func a = a.email == email and a.passwordHash == hash)) {
      case (?account) {
        if (not account.active) {
          return #err("Conta desactivada.");
        };
        let token = hashPassword(email # ":" # hash # ":" # account.id.toText());
        state.sessions.add(token, { token; accountId = account.id; createdAt = Time.now().toNat() });
        #ok({ token; account = Accounts.toView(account) });
      };
      case null {
        #err("Email ou palavra-passe incorrectos.");
      };
    };
  };

  public func signOut(state : AccountsState, token : Text) : () {
    state.sessions.remove(token);
  };

  public func getSessionAccount(state : AccountsState, token : Text) : ?Accounts.AccountView {
    switch (state.sessions.get(token)) {
      case (?session) {
        switch (state.accounts.get(session.accountId)) {
          case (?account) { ?Accounts.toView(account) };
          case null { null };
        };
      };
      case null { null };
    };
  };
};
