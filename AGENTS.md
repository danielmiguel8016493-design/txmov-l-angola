# Project Guidance

## User Preferences

- All site copy in Portuguese
- Business is construction materials (not transport or salon)
- Dashboard/menu panel must have a hide/show option
- Settings page must allow setting and changing a password
- Owner must be able to create email+password accounts for other users who can then access the site

## Verified Commands

[Filled after first successful build]

## Learnings

- Owner-created email+password accounts cannot use Internet Identity principals; use a token-based session API (signIn/signOut/getSessionAccount) with the token persisted in localStorage.
- When a mutation grants a backend role but the identity was already set before it ran, the isAuthenticated-keyed invalidateQueries effect never re-fires; invalidate the role query key explicitly in the mutation's success callback.
- useActor creates an anonymous actor when !isAuthenticated; a backend ownerSignIn that rejects anonymous callers is unreachable unless the frontend calls login() first.
- Legacy warm token names (cream/sand/espresso/cocoa/clay) can be retuned to a cold industrial palette in tailwind.config.js and index.css without touching component files.
- caffeineai-oql Entity.toEntity / ArrayEntity.toEntityManual are generic in T and need explicit instantiation; a record with a nested collection field needs ArrayEntity.toEntityManual on a singleton array.
- OQL Entity.Builder defaults to #controllerOnly; .public_() must be removed from any entity carrying private customer data.
- When a migration changes a record field's type (e.g. Int to Nat), the OldActor must keep the old type and the migration must transform the collection with Map.map.
- Time.now() returns Time.Time (Int); a Nat timestamp field needs Time.now().toNat().
- src/mocks/backend.ts must implement every backendInterface member, including __-prefixed state queries and _internet_identity_* methods, or tsc fails.
