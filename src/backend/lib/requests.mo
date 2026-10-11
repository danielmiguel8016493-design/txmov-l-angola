import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Common "../types/common";

module {
  public func submitBookingRequest(
    requests : Map.Map<Nat, Common.BookingRequest>,
    state : { var nextRequestId : Nat },
    name : Text,
    contact : Text,
    service : Text,
    preferredTime : Text,
    message : Text,
  ) : Nat {
    let id = state.nextRequestId;
    state.nextRequestId := id + 1;
    requests.add(id, {
      id;
      name;
      contact;
      service;
      preferredTime;
      message;
      createdAt = Time.now().toNat();
      handled = false;
    });
    id;
  };

  public func listBookingRequests(requests : Map.Map<Nat, Common.BookingRequest>) : [Common.BookingRequest] {
    requests.values().toArray();
  };

  public func setBookingRequestHandled(
    requests : Map.Map<Nat, Common.BookingRequest>,
    id : Nat,
    handled : Bool,
  ) : () {
    switch (requests.get(id)) {
      case (?request) {
        requests.add(id, { request with handled });
      };
      case null {};
    };
  };

  public func deleteBookingRequest(
    requests : Map.Map<Nat, Common.BookingRequest>,
    id : Nat,
  ) : () {
    requests.remove(id);
  };
};
