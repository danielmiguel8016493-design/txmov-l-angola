mixin () {
  public query func getApiDoc() : async Text {
    "# TXMOVÉL ANGOLA — Backend API\n\n" #
    "## Purpose\n\n" #
    "This canister serves the TXMOVÉL ANGOLA - COMÉRCIO E PRESTAÇÃO DE SERVIÇOS, SU LDA " #
    "construction-materials site. It exposes the business profile, the five products, " #
    "the catalogue note, a quote-request inbox, and an owner-managed email+password " #
    "account system that coexists with Internet Identity authorization. It also exposes " #
    "the OQL query surface (`schema` and `execute`) described below.\n\n" #
    "## Authentication and authorization\n\n" #
    "- Anonymous callers may read the public business data: `getBusinessInfo`, " #
    "`getServices`, `getTeam`, `getTestimonials`, `getGallery`, `getCatalogueNote`, " #
    "and `getApiDoc`.\n" #
    "- `submitBookingRequest` is open to any caller (including anonymous).\n" #
    "- The owner endpoints — `setOwnerPassword`, `changeOwnerPassword`, " #
    "`createAccount`, `listBookingRequests`, `setBookingRequestHandled`, " #
    "`deleteBookingRequest`, `listAccounts`, `setAccountActive`, `deleteAccount` — " #
    "require the caller to be an Internet Identity admin (`AccessControl.isAdmin`). " #
    "A non-admin caller receives an empty result or an `#err` variant; the call does " #
    "not trap.\n" #
    "- `ownerSignIn(password)` is the password alternative to Internet Identity. It " #
    "does not require a pre-existing admin role: a signed (non-anonymous) caller " #
    "that supplies the correct owner password is granted the `#admin` role, so " #
    "`isCallerAdmin` returns true afterwards and the dashboard unlocks. An " #
    "anonymous caller receives `#err` and is never granted a role; a wrong or " #
    "unset password receives `#err`.\n" #
    "- `isOwnerPasswordSet` is a public query.\n" #
    "- The app's frontend pins an Internet Identity derivation origin, published at " #
    "`/.well-known/ii-derivation-origin` when available. An agent already holding the " #
    "user's Internet Identity authorization derives the correct per-app principal " #
    "against that origin (for example `icp identity link web <name> --app <host>`). " #
    "Such a delegation acts with the user's full authority in this app until it " #
    "expires.\n" #
    "- Registration is a prerequisite for the admin gate. The first caller to invoke " #
    "`_initialize_access_control` (provided by the authorization mixin) becomes the " #
    "admin; later callers receive a non-admin role. A caller that never registered " #
    "through the app's frontend is unregistered even if it belongs to the app's owner, " #
    "and a signed-in caller derived against a different origin is a different " #
    "principal than the one the frontend registered. Unregistered or anonymous " #
    "callers receive empty results or `#err` from guarded endpoints.\n\n" #
    "## OQL query surface\n\n" #
    "- `schema()` — a `query` returning a JSON schema document. It lists only the " #
    "entities the caller may read; edges to denied entities are hidden.\n" #
    "- `execute(qJson)` — a `query` taking a JSON query string and returning a typed " #
    "Candid result. An invalid query traps with `OQL: invalid query — <reason>`.\n" #
    "- Per-entity authorization: `businessInfo`, `service`, `catalogueNote`, " #
    "`teamMember`, `testimonial`, and `galleryImage` are `#public_` (any caller, " #
    "including anonymous, reads every row). `bookingRequest` is `#controllerOnly` " #
    "(only the platform controller reads it), so customer names, contacts, and " #
    "messages are never exposed to anonymous OQL queries. `account` is " #
    "`#controllerOnly` (only the platform controller reads it) and hides " #
    "`passwordHash` from the schema and default projection.\n" #
    "- `businessInfo.openingHours` is flattened to a single Text column " #
    "(`\"<days>: <hours>\"` joined with `\"; \"`).\n\n" #
    "## Owner-created accounts (token sessions)\n\n" #
    "Owner-created email+password accounts are not Internet Identity principals, so " #
    "they reach the site through a bearer token:\n\n" #
    "- `createAccount(email, password, displayName)` — admin only. Returns an " #
    "`AccountView` (or an empty view for a non-admin).\n" #
    "- `signIn(email, password)` — returns `#ok({ token; account })` or `#err(Text)`. " #
    "The token is the session credential; the frontend must store it and send it to " #
    "`getSessionAccount`.\n" #
    "- `getSessionAccount(token)` — returns `?AccountView`; `null` means the token is " #
    "unknown or the account was deleted.\n" #
    "- `signOut(token)` — removes the session. Safe to call repeatedly.\n" #
    "- `listAccounts`, `setAccountActive`, `deleteAccount` — admin only.\n\n" #
    "## Units and encodings\n\n" #
    "- `createdAt` is a `Nat` nanosecond timestamp from `Time.now()`.\n" #
    "- `id` values are `Nat`; request and account ids are assigned sequentially.\n" #
    "- `passwordHash` is never returned; `AccountView` omits it and the OQL `account` " #
    "entity hides it.\n" #
    "- `AuthResult` is `{ #ok : { token : Text; account : AccountView }; #err : Text }`.\n" #
    "- `OwnerAuthResult` is `{ #ok : Text; #err : Text }`.\n\n" #
    "## Lifecycle and polling\n\n" #
    "- `submitBookingRequest` returns the new request id immediately; the request is " #
    "stored with `handled = false`.\n" #
    "- The owner polls `listBookingRequests` and marks items with " #
    "`setBookingRequestHandled(id, true)`.\n" #
    "- `isOwnerPasswordSet` reports whether an owner password exists; `setOwnerPassword` " #
    "is a no-op once one is set, so it is safe to call only for initial setup.\n\n" #
    "## Mutation retry safety\n\n" #
    "- `submitBookingRequest` is not idempotent: each call creates a new request with a " #
    "new id.\n" #
    "- `setBookingRequestHandled` and `setAccountActive` are idempotent.\n" #
    "- `deleteBookingRequest` and `deleteAccount` are destructive; a repeated call is a " #
    "no-op.\n" #
    "- `signIn` creates a new session token on each call; `signOut` removes one token.\n\n" #
    "## Errors and gotchas\n\n" #
    "- Guarded endpoints do not trap for non-admins; they return empty or `#err`.\n" #
    "- `changeOwnerPassword` requires the current password and returns `#err` when it is " #
    "wrong or unset.\n" #
    "- `signIn` returns `#err` for an unknown email, a wrong password, or an inactive " #
    "account.\n" #
    "- `getSessionAccount` returns `null` for an unknown token; it never traps.\n" #
    "- `execute` traps on malformed JSON; `schema` never traps.\n";
  };
};
