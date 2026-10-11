# Design Brief

## Direction

Fundição — a credible industrial-premium identity for TXMOVÉL ANGOLA, cold steel surfaces with a molten-amber signal.

## Tone

Industrial/utilitarian executed with restraint: graphite ink, steel-blue structure, and one hot amber accent for calls to action.

## Differentiation

A "spec sheet" language — mono uppercase labels, engineered grid lines, and steel-blue panels — makes building materials read like precision hardware, not a generic local business.

## Color Palette

| Token      | OKLCH         | Role   |
| ---------- | ------------- | ------ |
| background | 0.965 0.004 250 | cold off-white steel |
| foreground | 0.205 0.014 255 | graphite ink |
| card       | 0.995 0.002 250 | spec plate |
| primary    | 0.44 0.135 245 | steel blue — structure & buttons |
| accent     | 0.74 0.155 68 | molten amber — signal/CTA highlights |
| muted      | 0.915 0.012 235 | cool panel grey |
| border     | 0.875 0.012 240 | engineered hairline |
| destructive | 0.55 0.215 27 | alert |
| success    | 0.58 0.15 148 | stock/validated |
| warning    | 0.8 0.15 82 | caution |

Legacy names retuned: `cream` 0.965 0.004 250, `sand` 0.915 0.012 235, `espresso` 0.205 0.014 255, `cocoa`/`clay` 0.44 0.135 245, `clay-dark` 0.36 0.12 245.

## Typography

- Display: Space Grotesk — hero, section headings, brand wordmark (tight tracking, bold)
- Body: Plus Jakarta Sans — paragraphs, nav, UI labels
- Mono: JetBrains Mono — spec labels, product codes, numeric data
- Scale: hero `text-5xl md:text-7xl font-display font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-display font-bold tracking-tight`, label `spec-label text-muted-foreground`, body `text-base md:text-lg`

## Elevation & Depth

Flat steel base with layered panels; depth comes from `shadow-subtle` on spec cards and `shadow-elevated` on hover, never glow.

## Structural Zones

| Zone    | Background  | Border   | Notes                 |
| ------- | ----------- | -------- | --------------------- |
| Header  | bg-card + backdrop blur | border-b | sticky, steel plate with hairline |
| Content | bg-background | — | alternate bg-muted/40 panels; grid texture on hero |
| Footer  | bg-espresso text-cream | border-t | dark steel slab, mono spec labels |

## Spacing & Rhythm

Generous section gaps (`py-20 md:py-28`), 8px micro-grid, mono labels spaced `tracking-widest`; dense product cards against airy section padding.

## Component Patterns

- Buttons: 6px radius, `bg-primary` solid with amber hover or `bg-accent` for primary CTA; smooth 0.3s transition
- Cards: 10px radius, `bg-card`, `border-border`, `shadow-subtle`; hover lifts to `shadow-elevated`
- Badges: sharp 4px, mono uppercase, `bg-muted` or `bg-accent/15` text-accent-foreground

## Motion

- Entrance: `animate-fade-up` staggered 60–100ms on hero and card grids
- Hover: 0.3s cubic-bezier lift + border color shift to primary
- Decorative: `animate-rivet-pulse` on small accent markers; grid texture static

## Constraints

- Portuguese-language business content only; never reference salon/transport
- Keep `cream`/`sand`/`espresso`/`cocoa`/`clay`/`clay-dark` class names working
- No raw hex/rgb in components; tokens only
- Do not build: medidas descriptions, proforma with logo, footer NIF/bairro

## Signature Detail

Mono "spec sheet" labels paired with engineered grid lines and rivet accents — turns the catalogue into a precision hardware board.
