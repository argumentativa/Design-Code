# Post Components

Post-related components built with design tokens and icons.

## Components

### Post Comment Highlight (`post-comment-highlight.html`)

A complete post component with:
- Comment thread with avatar and connector
- Author information with badges
- Post content with highlighted text
- Reaction buttons and counts
- Comment composer
- Action bar with reactions

**Features:**
- Uses all design tokens from `css/design-tokens.css`
- Uses icons from `assets/icons/`
- Responsive layout
- Semantic HTML structure

**Usage:**
```html
<link rel="stylesheet" href="components/posts/post-comment-highlight.css">
<!-- Include component HTML -->
```

**Design Tokens Used:**
- Typography: `--ff-primary`, `--fs-body-default`, `--fw-bold`, etc.
- Colors: `--text-color-primary`, `--neutral-20`, `--pink-100`, etc.
- Spacing: `--space-xs`, `--space-s`, `--space-xxs`, etc.
- Border radius: `--border-radius-md`, etc.

**Icons Used:**
- Awards: `shield-heart`, `face-grin-hearts`, `crown`
- Reactions: `heart`, `helpful-color`, `insightful-color`, `uplifting-color`, etc.
- UI: `arrow-right`
- Status: `circle` (online indicator)
- Messaging: `message`

