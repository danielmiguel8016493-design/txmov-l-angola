import Common "../types/common";

module {
  public func getBusinessInfo() : Common.BusinessInfo {
    {
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
  };

  public func getServices() : [Common.Service] {
    [
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
  };

  public func getTeam() : [Common.TeamMember] {
    [];
  };

  public func getTestimonials() : [Common.Testimonial] {
    [];
  };

  public func getGallery() : [Common.GalleryImage] {
    [];
  };

  public func getCatalogueNote() : Common.CatalogueNote {
    { note = "Vendemos a grosso e a retalho." };
  };
};
