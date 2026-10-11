import Common "../types/common";
import BusinessLib "../lib/business";

mixin () {
  public query func getBusinessInfo() : async Common.BusinessInfo {
    BusinessLib.getBusinessInfo();
  };

  public query func getServices() : async [Common.Service] {
    BusinessLib.getServices();
  };

  public query func getTeam() : async [Common.TeamMember] {
    BusinessLib.getTeam();
  };

  public query func getTestimonials() : async [Common.Testimonial] {
    BusinessLib.getTestimonials();
  };

  public query func getGallery() : async [Common.GalleryImage] {
    BusinessLib.getGallery();
  };

  public query func getCatalogueNote() : async Common.CatalogueNote {
    BusinessLib.getCatalogueNote();
  };
};
