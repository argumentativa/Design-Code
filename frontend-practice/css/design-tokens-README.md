# Design Tokens - Complete Reference

All design tokens extracted from Figma: **CDS - Variables - Tokens**
Source: https://www.figma.com/design/Xv6bifymc8uiAkri28DvZM/CDS---Variables---Tokens?node-id=7-278

## 📁 File Location
`css/design-tokens.css`

## 🎨 Token Categories

### Typography

#### Font Families
- `--ff-primary`: DM Sans (primary font)
- `--ff-system`: Roboto Mono (system/monospace font)

#### Font Weights
- `--fw-regular`: 400
- `--fw-medium`: 500
- `--fw-bold`: 700

#### Font Sizes
- `--fs-display`: 32px
- `--fs-h1`: 24px
- `--fs-h2`: 18px
- `--fs-body-default`: 15px
- `--fs-label-lg`: 14px
- `--fs-label-md`: 12px
- `--fs-label-sm`: 10px

#### Line Heights
- `--lh-xl`: 42px
- `--lh-lg`: 28px
- `--lh-md`: 24px
- `--lh-xs`: 16px

#### Letter Spacing
- `--ls-sm`: -0.2px
- `--ls-md`: -0.1px

### Text Styles (Complete Font Definitions)

#### Display
- `.text-display` - Bold 32px/42px

#### Headings
- `.text-h1-regular` - Regular 24px/28px
- `.text-h1-bold` - Bold 24px/28px
- `.text-h2-regular` - Regular 18px/24px
- `.text-h2-bold` - Bold 18px/24px

#### Body Text
- `.text-body-regular` - Regular 15px/24px
- `.text-body-bold` - Bold 15px/24px

#### Labels
- `.text-label-lg` - Regular 14px/20px
- `.text-label-lg-bold` - Bold 14px/20px
- `.text-label-md` - Medium 12px/20px
- `.text-label-md-bold` - Bold 12px/20px
- `.text-label-sm` - Medium 10px/16px
- `.text-label-sm-bold` - Bold 10px/20px

#### System Fonts (Roboto Mono)
- `.text-system-header` - Bold 52px/100%
- `.text-system-title` - Bold 32px/100%
- `.text-system-subtitle` - Bold 24px/36px
- `.text-system-small` - Bold 14px/100%
- `.text-system-tiny` - Bold 12px/100%

### Colors

#### Primitive Colors (Base Palette)
All semantic tokens reference these primitive colors.

**Neutral Scale:**
- `--neutral-black` through `--neutral-white` (black, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 50, 30, 20, 10, white)

**Color Scales (50-900):**
- `--pink-50` through `--pink-900`
- `--red-50` through `--red-900`
- `--orange-50` through `--orange-900`
- `--yellow-50` through `--yellow-900`
- `--green-50` through `--green-900`
- `--blue-50` through `--blue-900`
- `--purple-50` through `--purple-900`

**Brand Primitive Colors:**
- `--brand-raptive-primary-blue`: #6b65ff
- `--brand-secondary-orange`: #ff7858
- `--brand-tertiary-yellow-brand-500`: #d2ff66
- `--brand-quarternary-pink`: #ecb5d2
- `--brand-light-gray`: #f0edeb
- `--brand-warm-gray`: #e1dad4
- Plus accent and data visualization colors

#### Semantic Tokens (Reference Primitives)
- `--text-color-primary`: references `--neutral-900`
- `--text-color-inverse`: references `--neutral-white`
- `--text-color-secondary`: references `--neutral-700`
- `--text-color-tertiary`: references `--neutral-500`
- `--text-color-disabled`: references `--neutral-50`
- `--text-color-placeholder`: references `--neutral-300`
- `--text-color-link-raptive-primary`: references `--brand-raptive-primary-blue`
- `--text-color-link-community-primary`: #dd543a

#### Brand Colors
- `--brand-background-default`: #d2ff66
- `--brand-text-default`: #14532d
- `--brand-warm-gray`: #e1dad4

#### Neutral Colors
- `--neutral-20`: #f8f8f8
- `--color-grey-light-grey`: #8f9295

### Spacing Scale
- `--space-xxxs`: 2px
- `--space-xxs`: 4px
- `--space-xs`: 8px
- `--space-sm`: 12px
- `--space-s`: 16px
- `--space-md`: 24px
- `--space-lg`: 32px
- `--space-xl`: 48px
- `--space-xxl`: 64px
- `--space-xxxxl`: 128px

### Border Radius
- `--border-radius-sm`: 4px
- `--border-radius-md`: 8px
- `--border-radius-lg`: 16px
- `--border-radius-xl`: 24px

### Component Tokens

#### Button
- `--button-height-medium`: 44px
- `--button-padding-x`: 16px (uses `--space-s`)
- `--button-padding-y`: 8px (uses `--space-xs`)
- `--button-gap`: 4px (uses `--space-xxs`)
- `--button-border-radius`: 24px (uses `--border-radius-xl`)
- `--button-icon-size`: 24px

## 📝 Usage Examples

### Using Individual Tokens
```css
.my-component {
    font-family: var(--ff-primary);
    font-size: var(--fs-body-default);
    font-weight: var(--fw-bold);
    color: var(--text-color-primary);
    padding: var(--space-md);
    border-radius: var(--border-radius-lg);
}
```

### Using Text Style Classes
```html
<h1 class="text-h1-bold">Heading</h1>
<p class="text-body-regular">Body text</p>
<span class="text-label-sm">Small label</span>
```

### Using System Fonts
```html
<code class="text-system-small">System code</code>
```

## 🔗 Google Fonts

The following fonts are loaded in `index.html`:
- **DM Sans**: weights 400, 500, 700
- **Roboto Mono**: weight 700

## 🎯 Best Practices

1. **Always use tokens** instead of hardcoded values
2. **Use semantic token names** (e.g., `--text-color-primary` not `--color-black`)
3. **Use text style classes** for complete typography styles
4. **Use spacing tokens** for consistent layouts
5. **Reference tokens** in new components for consistency

## 📚 Related Files

- `components/button/button.css` - Example component using tokens
- `css/main.css` - Main stylesheet (may reference tokens)

