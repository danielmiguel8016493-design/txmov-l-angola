module {
  public type AccountId = Nat;

  public type Account = {
    id : AccountId;
    email : Text;
    passwordHash : Text;
    displayName : Text;
    createdAt : Nat;
    active : Bool;
  };

  public type AccountView = {
    id : AccountId;
    email : Text;
    displayName : Text;
    createdAt : Nat;
    active : Bool;
  };

  public type Session = {
    token : Text;
    accountId : AccountId;
    createdAt : Nat;
  };

  public type AuthResult = {
    #ok : { token : Text; account : AccountView };
    #err : Text;
  };

  public type OwnerPasswordStatus = {
    isSet : Bool;
  };

  public type OwnerAuthResult = {
    #ok : Text;
    #err : Text;
  };

  public func toView(account : Account) : AccountView {
    {
      id = account.id;
      email = account.email;
      displayName = account.displayName;
      createdAt = account.createdAt;
      active = account.active;
    };
  };
};
