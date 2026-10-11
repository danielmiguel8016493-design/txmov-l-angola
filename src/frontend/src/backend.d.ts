import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type AccountId = bigint;
export interface AccountView {
    id: AccountId;
    active: boolean;
    displayName: string;
    createdAt: bigint;
    email: string;
}
export type AuthResult = {
    __kind__: "ok";
    ok: {
        token: string;
        account: AccountView;
    };
} | {
    __kind__: "err";
    err: string;
};
export interface BookingRequest {
    id: bigint;
    service: string;
    contact: string;
    handled: boolean;
    name: string;
    createdAt: Timestamp;
    message: string;
    preferredTime: string;
}
export interface BusinessInfo {
    tagline: string;
    name: string;
    email: string;
    address: string;
    openingHours: Array<DayHours>;
    phone: string;
}
export interface CatalogueNote {
    note: string;
}
export interface Cell {
    value: Value;
    name: string;
}
export interface DayHours {
    hours: string;
    days: string;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface GalleryImage {
    id: bigint;
    url: string;
    caption: string;
}
export type OwnerAuthResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export type Result__1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface Service {
    id: bigint;
    duration: string;
    name: string;
    description: string;
    price: string;
}
export interface TeamMember {
    id: bigint;
    bio: string;
    name: string;
    role: string;
    photo: string;
}
export interface Testimonial {
    id: bigint;
    quote: string;
    author: string;
}
export type Timestamp = bigint;
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    changeOwnerPassword(currentPassword: string, newPassword: string): Promise<OwnerAuthResult>;
    createAccount(email: string, password: string, displayName: string): Promise<AccountView>;
    deleteAccount(id: AccountId): Promise<void>;
    deleteBookingRequest(id: bigint): Promise<void>;
    execute(qJson: string): Promise<Result>;
    getApiDoc(): Promise<string>;
    getBusinessInfo(): Promise<BusinessInfo>;
    getCallerUserRole(): Promise<UserRole>;
    getCatalogueNote(): Promise<CatalogueNote>;
    getGallery(): Promise<Array<GalleryImage>>;
    getServices(): Promise<Array<Service>>;
    getSessionAccount(token: string): Promise<AccountView | null>;
    getTeam(): Promise<Array<TeamMember>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    isCallerAdmin(): Promise<boolean>;
    isOwnerPasswordSet(): Promise<boolean>;
    listAccounts(): Promise<Array<AccountView>>;
    listBookingRequests(): Promise<Array<BookingRequest>>;
    ownerSignIn(password: string): Promise<OwnerAuthResult>;
    schema(): Promise<string>;
    setAccountActive(id: AccountId, active: boolean): Promise<void>;
    setBookingRequestHandled(id: bigint, handled: boolean): Promise<void>;
    setOwnerPassword(password: string): Promise<void>;
    signIn(email: string, password: string): Promise<AuthResult>;
    signOut(token: string): Promise<void>;
    submitBookingRequest(name: string, contact: string, service: string, preferredTime: string, message: string): Promise<bigint>;
}
