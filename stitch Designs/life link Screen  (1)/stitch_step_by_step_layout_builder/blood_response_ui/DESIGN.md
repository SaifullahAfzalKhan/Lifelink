---
name: Blood Response UI
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#5b403d'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#8f6f6c'
  outline-variant: '#e4beba'
  surface-tint: '#ba1a20'
  primary: '#af101a'
  on-primary: '#ffffff'
  primary-container: '#d32f2f'
  on-primary-container: '#fff2f0'
  inverse-primary: '#ffb3ac'
  secondary: '#6e595a'
  on-secondary: '#ffffff'
  secondary-container: '#f8dcdc'
  on-secondary-container: '#745f60'
  tertiary: '#006444'
  on-tertiary: '#ffffff'
  tertiary-container: '#008058'
  on-tertiary-container: '#d3ffe5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb3ac'
  on-primary-fixed: '#410003'
  on-primary-fixed-variant: '#930010'
  secondary-fixed: '#f8dcdc'
  secondary-fixed-dim: '#dbc0c0'
  on-secondary-fixed: '#261818'
  on-secondary-fixed-variant: '#554243'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '800'
    lineHeight: 4rem
    letterSpacing: -0.02em
  display-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-blood-group:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '800'
    lineHeight: 2rem
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  margin-mobile: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  max-width-content: 80rem
---

## Brand & Style

This design system delivers an authoritative, highly accessible clinical emergency interface designed for critical, high-stress scenarios. It serves medical coordinators, donors, volunteers, and patients seeking urgent blood supplies. The emotional tone balances urgency and immediate call-to-action with deep institutional calm, clarity, and precision.

The design movement merges Modern Clinical Utility with Humanist Healthcare Minimalism:
- **Immediate Legibility:** Split-second visual scanning eliminates cognitive load under pressure.
- **Calm Authority:** Clean light neutral backdrops prevent visual panic while keeping primary emergency actions unmistakable.
- **Structural Integrity:** Crisp container lines and systematic hierarchy replace decorative trends with pure utilitarian purpose.

## Colors

The palette is tuned specifically for high-contrast accessibility (WCAG AAA for critical indicators) and quick visual parsing:

- **Primary Brand & Emergency Action (`#D32F2F`):** Used exclusively for high-priority CTA buttons, emergency broadcast indicators, critical shortage tags, and active lifeline elements.
- **Secondary Surface Accent (`#FEE2E2`):** Used for emergency card highlights, urgent badge backgrounds, and blood group pill fills to provide warm contrast without causing alarm fatigue.
- **Tertiary Status (`#10B981`):** Verified donor status, matched units, and successful transit dispatch.
- **Warning Status (`#F59E0B`):** Pending verifications, expiring reserves, and transit delays.
- **Neutral Foreground (`#0F172A` / `#1E293B`):** Deep Navy replaces standard black for headlines and critical body text, providing high contrast without clinical harshness.
- **Neutral Muted (`#64748B` / `#94A3B8`):** Supporting metadata, secondary labels, timestamps, and resting borders.
- **Background Foundations (`#F8FAFC` / `#FFFFFF`):** Crisp white application cards resting on subtle slate-tinted canvas backgrounds.

## Typography

Typography balances urgency with institutional trust. Plus Jakarta Sans provides friendly, authoritative, and legible headlines that feel human rather than intimidating. Inter handles dense transactional tables, data streams, operational logs, and medical disclosures with neutral, high-density legibility.

- **Blood Group Typography:** Dedicated `label-blood-group` token ensures blood types (e.g., O-, AB+) remain uncompromised at any distance or scanning angle.
- **Tabular Numerics:** All clinical data, countdown timers, and unit quantities must implement `font-variant-numeric: tabular-nums` to maintain vertical alignment during live status updates.

## Layout & Spacing

The layout is built on a 12-column responsive fluid grid with strict content constraints to maintain focus:

- **Mobile (< 768px):** 4-column layout, `16px` margins and gutters. Bottom navigation sheets and fixed bottom CTA bars ensure single-thumb reachability for emergency actions.
- **Tablet (768px - 1024px):** 8-column layout, `32px` margins and `24px` gutters. Split screen for map view and live patient requests.
- **Desktop (> 1024px):** 12-column layout with a maximum container boundary of `1280px` (`80rem`), centered with `48px` page margins and `24px` column gutters.

Spacing follows an 8pt spatial cadence (with 4pt half-steps for micro-alignments like badges and icons). Generous internal card padding (`space-lg`) prevents dense medical information from feeling suffocating.

## Elevation & Depth

This system avoids heavy, atmospheric shadows to maintain medical cleanliness and visual precision. Hierarchy relies on soft structural surfaces and crisp low-contrast borders:

- **Surface Neutral (Ground):** `#F8FAFC` base application plane.
- **Surface Elevated (Card / Panel):** Pure `#FFFFFF` container with a default border `1px solid #E2E8F0`.
- **Level 1 (Resting Cards & Inputs):** `box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05)`.
- **Level 2 (Hover States & Active Units):** `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Level 3 (Emergency Modals & Critical Drawers):** `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.
- **Emergency Halo Focus:** Critical interactive nodes use a distinct dual-ring focus: `box-shadow: 0 0 0 3px #FEE2E2, 0 0 0 1px #D32F2F`.

## Shapes

The interface embraces a roundedness level of `2` (medium-rounded: base `0.5rem` / `8px`, containers `1rem` / `16px`, large action hubs `1.5rem` / `24px`). 

- Standard inputs, buttons, and control elements use `0.5rem` (8px).
- Patient cards, emergency request modules, and donor dossiers use `1rem` (16px) with matching `1px` soft borders.
- Badges, blood group tokens, and filter tags use full pills (`9999px`) to distinguish categorical items from actionable square containers.

## Components

### Buttons
- **Emergency Primary:** Background `#D32F2F`, text `#FFFFFF`, radius `8px`, font `label-lg`. Hover: `#B71C1C`. Active: scales down `0.98`. Focus ring: `#FEE2E2`.
- **Secondary Clinical:** Background `#F8FAFC`, border `1px solid #CBD5E1`, text `#0F172A`. Hover: `#F1F5F9`.
- **Destructive / Reject:** Ghost button with `#D32F2F` text and transparent background, turning `#FEE2E2` on hover.

### Blood Group Identifier Chips
- Compact badges with soft red backgrounds (`#FEE2E2`), deep red text (`#991B1B`), rounded `9999px`, housing bold blood type denominations (e.g., `A+`, `O-`). Critical deficiency state pulses an outer stroke ring in `#D32F2F`.

### Patient & Emergency Cards
- Canvas: Pure white (`#FFFFFF`), `16px` border-radius, `1px solid #E2E8F0` border.
- Critical Header: Left-aligned 4px vertical accent indicator (Medical Red `#D32F2F` for immediate, Amber `#F59E0B` for scheduled).
- Padding: `24px` internal padding with clear metadata split (Hospital, Required Blood Units, Contact, Time Remaining).

### Form Inputs & Selects
- Height: `44px` minimum touch target.
- Base: Background `#FFFFFF`, border `1px solid #CBD5E1`, radius `8px`, text `#0F172A`, placeholder `#94A3B8`.
- Focus: Border color `#D32F2F` with a `3px` halo in `#FEE2E2`.

### Checkboxes & Radios
- Size: `20px x 20px`, radius `4px` (checkbox) or `9999px` (radio).
- State: Selected state filled with `#D32F2F` featuring an institutional white checkmark. Inactive state: `1.5px solid #94A3B8`.

### Status Indicators & Triage Badges
- **Verified Donor:** Pill badge with `#10B981` background at 10% opacity, border `#A7F3D0`, text `#065F46` with check icon.
- **Pending/Review:** Pill badge with `#F59E0B` background at 10% opacity, border `#FDE68A`, text `#92400E`.
- **Critical Alert Banner:** Edge-to-edge or floating container with `#FFF1F2` background, `#D32F2F` border, and high-visibility typography for urgent broadcast dispatches.