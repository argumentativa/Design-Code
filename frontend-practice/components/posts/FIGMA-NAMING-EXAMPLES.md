# Figma Naming Examples - Before & After

## Visual Comparison of Naming Impact

This document shows side-by-side comparisons of how naming affects code translation.

---

## Example 1: Main Comment Row

### ❌ Current Naming in Figma:
```
organisms/comment/post
  └─ Rows
      ├─ avatar+connector
      └─ author
```

### ✅ Recommended Naming:
```
organisms/comment/post
  └─ comment-post__row
      ├─ comment-post__avatar-connector
      └─ comment-post__content
```

### Impact on Code:

**Current (requires guessing):**
```html
<div class="comment-post">
  <div class="rows"> <!-- Generic name, unclear purpose -->
    <div class="avatar-connector">...</div>
    <div class="author"> <!-- Could be confused with author component -->
      ...
    </div>
  </div>
</div>
```

**With Better Naming:**
```html
<div class="comment-post">
  <div class="comment-post__row"> <!-- Clear relationship to parent -->
    <div class="comment-post__avatar-connector">...</div>
    <div class="comment-post__content"> <!-- Clear this is content area -->
      ...
    </div>
  </div>
</div>
```

---

## Example 2: Badges

### ❌ Current Naming in Figma:
```
atoms/badges/roles-title
  └─ type=leader-small
      └─ atoms/badges/roles-title (component instance)
```

### ✅ Recommended Naming:
```
badge--small--leader
  └─ badge__icon-container
  └─ badge__text-wrapper
```

### Impact on Code:

**Current (requires translation):**
```html
<!-- Figma: type=leader-small -->
<div class="badge badge-small">
  <!-- AI has to figure out this is a "leader" type -->
  <div class="badge-icon">...</div>
  <div class="badge-text">Community Leader</div>
</div>
```

**With Better Naming:**
```html
<!-- Figma: badge--small--leader -->
<div class="badge badge--small badge--leader">
  <!-- Direct 1:1 mapping! -->
  <div class="badge__icon-container">...</div>
  <div class="badge__text-wrapper">Community Leader</div>
</div>
```

**CSS Mapping:**
```css
/* Direct translation from Figma name */
.badge.badge--small.badge--leader { }
```

---

## Example 3: Buttons

### ❌ Current Naming in Figma:
```
atoms/button/medium/icon/naked/default
  └─ icon/24/reactions/add-reaction
```

### ✅ Recommended Naming (after we updated to small):
```
atoms/button/small/icon/naked/default
OR
button--small--icon-only--naked
  └─ button__icon
      └─ icon/24/reactions/add-reaction
```

### Impact on Code:

**Current (path-based):**
```html
<!-- Figma: atoms/button/medium/icon/naked/default -->
<button class="button button--medium button--icon-only button--naked">
  <!-- Have to manually correct size -->
  <div class="button-icon">
    <img src="add-reaction.svg" />
  </div>
</button>
```

**With Better Naming:**
```html
<!-- Figma: button--small--icon-only--naked -->
<button class="button button--small button--icon-only button--naked">
  <!-- Direct mapping! -->
  <div class="button__icon">
    <img src="add-reaction.svg" />
  </div>
</button>
```

---

## Example 4: Action Bar

### ❌ Current Naming in Figma:
```
molecules/actionbar/comment/reactions
  └─ post-actions
      ├─ molecules/reactions/count
      │   └─ reactions
      └─ actions-right
```

### ✅ Recommended Naming:
```
action-bar
  └─ action-bar__inner
      ├─ action-bar__reactions-count
      │   └─ reactions-stack
      └─ action-bar__actions
```

### Impact on Code:

**Current (mixed naming styles):**
```html
<div class="action-bar">
  <div class="post-actions"> <!-- Inconsistent with parent -->
    <div class="reactions-count">
      <div class="reactions"> <!-- Too generic -->
        ...
      </div>
    </div>
    <div class="actions-right">...</div>
  </div>
</div>
```

**With Better Naming:**
```html
<div class="action-bar">
  <div class="action-bar__inner"> <!-- Clear hierarchy -->
    <div class="action-bar__reactions-count">
      <div class="reactions-stack"> <!-- Descriptive -->
        ...
      </div>
    </div>
    <div class="action-bar__actions">...</div>
  </div>
</div>
```

---

## Example 5: Author Header

### ❌ Current Naming in Figma:
```
author
  ├─ name + user
  ├─ badges
  └─ post-content
```

### ✅ Recommended Naming:
```
comment-post__content (or author-content)
  ├─ author-header__name-user
  ├─ author-header__badges
  └─ post-content
```

### Impact on Code:

**Current (unclear relationships):**
```html
<div class="author">
  <div class="name-user">...</div>
  <div class="badges">...</div>
  <div class="post-content">...</div>
</div>
```

**With Better Naming:**
```html
<div class="comment-post__content">
  <div class="author-header__name-user">...</div>
  <div class="author-header__badges">...</div>
  <div class="post-content">...</div>
</div>
```

**Better CSS Specificity:**
```css
/* Clear relationships */
.comment-post__content { }
.author-header__name-user { }
.author-header__badges { }

/* vs unclear nesting */
.author .name-user { }
.author .badges { }
```

---

## Example 6: Connector Lines

### ❌ Current Naming in Figma:
```
line-connector
  └─ connector
      └─ (rotated element)
```

### ✅ Current naming is actually good!
```
line-connector
  └─ connector
```

### Why This Works:

**Code Output:**
```html
<div class="line-connector">
  <!-- Clear purpose, no confusion -->
</div>
```

```css
.line-connector {
  opacity: 0; /* Hidden by default */
}
```

---

## Real-World Translation Example

### Full Comment Post Structure

#### In Figma (with improved naming):
```
comment-post
├─ comment-post__row
│  ├─ comment-post__avatar-connector
│  │  ├─ avatar--small
│  │  └─ line-connector
│  └─ comment-post__content
│     ├─ author-header__name-user
│     │  ├─ author-name
│     │  └─ author-meta
│     ├─ author-header__badges
│     │  ├─ badge--small--leader
│     │  └─ badge--small--superfan
│     └─ post-content
├─ action-bar
│  ├─ action-bar__connector-spacer
│  └─ action-bar__inner
│     ├─ action-bar__reactions-count
│     │  ├─ reactions-stack
│     │  │  ├─ reaction-icon--helpful
│     │  │  ├─ reaction-icon--insightful
│     │  │  └─ reaction-icon--uplifting
│     │  └─ reaction-count
│     └─ action-bar__actions
│        ├─ button--small--icon-only--naked
│        └─ button--small--naked
└─ mini-composer
   ├─ mini-composer__avatar
   └─ mini-composer__input
```

#### Generated HTML (nearly 1:1):
```html
<div class="comment-post">
  <div class="comment-post__row">
    <div class="comment-post__avatar-connector">
      <div class="avatar avatar--small">
        <img src="..." class="avatar__image">
      </div>
      <div class="line-connector"></div>
    </div>
    <div class="comment-post__content">
      <div class="author-header__name-user">
        <span class="author-name">Amy L Week</span>
        <span class="author-meta">@amyl518 • 4h</span>
      </div>
      <div class="author-header__badges">
        <div class="badge badge--small badge--leader">...</div>
        <div class="badge badge--small badge--superfan">...</div>
      </div>
      <div class="post-content">...</div>
    </div>
  </div>
  <div class="action-bar">
    <div class="action-bar__connector-spacer"></div>
    <div class="action-bar__inner">
      <div class="action-bar__reactions-count">
        <div class="reactions-stack">
          <div class="reaction-icon reaction-icon--helpful">...</div>
          <div class="reaction-icon reaction-icon--insightful">...</div>
          <div class="reaction-icon reaction-icon--uplifting">...</div>
        </div>
        <span class="reaction-count">31</span>
      </div>
      <div class="action-bar__actions">
        <button class="button button--small button--icon-only button--naked">...</button>
        <button class="button button--small button--naked">Reply</button>
      </div>
    </div>
  </div>
  <div class="mini-composer">
    <div class="mini-composer__avatar">...</div>
    <div class="mini-composer__input">...</div>
  </div>
</div>
```

---

## Key Takeaways

### 1. **BEM Naming Shows Relationships**
```
comment-post__row  ← Element of comment-post
badge--small       ← Modifier of badge
```

### 2. **Consistent Patterns Enable Automation**
```
badge--[size]--[type]
button--[size]--[variant]--[style]
```

### 3. **Descriptive Names Reduce Guesswork**
```
❌ "reactions" → Could be anything
✅ "reactions-stack" → Clear it's a stack of overlapping items

❌ "Rows" → Generic container
✅ "comment-post__row" → Specific row for comment post

❌ "author" → Ambiguous
✅ "comment-post__content" → Clear it's content area
```

### 4. **Direct CSS Mapping**
```
Figma: badge--small--leader
CSS:   .badge.badge--small.badge--leader

Figma: button--small--icon-only--naked  
CSS:   .button.button--small.button--icon-only.button--naked
```

---

## Testing Your Naming

After updating your Figma names, ask these questions:

1. **Can I predict the CSS class from the Figma layer name?**
   - If yes ✅, naming is good
   - If no ❌, needs improvement

2. **Does the name describe what it IS, not just what it looks like?**
   - ✅ "reactions-stack" (what it is)
   - ❌ "three circles" (what it looks like)

3. **Is the parent-child relationship clear?**
   - ✅ "comment-post__row" (clearly child of comment-post)
   - ❌ "Rows" (child of what?)

4. **Would a new team member understand this?**
   - ✅ "badge--small--superfan" (size and type clear)
   - ❌ "streak=superfan-small" (what's a streak?)

5. **Does it match the existing component library?**
   - ✅ Uses same variants as actual components
   - ❌ Uses different names than code

---

## Quick Wins for Immediate Impact

Update these 5 names first for maximum impact:

1. **"Rows"** → `comment-post__row`
2. **"author"** → `comment-post__content`
3. **"type=leader-small"** → `badge--small--leader`
4. **"streak=superfan-small"** → `badge--small--superfan`
5. **"post-actions"** → `action-bar__inner`

These changes alone will dramatically improve code translation quality! 🎯


