import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";

// Rebrand migration: replaces the salon seed data with the TXMOVÉL ANGOLA
// construction-materials catalogue, adds the catalogue note, wraps the request
// counter in `requestState`, and introduces the owner-account state.
module {
  type DayHours = {
    days : Text;
    hours : Text;
  };

  type BusinessInfo = {
    name : Text;
    tagline : Text;
    phone : Text;
    email : Text;
    address : Text;
    openingHours : [DayHours];
  };

  type Service = {
    id : Nat;
    name : Text;
    description : Text;
    price : Text;
    duration : Text;
  };

  type TeamMember = {
    id : Nat;
    name : Text;
    role : Text;
    bio : Text;
    photo : Text;
  };

  type Testimonial = {
    id : Nat;
    author : Text;
    quote : Text;
  };

  type GalleryImage = {
    id : Nat;
    url : Text;
    caption : Text;
  };

  type OldBookingRequest = {
    id : Nat;
    name : Text;
    contact : Text;
    service : Text;
    preferredTime : Text;
    message : Text;
    createdAt : Time.Time;
    handled : Bool;
  };

  type BookingRequest = {
    id : Nat;
    name : Text;
    contact : Text;
    service : Text;
    preferredTime : Text;
    message : Text;
    createdAt : Nat;
    handled : Bool;
  };

  type CatalogueNote = {
    note : Text;
  };

  type AccountId = Nat;

  type Account = {
    id : AccountId;
    email : Text;
    passwordHash : Text;
    displayName : Text;
    createdAt : Nat;
    active : Bool;
  };

  type Session = {
    token : Text;
    accountId : AccountId;
    createdAt : Nat;
  };

  type AccountsState = {
    accounts : Map.Map<AccountId, Account>;
    var nextAccountId : AccountId;
    sessions : Map.Map<Text, Session>;
    var ownerPasswordHash : ?Text;
  };

  type OldActor = {
    accessControlState : AccessControl.AccessControlState;
    businessInfo : BusinessInfo;
    services : [Service];
    team : [TeamMember];
    testimonials : [Testimonial];
    gallery : [GalleryImage];
    bookingRequests : Map.Map<Nat, OldBookingRequest>;
    var nextRequestId : Nat;
  };

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    businessInfo : BusinessInfo;
    services : [Service];
    team : [TeamMember];
    testimonials : [Testimonial];
    gallery : [GalleryImage];
    catalogueNote : CatalogueNote;
    bookingRequests : Map.Map<Nat, BookingRequest>;
    requestState : { var nextRequestId : Nat };
    accountsState : AccountsState;
  };

  public func migration(old : OldActor) : NewActor {
    {
      accessControlState = old.accessControlState;
      businessInfo = {
        name = "TXMOVÉL ANGOLA - COMÉRCIO E PRESTAÇÃO DE SERVIÇOS, SU LDA";
        tagline = "Construir Angola, com qualidade e resistência.";
        phone = "+244 923 000 000";
        email = "geral@txmovel.ao";
        address = "Luanda, Angola";
        openingHours = [
          { days = "Segunda - Sexta"; hours = "08:00 - 17:00" },
          { days = "Sábado"; hours = "08:00 - 13:00" },
          { days = "Domingo"; hours = "Fechado" },
        ];
      };
      services = [
        {
          id = 0;
          name = "Postes de Iluminação Pública";
          description = "Metálicos e em betão, galvanizados.";
          price = "Sob consulta";
          duration = "Entrega em 24h";
        },
        {
          id = 1;
          name = "Chapas Caneladas";
          description = "Zincadas e lacadas, várias medidas.";
          price = "Sob consulta";
          duration = "Entrega em 24h";
        },
        {
          id = 2;
          name = "Varões de Aço";
          description = "A400 e A500, 6mm a 32mm.";
          price = "Sob consulta";
          duration = "Entrega em 24h";
        },
        {
          id = 3;
          name = "Perfis Metálicos";
          description = "IPE, UPN, HEA, tubos quadrados e rectangulares.";
          price = "Sob consulta";
          duration = "Entrega em 24h";
        },
        {
          id = 4;
          name = "Acessórios";
          description = "Arames, pregos, chapas de zinco, cantoneiras.";
          price = "Sob consulta";
          duration = "Entrega em 24h";
        },
      ];
      team = [];
      testimonials = [];
      gallery = [];
      catalogueNote = { note = "Vendemos a grosso e a retalho." };
      bookingRequests = old.bookingRequests.map(
        func(_, r) {
          {
            id = r.id;
            name = r.name;
            contact = r.contact;
            service = r.service;
            preferredTime = r.preferredTime;
            message = r.message;
            createdAt = r.createdAt.toNat();
            handled = r.handled;
          };
        }
      );
      requestState = { var nextRequestId = old.nextRequestId };
      accountsState = {
        accounts = Map.empty();
        var nextAccountId = 0;
        sessions = Map.empty();
        var ownerPasswordHash = null;
      };
    };
  };
};
