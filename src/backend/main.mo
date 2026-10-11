import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose "mo:caffeineai-oql/Expose";
import MapEntity "mo:caffeineai-oql/MapEntity";
import ArrayEntity "mo:caffeineai-oql/ArrayEntity";
import Entity "mo:caffeineai-oql/Entity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import BoolValue "mo:caffeineai-oql/BoolValue";
import Common "types/common";
import AccountsLib "lib/accounts";
import BusinessApi "mixins/business-api";
import RequestsApi "mixins/requests-api";
import AccountsApi "mixins/accounts-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  let businessInfo : Common.BusinessInfo;
  let services : [Common.Service];
  let team : [Common.TeamMember];
  let testimonials : [Common.Testimonial];
  let gallery : [Common.GalleryImage];
  let catalogueNote : Common.CatalogueNote;

  let bookingRequests : Map.Map<Nat, Common.BookingRequest>;
  let requestState : { var nextRequestId : Nat };

  let accountsState : AccountsLib.AccountsState;

  include BusinessApi();
  include RequestsApi(accessControlState, bookingRequests, requestState);
  include AccountsApi(accessControlState, accountsState);
  include ApiDocMixin();

  include Expose({
    entities = [
      // Public business profile. `openingHours` is a nested collection, so the
      // entity is declared manually and the hours are flattened to one Text.
      [businessInfo].toEntityManual<Common.BusinessInfo>("businessInfo", "BusinessInfo", "name")
        .sample({
          name = "";
          tagline = "";
          phone = "";
          email = "";
          address = "";
          openingHours = [];
        })
        .payload("name", func b = b.name)
        .payload("tagline", func b = b.tagline)
        .payload("phone", func b = b.phone)
        .payload("email", func b = b.email)
        .payload("address", func b = b.address)
        .payload("openingHours", func b = b.openingHours.values().map(func h = h.days # ": " # h.hours).join("; "))
        .public_()
        .build(),
      // The five products.
      services.toEntity<Common.Service>("service", "Service", "id")
        .sample({ id = 0; name = ""; description = ""; price = ""; duration = "" })
        .public_()
        .build(),
      // Public catalogue note.
      [catalogueNote].toEntity<Common.CatalogueNote>("catalogueNote", "CatalogueNote", "note")
        .sample({ note = "" })
        .public_()
        .build(),
      // Public site content.
      team.toEntity<Common.TeamMember>("teamMember", "TeamMember", "id")
        .sample({ id = 0; name = ""; role = ""; bio = ""; photo = "" })
        .public_()
        .build(),
      testimonials.toEntity<Common.Testimonial>("testimonial", "Testimonial", "id")
        .sample({ id = 0; author = ""; quote = "" })
        .public_()
        .build(),
      gallery.toEntity<Common.GalleryImage>("galleryImage", "GalleryImage", "id")
        .sample({ id = 0; url = ""; caption = "" })
        .public_()
        .build(),
      // Quote requests. Customer names, contacts, and messages are private,
      // so this entity is controller-only rather than public.
      bookingRequests.toEntity("bookingRequest", "BookingRequest", "id")
        .sample({
          id = 0;
          name = "";
          contact = "";
          service = "";
          preferredTime = "";
          message = "";
          createdAt = 0;
          handled = false;
        })
        .controllerOnly()
        .build(),
      // Owner-created accounts. `passwordHash` is hidden.
      accountsState.accounts.toEntity("account", "Account", "id")
        .sample({
          id = 0;
          email = "";
          passwordHash = "";
          displayName = "";
          createdAt = 0;
          active = false;
        })
        .hidden("passwordHash")
        .controllerOnly()
        .build(),
    ];
  });
};
