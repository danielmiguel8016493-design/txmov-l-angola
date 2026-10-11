module {
  public type Timestamp = Nat;

  public type DayHours = {
    days : Text;
    hours : Text;
  };

  public type BusinessInfo = {
    name : Text;
    tagline : Text;
    phone : Text;
    email : Text;
    address : Text;
    openingHours : [DayHours];
  };

  public type Service = {
    id : Nat;
    name : Text;
    description : Text;
    price : Text;
    duration : Text;
  };

  public type TeamMember = {
    id : Nat;
    name : Text;
    role : Text;
    bio : Text;
    photo : Text;
  };

  public type Testimonial = {
    id : Nat;
    author : Text;
    quote : Text;
  };

  public type GalleryImage = {
    id : Nat;
    url : Text;
    caption : Text;
  };

  public type BookingRequest = {
    id : Nat;
    name : Text;
    contact : Text;
    service : Text;
    preferredTime : Text;
    message : Text;
    createdAt : Timestamp;
    handled : Bool;
  };

  public type CatalogueNote = {
    note : Text;
  };
};
