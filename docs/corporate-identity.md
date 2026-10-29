# ScamScan Corporate Identity

The visual language of scamscan.net. Values are the source of truth in `app/globals.css` (tokens) and the CSS modules.

## Brand character

Trustworthy, technical, calm. Mostly white space with dark "night" bands, one strong purple accent, and a violet-to-purple gradient for highlights. No rounded "bubbly" UI: corners stay small (2–8 px).

## Logo

| File | Size | Use |
|---|---|---|
| `public/images/logo.png` | 72 × 48 | Landing header (dark logo on light) |
| `public/images/logo-sidebar.png` | 72 × 48 | App sidebar (light logo on dark) |
| `public/images/logo-footer.png` | 102 × 68 | Landing footer (light logo on dark) |

Always show the logo at its native size, never stretched or recolored.

## Colors

### Brand

| Token | Hex | Use |
|---|---|---|
| `--purple` | `#6023FA` | Primary accent: buttons, links, active states, focus borders |
| `--violet` | `#D939DE` | Gradient start only |
| `--purple-pressed` | `#421BA3` | Button `:active` |
| `--purple-dark` | `#1F0D4C` | Gradient end of dark bands |
| `--purple-dark-2` | `#27115E` | Gradient end of dark bands |
| `--black` | `#070411` | App sidebar, dark bands |

### Neutrals

| Token | Hex | Use |
|---|---|---|
| `--text-black` | `#090A0B` | Headlines |
| `--text-grey` | `#344054` | Body text |
| `--text-grey-light` | `#B8B8B8` | Placeholders, dates, inactive anchors |
| `--grey-info` | `#818181` | Meta info (e.g. "Last Update") |
| `--grey-light` | `#D9D9D9` | Input borders, inactive carousel dots |
| `--grey-background` | `#F6F6F8` | App page background |
| — | `#F5F5F5` / `#F9FAFB` | Table borders / table and card headers |
| `--error` | `#F04438` | Validation errors |

### Status

| Meaning | Text / icon | Background |
|---|---|---|
| Safe / low risk | `#067647` | `#ECFDF3` |
| Moderate risk | `#DF9300` | `#FFFBF1` |
| Scam / high risk | `#B42318` | `#FEF3F2` |
| Unclassified | `#344054` | `#F5F5F5` |

### Gradients

- **Highlight text** (hero "Scam Check"): `linear-gradient(to left, #D939DE, #6023FA)` clipped to text.
- **Dark band** (report banner, footer, tools box): `linear-gradient(89deg, #1F0D4C 0.16%, #070410 15.46%, #070411 77.6%, #27115E 99.28%)`.
- **Accent line** (metric borders): `linear-gradient(180deg, #D939DE, #6023FA)`.
- **Shield icons** (modal success/warning): `#D939DE` → `#6321E8`, top to bottom.

## Typography

Typeface: **THICCCBOI** (`app/fonts/`), self-hosted. Each weight is its own family: `--font-regular`, `--font-medium`, `--font-semibold`, `--font-bold`. Fallback: `sans-serif`.

| Role | Family | Desktop | Mobile |
|---|---|---|---|
| Hero (H1) | Bold, weight 800 | 60 / 72 px | 30 / 42 px |
| Section title | Bold, weight 700 | 48 / 56 px | 28 / 38 px (38 / 48 from 720 px) |
| App page title | Bold | 28 / 32 px | as section title |
| Subtitle | Regular | 20 / 28 px | 16 / 24 px |
| Body | Regular | 16 / 24 px | 14–16 px |
| Table / small text | Regular or SemiBold (headers) | 14 / 17 px | same |
| Meta / footer | Regular | 12 / 14 px | same |
| Navigation | Medium | 16 / 24 px | same |

Headings sit on white in `--text-black`, on dark bands in white.

## Components

- **Buttons**: 48 px max height, padding `12px 24px`, radius `0 2px 2px 0`, 16 px Regular at weight 500.
  - *Contained*: purple background, white text.
  - *Outlined*: 1 px purple border, purple text, transparent.
  - *White outlined*: 1 px white border on dark bands.
- **Inputs**: 1 px `#D9D9D9` border, radius 2 px, 12 px padding. Focus: purple border plus `0 0 0 2px rgba(96, 35, 250, 0.2)` ring. Error: `--error` border.
- **Search bar**: input joined to a "Check now" button (60 / 50 / 40 px tall on desktop / tablet / mobile).
- **Cards and tables**: white, 1 px `#F5F5F5` border, radius 4 px, shadow `0 2px 12px rgba(101, 101, 101, 0.03)`, header row `#F9FAFB` with 14 px SemiBold.
- **App panels**: white, radius 4 px, 32 px padding, shadow `0 8px 16px rgba(112, 115, 119, 0.12)`.
- **Overlays**: dark translucent background with `backdrop-filter: blur(4px)`.
- **Motion**: transitions `.3s ease`; elements fade in (opacity keyframes); mobile drawers slide in from the left in .3 s.

## Icons

Thin-line 24 px icons (`components/icons.tsx`): purple for actions, `#B8B8B8` for inactive navigation, white on dark backgrounds.

## Layout

- Breakpoints: 540, 720, 960 (main desktop switch), 1440 px.
- Landing page: 80 px side padding on desktop, 24 px on mobile; generous vertical rhythm (200 px between landing sections on desktop, 48 px on mobile).
- App: 216 px dark sidebar, light grey content area. Below 960 px the sidebar becomes a slide-in drawer.
