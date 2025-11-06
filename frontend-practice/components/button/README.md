# Button Component

Brand button component built from Figma design with all design tokens applied.

## Design Source
- **Figma Path:** `atoms/button/medium/brand/leading/default`
- **Node ID:** `6834:27881`

## Design Tokens Used

All design tokens are localized in `/css/design-tokens.css`:

- **Brand Colors:**
  - Background: `--brand-background-default` (#d2ff66)
  - Text: `--brand-text-default` (#14532d)

- **Typography:**
  - Font Family: `--ff-primary` (DM Sans)
  - Font Weight: `--fw-bold` (700)
  - Font Size: `--fs-body-default` (15px)
  - Line Height: `--lh-md` (24px)
  - Letter Spacing: `--lh-sm` (-0.2px)

- **Spacing:**
  - Gap: `--button-gap` (4px)
  - Padding X: `--button-padding-x` (16px)
  - Padding Y: `--button-padding-y` (8px)

- **Dimensions:**
  - Height: `--button-height-medium` (44px)
  - Border Radius: `--button-border-radius` (24px)
  - Icon Size: `--button-icon-size` (24px)

## Usage

### HTML
```html
<link rel="stylesheet" href="css/design-tokens.css">
<link rel="stylesheet" href="components/button/button.css">

<button 
    class="button button--brand button--medium button--leading-icon" 
    type="button"
    aria-label="Button with icon">
    <div class="button__icon">
        <div class="button__icon-inner">
            <img 
                src="path/to/icon.svg" 
                alt=""
                class="button__icon-img">
        </div>
    </div>
    <span class="button__text">Label</span>
</button>
```

### CSS Classes

- `.button` - Base button class
- `.button--brand` - Brand color variant
- `.button--medium` - Medium size (44px height)
- `.button--leading-icon` - Icon before text
- `.button--trailing-icon` - Icon after text (for future use)

### States

- **Hover:** Button lifts slightly with shadow
- **Active:** Button presses down
- **Focus:** Visible outline for keyboard navigation
- **Disabled:** Reduced opacity, no pointer events

## Font

The component uses **DM Sans** from Google Fonts, which is already loaded in the main `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap" rel="stylesheet">
```

## Accessibility

- Proper `aria-label` for screen readers
- Keyboard navigation support (Tab, Enter, Space)
- Focus visible states
- Reduced motion support for users with motion sensitivities

## File Structure

```
components/
└── button/
    ├── button.html      # Component HTML structure
    ├── button.css      # Component styles
    └── README.md       # This file

css/
└── design-tokens.css   # All design tokens (localized)
```

