# Icon Usage Guide

## Quick Start

All 240 icons are ready to use in your components!

### Direct Usage
```html
<img src="assets/icons/24/actions/plus.svg" alt="Add" width="24" height="24" />
```

### In Components
```html
<button class="button">
    <img src="assets/icons/24/actions/plus.svg" alt="Add" class="button__icon" />
    <span>Add Item</span>
</button>
```

## JavaScript Helper Functions

```javascript
import { getIconPath, getIconImg, getIconsByCategory } from './assets/icons/icons-index.js';

// Get icon path
const path = getIconPath('24', 'actions', 'plus');
// Returns: 'assets/icons/24/actions/plus.svg'

// Get icon as HTML
const html = getIconImg('24', 'actions', 'plus', {
    alt: 'Add',
    class: 'icon-button'
});

// Get all icons in a category
const allActions = getIconsByCategory('24', 'actions');
```

## Icon Sizes

- **16px**: Small icons for badges, labels, inline use
- **24px**: Standard icons for buttons, navigation, general UI
- **32px**: Large icons for primary actions, navigation
- **Reactions Large**: 40px reaction icons

## Common Use Cases

### Button with Icon
```html
<button class="button">
    <img src="assets/icons/24/actions/plus.svg" alt="Add" class="button__icon" />
    <span>Add Item</span>
</button>
```

### Navigation Item
```html
<a href="/home" class="nav-link">
    <img src="assets/icons/32/navigation/home.svg" alt="Home" width="32" height="32" />
    <span>Home</span>
</a>
```

### Badge with Icon
```html
<div class="badge">
    <img src="assets/icons/16/awards/star.svg" alt="Star" width="16" height="16" />
    <span>Featured</span>
</div>
```

### Reaction Icon
```html
<button class="reaction-button">
    <img src="assets/icons/reactions/large/like.svg" alt="Like" width="40" height="40" />
</button>
```

## CSS Styling

Icons can be styled with CSS:

```css
.icon {
    width: 24px;
    height: 24px;
    color: currentColor; /* For SVG fill */
}

.icon--primary {
    fill: var(--brand-raptive-primary-blue);
}

.icon--muted {
    opacity: 0.6;
}
```

## Complete Icon Reference

See `icons-index.js` for the complete list of all 240 icons organized by size and category.

