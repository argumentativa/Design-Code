# Action Bar Component

**Figma Source:** [molecules/actionbar/comment/reactions](https://www.figma.com/design/2jfreCV5b1jUbsWqeFw9By/Figma-MCP?node-id=3-1164)

Action bar component for comments and posts with reaction counts and action buttons.

## Features

- Displays up to 3 overlapping reaction icons
- Shows total reaction count
- Add reaction button (icon-only, naked)
- Reply button (text, naked)
- Fully responsive
- Uses design tokens and button component
- Multiple variants (with/without reactions)

## Structure

```
actionbar/
├── actionbar.css       # Component styles
├── actionbar.html      # Component demo
└── README.md          # Documentation
```

## Usage

### Basic Action Bar

```html
<div class="actionbar">
    <div class="actionbar__inner">
        <!-- Reactions Count -->
        <div class="actionbar__reactions">
            <div class="actionbar__reactions-stack">
                <div class="actionbar__reaction-icon actionbar__reaction-icon--helpful">
                    <div class="actionbar__reaction-icon-inner">
                        <img src="path/to/helpful-icon.svg" alt="Helpful">
                    </div>
                </div>
                <div class="actionbar__reaction-icon actionbar__reaction-icon--insightful">
                    <div class="actionbar__reaction-icon-inner">
                        <img src="path/to/insightful-icon.svg" alt="Insightful">
                    </div>
                </div>
                <div class="actionbar__reaction-icon actionbar__reaction-icon--uplifting">
                    <div class="actionbar__reaction-icon-inner">
                        <img src="path/to/uplifting-icon.svg" alt="Uplifting">
                    </div>
                </div>
            </div>
            <span class="actionbar__reaction-count">31</span>
        </div>
        
        <!-- Actions -->
        <div class="actionbar__actions">
            <button class="button button--small button--icon-only button--naked" aria-label="Add reaction">
                <div class="button__icon">
                    <img src="path/to/add-reaction-icon.svg" alt="Add reaction">
                </div>
            </button>
            <button class="button button--small button--naked">
                <span class="button__text">Reply</span>
            </button>
        </div>
    </div>
</div>
```

### No Reactions Variant

```html
<div class="actionbar actionbar--no-reactions">
    <div class="actionbar__inner">
        <div class="actionbar__reactions">
            <!-- Empty, hidden by CSS -->
        </div>
        
        <div class="actionbar__actions">
            <button class="button button--small button--icon-only button--naked" aria-label="Add reaction">
                <div class="button__icon">
                    <img src="path/to/add-reaction-icon.svg" alt="Add reaction">
                </div>
            </button>
            <button class="button button--small button--naked">
                <span class="button__text">Reply</span>
            </button>
        </div>
    </div>
</div>
```

## CSS Classes

### Base Classes
- `.actionbar` - Main container
- `.actionbar__inner` - Inner wrapper with padding
- `.actionbar__reactions` - Reactions section (left side)
- `.actionbar__reactions-stack` - Overlapping reaction icons container
- `.actionbar__reaction-icon` - Individual reaction icon (20px)
- `.actionbar__reaction-icon-inner` - Inner container for icon image
- `.actionbar__reaction-count` - Reaction count text
- `.actionbar__actions` - Actions section (right side)

### Reaction Icon Variants
- `.actionbar__reaction-icon--helpful` - Green background (#d1f7cc)
- `.actionbar__reaction-icon--insightful` - Yellow background (#ffeea3)
- `.actionbar__reaction-icon--uplifting` - Beige background (#fff6e7)
- `.actionbar__reaction-icon--haha` - Yellow background
- `.actionbar__reaction-icon--like` - Pink background

### Modifiers
- `.actionbar--no-reactions` - Hides reaction icons and count
- `.actionbar--with-comment-count` - Adds gap for comment count button

## Design Tokens Used

### Typography
- `--ff-primary` - Font family (DM Sans)
- `--fw-bold` - Font weight (700)
- `--fs-label-md` - Font size (12px)
- `--lh-sm` - Line height (20px)
- `--ls-md` - Letter spacing (-0.1px)

### Colors
- `--neutral-white` - Background (#ffffff)
- `--text-color-primary` - Text color (#242526)
- `--green-100` - Helpful reaction background (#d1f7cc)
- `--yellow-100` - Insightful reaction background (#ffeea3)
- `--pink-100` - Like reaction background

### Spacing
- `--space-xxxs` - 2px (reaction icon padding)
- `--space-xxs` - 4px (gaps)
- `--space-xs` - 8px (horizontal padding)
- `--space-s` - 16px (outer padding)

### Sizes
- Reaction icon: 20px × 20px
- Reaction icon inner: 16px × 16px
- Border radius: 100px (circular)

## Button Integration

The action bar uses the Button component for all interactive elements:

**Add Reaction Button:**
- `.button.button--small.button--icon-only.button--naked`
- Small icon-only button (32px)
- Naked variant (transparent with hover)

**Reply Button:**
- `.button.button--small.button--naked`
- 24px height text button
- Naked variant

## Dependencies

- `design-tokens.css` - Design system tokens
- `button.css` - Button component styles

## Accessibility

- Icon-only buttons include `aria-label` attributes
- Reaction icons include descriptive `alt` text
- Interactive elements use semantic button elements
- Keyboard navigation supported via button component

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox required
- CSS custom properties (variables) required

## Related Components

- [Button](../button/README.md) - Used for action buttons
- [Avatar](../avatar/README.md) - Often used with action bar in comments
- [Badge](../badge/README.md) - Often used in comment author sections

