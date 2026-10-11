import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import RequestsLib "../lib/requests";

mixin (
  accessControlState : AccessControl.AccessControlState,
  requests : Map.Map<Nat, Common.BookingRequest>,
  state : { var nextRequestId : Nat },
) {
  public shared func submitBookingRequest(
    name : Text,
    contact : Text,
    service : Text,
    preferredTime : Text,
    message : Text,
  ) : async Nat {
    RequestsLib.submitBookingRequest(requests, state, name, contact, service, preferredTime, message);
  };

  public shared query ({ caller }) func listBookingRequests() : async [Common.BookingRequest] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return [];
    };
    RequestsLib.listBookingRequests(requests);
  };

  public shared ({ caller }) func setBookingRequestHandled(id : Nat, handled : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return;
    };
    RequestsLib.setBookingRequestHandled(requests, id, handled);
  };

  public shared ({ caller }) func deleteBookingRequest(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return;
    };
    RequestsLib.deleteBookingRequest(requests, id);
  };
};
