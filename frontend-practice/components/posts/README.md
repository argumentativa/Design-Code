# Post Components

Post-related components built with design tokens and icons.

## Components

### Comment Thread (`comment-thread.html`)

**Figma Source:** [organisms/comment/thread](https://www.figma.com/design/2jfreCV5b1jUbsWqeFw9By/Figma-MCP?node-id=1-2894)

A pixel-perfect comment thread component with nested replies:
- Main comment with 32px avatar
- Nested reply threads with 24px avatars
- Community badges (Community Leader, Author, Superfan, Contributor, Tastemaker)
- Reaction system (Helpful, Insightful, Uplifting)
- Reply and add reaction buttons
- Mini composer for new comments

**Features:**
- Pixel-perfect implementation matching Figma design
- 1:1 design token mapping
- Nested comment threading
- Multiple badge types and styles
- Interactive reaction system
- Semantic HTML structure

**Usage:**
```html
<link rel="stylesheet" href="components/posts/comment-thread.css">
<!-- Include component HTML -->
```

**Design Tokens Used:**
- Typography: `--ff-primary`, `--fs-label-md`, `--fs-label-lg`, `--fw-bold`, `--fw-medium`, `--fw-regular`
- Colors: `--text-color-primary`, `--text-color-secondary`, `--text-color-inverse`, `--neutral-20`, `--neutral-30`, `--neutral-100`, `--neutral-300`, `--neutral-1000`, `--green-100`, `--yellow-100`
- Spacing: `--space-xxxs`, `--space-xxs`, `--space-xs`, `--space-s`, `--space-md`, `--space-lg`
- Border radius: `--border-radius-md`
- Line heights: `--lh-md`, `--lh-sm`
- Letter spacing: `--ls-md`, `--ls-sm`

**Icons Used:**
- Awards: `shield-heart`, `face-grin-hearts`, `hand-holding-heart`, `crown`
- Reactions: `add-reaction`, `helpful-color`, `insightful-color`, `uplifting-color`
- UI: `arrow-right`
- Media: `image`

---

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

