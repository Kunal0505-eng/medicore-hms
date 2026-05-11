# Design Brief — Hospital Management System

## Tone & Purpose
Refined utilitarian medical interface. Deep navy conveys professional authority, teal guides critical actions, red signals life-safety alerts. Dark-mode-first for extended clinical use. Zero decoration, maximum clarity.

## Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|----------|
| **Primary** | `0.32 0.06 270` (Navy) | `0.72 0.12 200` (Bright Teal) | Medical authority, trust, CTA buttons |
| **Accent** | `0.62 0.18 200` (Teal) | `0.72 0.18 200` (Bright Teal) | Actionable items, highlights, focus states |
| **Destructive** | `0.57 0.20 25` (Red) | `0.65 0.18 25` (Bright Red) | Critical alerts, dangerous actions |
| **Success** | `0.60 0.18 145` (Green) | `0.65 0.18 145` (Bright Green) | Resolution, positive outcomes |
| **Warning** | `0.74 0.15 85` (Amber) | `0.70 0.14 85` (Bright Amber) | Caution, review needed |
| **Background** | `0.97 0.01 270` (Off-white) | `0.12 0.01 270` (Near-black) | Main canvas |
| **Foreground** | `0.25 0.02 270` (Navy) | `0.95 0.01 270` (Near-white) | Text |
| **Sidebar** | `0.15 0.02 270` (Deep Navy) | `0.12 0.01 270` (Near-black) | Navigation panel |
| **Card** | `0.99 0 0` (White) | `0.16 0.01 270` (Dark) | Content containers |

## Typography
- **Display & Body**: GeneralSans (clean sans-serif, clinical precision)
- **Monospace**: GeistMono (dosage displays, codes, timestamps)
- **Scale**: 12px (label), 14px (body), 16px (heading), 20px (section title), 28px (page title)

## Structural Zones

| Zone | Treatment | OKLCH |
|------|-----------|-------|
| **Header** | Navy bar, white text, dark mode toggle, user menu | `0.15 0.02 270` bg, `0.95 0.01 270` text |
| **Sidebar** | Deep navy, 14 collapsible module groups, teal active highlight | `0.15 0.02 270` bg, teal accent `0.62 0.18 200` |
| **Main Content** | Light background, white cards, alternating subtle muted layers | `0.97 0.01 270` bg |
| **Data Tables** | White rows with navy text, teal hover states, sort/filter controls | `0.99 0 0` bg, `0.62 0.18 200` accent |
| **Modals** | Semi-transparent dark overlay, elevated dark card | `0.20 0.01 270 / 0.5` overlay |
| **Alerts/Toasts** | Color-coded (green, red, amber, blue), dismissible | Dynamic per type |

## Component Patterns
- **Buttons**: Primary (navy), Secondary (muted), Destructive (red), Success (green), outlined variants
- **Forms**: Labeled inputs, validation states (error red, success green), required asterisks
- **Tables**: Sticky header, sortable columns, checkboxes, pagination (5/10/25/50 per page)
- **Cards**: Light background, subtle shadow, border-bottom divider on hover
- **Modals**: Centered, 90vw/600px max-width, overlay dismissal disabled
- **Tooltips**: Dark background, white text, 200ms delay
- **Loading**: Skeleton screens (4 row placeholders), pulse animation

## Motion & Interactions
- **Transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` for color/opacity changes
- **Accordion**: `0.2s ease-out` open/close
- **Focus**: Teal ring (4px offset) on keyboard navigation
- **Hover**: Teal overlay 10%, slight shadow lift
- **Active**: Navy background, white text on sidebar items

## Constraints
- No gradients, no glow effects, no decorative animations
- High contrast: AA+ on all text/background combos
- Minimum touch target: 44px × 44px
- Dark mode preferred for clinical readiness (light mode for patient-facing views)
- All data tables sortable, filterable, paginated (5/10/25/50 rows)
- Recharts with healthcare-appropriate colors (chart-1 through chart-5)

## Signature Detail
**Teal highlight system**: Every interactive element (buttons, links, active rows, focus states) uses the same teal accent `0.62 0.18 200`. This creates a unified clinical interface where action destinations are immediately obvious. Combined with deep navy, creates a medical authority aesthetic distinct from generic SaaS blue.

## Differentiation
Dark-mode-first medical UI. Not a generic admin panel. Every zone intentionally styled: deep navy sidebar with teal highlights, light content area for readability, color-coded alerts for life-safety signals. Refined utilitarian tone—competence, clarity, empathy—no decoration.
