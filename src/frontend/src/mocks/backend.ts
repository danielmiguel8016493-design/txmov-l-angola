import type {
  AccountView,
  AuthResult,
  BookingRequest,
  BusinessInfo,
  CatalogueNote,
  GalleryImage,
  OwnerAuthResult,
  Service,
  TeamMember,
  Testimonial,
  UserRole,
  backendInterface,
} from "../backend";

const businessInfo: BusinessInfo = {
  name: "TXMOVÉL ANGOLA - COMÉRCIO E PRESTAÇÃO DE SERVIÇOS, SU LDA",
  tagline: "Construir Angola, com qualidade e resistência.",
  phone: "+244 923 000 000",
  email: "geral@txmovel.ao",
  address: "Luanda, Angola",
  openingHours: [
    { days: "Segunda - Sexta", hours: "08:00 - 17:00" },
    { days: "Sábado", hours: "08:00 - 13:00" },
    { days: "Domingo", hours: "Fechado" },
  ],
};

const services: Service[] = [
  {
    id: 0n,
    name: "Postes de Iluminação Pública",
    description: "Metálicos e em betão, galvanizados.",
    price: "Sob consulta",
    duration: "Entrega em 24h",
  },
  {
    id: 1n,
    name: "Chapas Caneladas",
    description: "Zincadas e lacadas, várias medidas.",
    price: "Sob consulta",
    duration: "Entrega em 24h",
  },
  {
    id: 2n,
    name: "Varões de Aço",
    description: "A400 e A500, 6mm a 32mm.",
    price: "Sob consulta",
    duration: "Entrega em 24h",
  },
  {
    id: 3n,
    name: "Perfis Metálicos",
    description: "IPE, UPN, HEA, tubos quadrados e rectangulares.",
    price: "Sob consulta",
    duration: "Entrega em 24h",
  },
  {
    id: 4n,
    name: "Acessórios",
    description: "Arames, pregos, chapas de zinco, cantoneiras.",
    price: "Sob consulta",
    duration: "Entrega em 24h",
  },
];

const catalogueNote: CatalogueNote = {
  note: "Vendemos a grosso e a retalho.",
};

const team: TeamMember[] = [];
const testimonials: Testimonial[] = [];
const gallery: GalleryImage[] = [];
const bookingRequests: BookingRequest[] = [];
const accounts: AccountView[] = [];

export const mockBackend: backendInterface = {
  __accessControlState: async () => ({}),
  __accountsState: async () => ({}),
  __bookingRequests: async () => ({}),
  __businessInfo: async () => businessInfo,
  __catalogueNote: async () => catalogueNote,
  __gallery: async () => gallery,
  __requestState: async () => ({}),
  __services: async () => services,
  __team: async () => team,
  __testimonials: async () => testimonials,
  _initialize_access_control: async () => undefined,
  _internet_identity_sign_in_finish: async () => ({
    __kind__: "err",
    err: { __kind__: "NoAttributes", NoAttributes: null },
  }),
  _internet_identity_sign_in_start: async () => new Uint8Array(),
  assignCallerUserRole: async () => undefined,
  changeOwnerPassword: async (): Promise<OwnerAuthResult> => ({
    __kind__: "err",
    err: "Mock: not available",
  }),
  createAccount: async (email, _password, displayName): Promise<AccountView> => ({
    id: 1n,
    active: true,
    displayName,
    createdAt: BigInt(Date.now()),
    email,
  }),
  deleteAccount: async () => undefined,
  deleteBookingRequest: async () => undefined,
  execute: async () => ({ hasMore: false, rows: [] }),
  getApiDoc: async () => "",
  getBusinessInfo: async () => businessInfo,
  getCallerUserRole: async (): Promise<UserRole> => "guest" as UserRole,
  getCatalogueNote: async () => catalogueNote,
  getGallery: async () => gallery,
  getServices: async () => services,
  getSessionAccount: async () => null,
  getTeam: async () => team,
  getTestimonials: async () => testimonials,
  isCallerAdmin: async () => false,
  isOwnerPasswordSet: async () => false,
  listAccounts: async () => accounts,
  listBookingRequests: async () => bookingRequests,
  ownerSignIn: async (): Promise<OwnerAuthResult> => ({
    __kind__: "err",
    err: "Mock: not available",
  }),
  schema: async () => "",
  setAccountActive: async () => undefined,
  setBookingRequestHandled: async () => undefined,
  setOwnerPassword: async () => undefined,
  signIn: async (): Promise<AuthResult> => ({
    __kind__: "err",
    err: "Mock: not available",
  }),
  signOut: async () => undefined,
  submitBookingRequest: async () => 1n,
};
