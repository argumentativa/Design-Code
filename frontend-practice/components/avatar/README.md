# Avatar Component

A comprehensive avatar component system with all sizes, variants, and states based on Figma designs and design tokens.

## Features

- **6 Sizes**: XXsmall (16px), XSmall (24px), Small (32px), Medium (40px), Large (48px), XLarge (96px)
- **3 Types**: Image, Initials, Icon
- **Online Status Indicator**: SVG-based indicators with size-specific positioning
- **Creator Badge**: Overlay avatar badge for creator identification
- **Design Tokens**: All sizing uses design tokens from `css/design-tokens.css`

## Usage

### Basic Image Avatar

```html
<div class="avatar avatar--medium">
    <img src="path/to/image.png" alt="" class="avatar__image">
</div>
```

### Initials Avatar

```html
<div class="avatar avatar--medium">
    <div class="avatar__initials">
        <p>JD</p>
    </div>
</div>
```

### Icon Avatar

```html
<div class="avatar avatar--medium">
    <div class="avatar__icon">
        <img src="../../assets/icons/24/awards/utensils.svg" alt="">
    </div>
</div>
```

### Avatar with Online Status

```html
<div class="avatar avatar--medium">
    <img src="path/to/image.png" alt="" class="avatar__image">
    <div class="avatar__online">
        <img src="path/to/online-indicator.svg" alt="">
    </div>
</div>
```

### Avatar with Creator Badge

```html
<div class="avatar avatar--medium">
    <img src="path/to/image.png" alt="" class="avatar__image">
    <div class="avatar__creator-badge">
        <img src="path/to/creator-avatar.png" alt="">
    </div>
</div>
```

## Size Classes

- `.avatar--xxsmall` - 16px
- `.avatar--xs` - 24px
- `.avatar--small` - 32px
- `.avatar--medium` - 40px
- `.avatar--large` - 48px
- `.avatar--xlarge` - 96px

## Design Tokens Used

All avatar sizing follows design tokens:

- `--avatar-size-*` - Avatar dimensions
- `--avatar-online-size-*` - Online indicator sizes
- `--avatar-online-offset-*-bottom` - Online indicator bottom position
- `--avatar-online-offset-*-right` - Online indicator right position
- `--avatar-creator-badge-size-*` - Creator badge sizes
- `--avatar-creator-badge-offset-*` - Creator badge positioning
- `--avatar-initials-size-*` - Initials font sizes
- `--avatar-border-radius` - 50% (circular)

## Image Positioning

Avatar images use percentage-based positioning offsets to match Figma designs:

- **Large/XLarge**: `left: -1.04%; right: 1.04%`
- **Medium**: `left: -1.25%; right: 1.25%`
- **XS/XXsmall**: `left: -2.08%; right: 2.08%`

## Notes

- All images should use `object-fit: cover` for proper cropping
- Online status indicators use SVG images from Figma
- Creator badges are positioned at the bottom-right with negative offsets
- Border radius is always 50% for circular avatars



