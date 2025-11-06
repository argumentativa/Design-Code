# Icon Library

Complete icon library with **240 icons** organized by size and category.

## 📊 Icon Count

- **16px**: 83 icons
- **24px**: 152 icons  
- **32px**: 14 icons
- **Large Reactions**: 5 icons
- **Total**: 240 icons

## 📁 Structure

```
assets/icons/
├── 16/          # 16px icons (83 icons)
│   ├── actions/
│   ├── awards/
│   ├── messaging/
│   ├── misc/
│   ├── reactions/
│   ├── status/
│   └── users/
├── 24/          # 24px icons (152 icons)
│   ├── actions/
│   ├── awards/
│   ├── formatting/
│   ├── input/
│   ├── media/
│   ├── messaging/
│   ├── misc/
│   ├── navigation/
│   ├── reactions/
│   ├── search/
│   ├── social/
│   ├── status/
│   ├── UI/
│   └── users/
├── 32/          # 32px icons (14 icons)
│   └── navigation/
└── reactions/   # Large reaction icons (5 icons)
    └── large/
```

## 🚀 Usage

### Direct HTML
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

### With JavaScript Helper
```javascript
import { getIconPath, getIconImg } from './assets/icons/icons-index.js';

// Get path
const path = getIconPath('24', 'actions', 'plus');
// Returns: 'assets/icons/24/actions/plus.svg'

// Get as HTML
const html = getIconImg('24', 'actions', 'plus', {
    alt: 'Add',
    class: 'icon-button',
    width: 24,
    height: 24
});
```

### Large Reaction Icons
```javascript
// Large reaction icons (40px)
const path = getIconPath('reactions', 'large', 'like');
const html = getIconImg('reactions', 'large', 'like', {
    width: 40,
    height: 40
});
```

## 📚 Reference

See `icons-index.js` for:
- Complete list of all 240 icons
- Helper functions for icon access
- Organized by size and category

## 🎨 Icon Categories

### Actions
Common actions: plus, edit, delete, close, check, etc.

### Awards
Achievements: trophy, medal, crown, badge, star, etc.

### Formatting
Text formatting: bold, italic, quote-right

### Input
Form inputs: checkboxes, radio buttons, etc.

### Media
Media controls: video, image, play, pause, etc.

### Messaging
Communication: message, envelope, reply, at, etc.

### Misc
Miscellaneous: book, globe, folder, etc.

### Navigation
Navigation: home, search, bell, compass, etc.

### Reactions
Reactions: heart, helpful, insightful, uplifting, etc.

### Social
Social: hashtag, fire, thumbs-up, robot

### Status
Status indicators: eye, bell, warnings, etc.

### UI
Interface: arrows, chevrons, info, etc.

### Users
User-related: user, team, friends, etc.

## 📝 Notes

- All icons are SVG format for scalability
- Icons can be styled with CSS (fill, stroke, etc.)
- Use appropriate alt text for accessibility
- Match icon size to context
