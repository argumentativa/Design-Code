# Badge Components

Badge components built with design tokens, gradients, and icons from the SVG library.

## Features

- **Multiple Sizes**: Small (16px), Large (24px)
- **Types**: Superfan, Contributor, Creator/Tastemaker
- **Gradients**: Creator badges use orange-to-yellow gradient
- **Icons**: Uses icons from `assets/icons/`
- **Design Tokens**: All sizes and styles use design tokens

## Usage

### Superfan Badge

```html
<link rel="stylesheet" href="components/badge/badge.css">

<!-- Small -->
<div class="badge badge--small badge--superfan">
    <img src="assets/icons/16/awards/face-grin-hearts.svg" alt="Superfan" class="badge__icon" width="16" height="16">
    <span class="badge__text">Superfan</span>
</div>

<!-- Large -->
<div class="badge badge--large badge--superfan">
    <img src="assets/icons/24/awards/face-grin-hearts.svg" alt="Superfan" class="badge__icon" width="24" height="24">
    <span class="badge__text">Superfan</span>
</div>
```

### Contributor Badge

```html
<!-- Small -->
<div class="badge badge--small badge--contributor">
    <img src="assets/icons/16/awards/hand-holding-heart.svg" alt="Contributor" class="badge__icon" width="16" height="16">
    <span class="badge__text">Contributor</span>
</div>

<!-- Large -->
<div class="badge badge--large badge--contributor">
    <img src="assets/icons/24/awards/hand-holding-heart.svg" alt="Contributor" class="badge__icon" width="24" height="24">
    <span class="badge__text">Contributor</span>
</div>
```

### Creator/Tastemaker Badge (with Gradient)

```html
<!-- Small -->
<div class="badge badge--small badge--creator">
    <img src="assets/icons/16/awards/crown.svg" alt="Tastemaker" class="badge__icon" width="16" height="16">
    <span class="badge__text">Tastemaker</span>
</div>

<!-- Large -->
<div class="badge badge--large badge--creator">
    <img src="assets/icons/24/awards/crown.svg" alt="Tastemaker" class="badge__icon" width="24" height="24">
    <span class="badge__text">Tastemaker</span>
</div>
```

## Size Classes

- `.badge--small` - Small (16px height)
- `.badge--large` - Large (24px height)

## Type Classes

- `.badge--superfan` - Superfan badge (pink-to-purple gradient)
- `.badge--contributor` - Contributor badge (green-to-blue gradient)
- `.badge--creator` - Creator/Tastemaker badge (orange-to-yellow gradient)

## Design Tokens Used

All badge sizes and styles use tokens from `css/design-tokens.css`:

### Badge Sizes
- `--badge-height-small`: 16px
- `--badge-height-large`: 24px

### Badge Spacing
- `--badge-padding-x-small`: 8px
- `--badge-padding-x-large`: 8px
- `--badge-gap-small`: 2px
- `--badge-gap-large`: 4px

### Badge Border Radius
- `--badge-border-radius-small`: 6px
- `--badge-border-radius-large`: 8px

### Badge Typography
Uses specific typography tokens from the design system:

**Small Badges:**
- Uses `--text-label-sm-bold` token set
- Font: `var(--text-label-sm-bold)` (DM Sans)
- Size: `var(--text-label-sm-bold-size)` (10px)
- Weight: `var(--text-label-sm-bold-weight)` (700)
- Line Height: `var(--text-label-sm-bold-line-height)` (20px)
- Letter Spacing: `var(--ls-md)` (-0.1px)

**Large Badges:**
- Uses `--text-label-md-bold` token set
- Font: `var(--text-label-md-bold)` (DM Sans)
- Size: `var(--text-label-md-bold-size)` (12px)
- Weight: `var(--text-label-md-bold-weight)` (700)
- Line Height: `var(--text-label-md-bold-line-height)` (20px)
- Letter Spacing: `var(--ls-md)` (-0.1px)

### Badge Gradients

All badges use gradients from design tokens:

- `--badge-gradient-superfan`: linear-gradient(103.08deg, rgba(249, 168, 212, 0.5) 5.22%, rgba(196, 181, 253, 0.5) 97.23%)
  - Uses `--pink-300` (#f9a8d4) and `--purple-200` (#c4b5fd) colors

- `--badge-gradient-contributor`: linear-gradient(103.08deg, rgba(34, 197, 94, 0.5) 5.22%, rgba(147, 197, 253, 0.5) 97.23%)
  - Uses `--green-400` (#22c55e) and `--blue-300` (#93c5fd) colors

- `--badge-gradient-creator`: linear-gradient(103.08deg, rgba(236, 136, 117, 0.5) 5.22%, rgba(255, 197, 14, 0.5) 97.23%)
  - Uses `--orange-300` (#ec8875) and `--yellow-500` (#ffc50e) colors

### Colors
All badge elements use semantic color tokens:

**Text:**
- `--text-color-primary`: Used for badge text color (references `--neutral-900` = #242526)

**Icons:**
- `--color-icon-black`: Used for badge icon color (references `--neutral-900` = #242526)

**Gradient Colors (from primitive palette):**
- `--pink-300`: Superfan gradient start (#f9a8d4)
- `--purple-200`: Superfan gradient end (#c4b5fd)
- `--green-400`: Contributor gradient start (#22c55e)
- `--blue-300`: Contributor gradient end (#93c5fd)
- `--orange-300`: Creator gradient start (#ec8875)
- `--yellow-500`: Creator gradient end (#ffc50e)

## Icons Used

All icons come from `assets/icons/`:
- **Superfan**: `face-grin-hearts` (16px/24px)
- **Contributor**: `hand-holding-heart` (16px/24px)
- **Creator/Tastemaker**: `crown` (16px/24px)

## Examples

See `badge.html` for a complete demo of all badge variants.

