# Naming Pattern Application Guide

## How to Apply Improved Naming to All Components

This guide shows how to apply the proven naming patterns from the Comment Thread component to all other components in the design system.

---

## 📚 Table of Contents

1. [Quick Reference](#quick-reference)
2. [Component Patterns](#component-patterns)
3. [Avatar Component](#avatar-component)
4. [Badge Component](#badge-component)
5. [Button Component](#button-component)
6. [Action Bar Component](#action-bar-component)
7. [Navigation Component](#navigation-component)
8. [New Components](#new-components)

---

## Quick Reference

### Naming Formula

```
Component Level: atoms/[component]/[variant]
Element Level:   [component]__[element]
Modifier Level:  [component]--[modifier]
Combined:        [component]__[element]--[modifier]
```

### Examples by Component Type

| Component | Figma Name | HTML Class |
|-----------|-----------|------------|
| **Atoms** | `atoms/button/small/naked` | `.button.button--small.button--naked` |
| **Molecules** | `molecules/actionbar/comment` | `.action-bar` |
| **Organisms** | `organisms/comment/thread` | `.comment-thread` |

---

## Component Patterns

### Pattern 1: Simple Atom (No Variants)

**Use Case:** Basic components without size or style variants

**Figma Structure:**
```
atoms/[component]
  └─ [component]__element
```

**Example - Icon:**
```
atoms/icon
  └─ icon__image
```

**HTML:**
```html
<div class="icon">
  <img src="..." class="icon__image" alt="...">
</div>
```

---

### Pattern 2: Atom with Size Variants

**Use Case:** Components that come in different sizes

**Figma Structure:**
```
atoms/[component]/[size]
  └─ [component]__element
```

**Example - Avatar:**
```
atoms/avatar/small
  └─ avatar__image
  └─ avatar__online-indicator
```

**HTML:**
```html
<div class="avatar avatar--small">
  <img src="..." class="avatar__image" alt="...">
  <div class="avatar__online"></div>
</div>
```

**Figma Names:**
- Component: `atoms/avatar/small` or `avatar--small`
- Elements: `avatar__image`, `avatar__online-indicator`

---

### Pattern 3: Atom with Multiple Modifiers

**Use Case:** Components with size AND style variants

**Figma Structure:**
```
atoms/[component]/[size]/[variant]/[state]
OR
[component]--[size]--[variant]--[state]
```

**Example - Button:**
```
atoms/button/small/naked/default
OR
button--small--naked--default
```

**HTML:**
```html
<button class="button button--small button--naked">
  <span class="button__text">Click me</span>
</button>
```

**Figma Names:**
- Component: `atoms/button/small/naked` or `button--small--naked`
- State variants: `button--small--naked--hover`, `button--small--naked--active`
- Elements: `button__text`, `button__icon`, `button__icon-wrapper`

---

### Pattern 4: Molecule (Composed Component)

**Use Case:** Components made of multiple atoms

**Figma Structure:**
```
molecules/[component]/[context]
  └─ [component]__element
      └─ atoms/[sub-component]
```

**Example - Action Bar:**
```
molecules/actionbar/comment
  └─ action-bar__content
      ├─ action-bar__reactions-count
      │   └─ reactions-stack
      │       └─ atoms/reactions/helpful
      └─ action-bar__actions
          └─ atoms/button/small/naked
```

**HTML:**
```html
<div class="action-bar">
  <div class="action-bar__content">
    <div class="action-bar__reactions-count">
      <div class="reactions-stack">
        <div class="reaction-icon reaction-helpful">...</div>
      </div>
      <span class="reaction-count">5</span>
    </div>
    <div class="action-bar__actions">
      <button class="button button--small button--naked">Reply</button>
    </div>
  </div>
</div>
```

---

### Pattern 5: Organism (Complex Component)

**Use Case:** Full sections combining molecules and atoms

**Figma Structure:**
```
organisms/[component]/[variant]
  └─ [component]__section
      └─ molecules/[sub-component]
          └─ atoms/[element]
```

**Example - Comment Thread:**
```
organisms/comment/thread
  └─ comment-post
      ├─ comment-post__row
      │   ├─ comment-post__avatar
      │   │   └─ atoms/avatar/small
      │   └─ author-content
      │       ├─ author-header__name-user-timestamp
      │       ├─ author-header__badges
      │       │   └─ atoms/badge/small/leader
      │       └─ post-content
      ├─ action-bar__row
      │   └─ molecules/actionbar/comment
      └─ mini-composer__container
          └─ molecules/composer/mini
```

---

## Avatar Component

### Current Structure Analysis

**Existing Variants:**
- `avatar--xs` (24x24)
- `avatar--small` (32x32)
- `avatar--medium` (40x40)
- `avatar--large` (48x48)

### Recommended Figma Names

#### Component Variants:
```
atoms/avatar/xs        OR   avatar--xs
atoms/avatar/small     OR   avatar--small
atoms/avatar/medium    OR   avatar--medium
atoms/avatar/large     OR   avatar--large
```

#### With States:
```
avatar--small--online
avatar--small--offline
avatar--medium--creator (with badge)
```

#### Elements:
```
avatar__image-wrapper
avatar__image
avatar__online (online indicator)
avatar__badge (creator/special badge)
avatar__initials (for initial avatars)
```

### Figma Layer Structure:

```
atoms/avatar/small
  ├─ avatar__image-wrapper
  │   └─ avatar__image
  ├─ avatar__online
  │   └─ online-indicator (can stay as is, internal)
  └─ avatar__badge
      └─ badge-icon (internal)
```

### HTML Output:

```html
<div class="avatar avatar--small" data-figma="atoms/avatar/small">
  <div class="avatar__image-wrapper">
    <img src="..." alt="..." class="avatar__image">
  </div>
  <div class="avatar__online">
    <div>
      <img src="online-icon.svg" alt="">
    </div>
  </div>
</div>
```

---

## Badge Component

### Current Structure Analysis

**Existing Variants:**
- Role badges: `leader`, `author`, `creator`
- Streak badges: `superfan`, `contributor`, `tastemaker`
- Sizes: `small`, `large`

### Recommended Figma Names ✅ (Already Improved!)

#### Component Variants:
```
badge--small--leader
badge--small--superfan
badge--small--contributor
badge--small--author
badge--small--creator
badge--small--tastemaker
badge--large--leader
badge--large--superfan
```

#### Elements:
```
badge__icon-container
badge__icon
badge__text-wrapper
badge__text
```

### Figma Layer Structure:

```
badge--small--leader
  ├─ badge__icon-container
  │   └─ badge__icon
  │       └─ icon/16/awards/shield-heart
  └─ badge__text-wrapper
      └─ badge__text
```

### HTML Output:

```html
<div class="badge badge--small badge--leader" data-figma="badge--small--leader">
  <div class="badge__icon-container">
    <img src="shield-heart.svg" alt="Leader" class="badge__icon">
  </div>
  <div class="badge__text-wrapper">
    <p class="badge__text">Community Leader</p>
  </div>
</div>
```

---

## Button Component

### Current Structure Analysis

**Existing Variants:**
- Sizes: `small` (24px), `medium` (32px), `large` (40px)
- Styles: `primary`, `secondary`, `naked`, `destructive`
- Types: `text`, `icon-only`, `text-icon`
- States: `default`, `hover`, `active`, `disabled`

### Recommended Figma Names

#### Component Variants:
```
button--small--primary
button--small--naked
button--small--icon-only--naked
button--medium--primary
button--medium--secondary
button--large--primary
```

#### With State (if needed):
```
button--small--primary--hover
button--small--primary--active
button--small--primary--disabled
```

#### Elements:
```
button__text
button__icon
button__icon-wrapper (for spacing)
button__leading-icon
button__trailing-icon
```

### Figma Layer Structure:

```
button--small--naked
  ├─ button__leading-icon (optional)
  ├─ button__text
  └─ button__trailing-icon (optional)

button--small--icon-only--naked
  └─ button__icon
      └─ icon/16/[category]/[name]
```

### HTML Output:

```html
<!-- Text Button -->
<button class="button button--small button--naked" data-figma="button--small--naked">
  <span class="button__text">Reply</span>
</button>

<!-- Icon-Only Button -->
<button class="button button--small button--icon-only button--naked" 
        data-figma="button--small--icon-only--naked"
        aria-label="Add reaction">
  <div class="button__icon">
    <img src="add-reaction.svg" alt="">
  </div>
</button>

<!-- Text + Icon Button -->
<button class="button button--medium button--primary">
  <img src="icon.svg" class="button__leading-icon" alt="">
  <span class="button__text">Send</span>
</button>
```

---

## Action Bar Component

### Current Structure Analysis ✅ (Already Improved!)

**Use Case:** Interaction bar for posts/comments with reactions and actions

### Recommended Figma Names (Current Best Practice):

#### Component:
```
molecules/actionbar/comment
OR
action-bar--comment
```

#### Elements:
```
action-bar__row
action-bar__content
action-bar__reactions-count
reactions-stack
reaction-icon--helpful
reaction-icon--insightful
reaction-icon--uplifting
reaction-count
action-bar__actions
```

### Figma Layer Structure:

```
molecules/actionbar/comment/reactions
  └─ action-bar__content
      ├─ action-bar__reactions-count
      │   ├─ reactions-stack
      │   │   ├─ atoms/reactions/helpful
      │   │   ├─ atoms/reactions/insightful
      │   │   └─ atoms/reactions/uplifting
      │   └─ reaction-count (text layer)
      └─ action-bar__actions
          ├─ atoms/button/small/icon/naked
          └─ atoms/button/small/naked
```

### HTML Output:

```html
<div class="action-bar" data-figma="molecules/actionbar/comment">
  <div class="action-bar__content">
    <div class="action-bar__reactions-count">
      <div class="reactions-stack">
        <div class="reaction-icon reaction-helpful">
          <img src="helpful.svg" alt="Helpful">
        </div>
        <div class="reaction-icon reaction-insightful">
          <img src="insightful.svg" alt="Insightful">
        </div>
        <div class="reaction-icon reaction-uplifting">
          <img src="uplifting.svg" alt="Uplifting">
        </div>
      </div>
      <span class="reaction-count">31</span>
    </div>
    <div class="action-bar__actions">
      <button class="button button--small button--icon-only button--naked" aria-label="Add reaction">
        <div class="button__icon">
          <img src="add-reaction.svg" alt="">
        </div>
      </button>
      <button class="button button--small button--naked">
        <span class="button__text">Reply</span>
      </button>
    </div>
  </div>
</div>
```

---

## Navigation Component

### Recommended Structure

**Use Case:** Main navigation, sidebars, tabs

### Recommended Figma Names:

#### Component:
```
molecules/navigation/primary
OR
navigation--primary
```

#### Elements:
```
navigation__container
navigation__list
navigation__item
navigation__link
navigation__link--active
navigation__icon
navigation__text
navigation__badge (for counts)
```

### Figma Layer Structure:

```
molecules/navigation/primary
  └─ navigation__container
      └─ navigation__list
          ├─ navigation__item
          │   └─ navigation__link--active
          │       ├─ navigation__icon
          │       ├─ navigation__text
          │       └─ navigation__badge (optional)
          └─ navigation__item
              └─ navigation__link
                  ├─ navigation__icon
                  └─ navigation__text
```

### HTML Output:

```html
<nav class="navigation navigation--primary" data-figma="molecules/navigation/primary">
  <div class="navigation__container">
    <ul class="navigation__list">
      <li class="navigation__item">
        <a href="#" class="navigation__link navigation__link--active">
          <img src="icon.svg" class="navigation__icon" alt="">
          <span class="navigation__text">Home</span>
          <span class="navigation__badge">5</span>
        </a>
      </li>
      <li class="navigation__item">
        <a href="#" class="navigation__link">
          <img src="icon.svg" class="navigation__icon" alt="">
          <span class="navigation__text">Messages</span>
        </a>
      </li>
    </ul>
  </div>
</nav>
```

---

## New Components

### Process for New Components

When creating a new component in Figma, follow this checklist:

#### 1. Determine Component Level
```
Atom?      → atoms/[component]
Molecule?  → molecules/[component]
Organism?  → organisms/[component]
```

#### 2. Define Variants
```
Size variants?        → component--small, component--medium, component--large
Style variants?       → component--primary, component--secondary
Combined?            → component--small--primary
```

#### 3. Name Elements with BEM
```
Direct children:     → component__element
Nested elements:     → component__element-detail
Modified elements:   → component__element--modifier
```

#### 4. Use Descriptive Names
```
❌ "container", "wrapper", "item"
✅ "card__header", "card__body", "card__footer"
```

#### 5. Match CSS Classes
```
Figma: button--small--primary
CSS:   .button.button--small.button--primary
```

---

## Conversion Checklist

When updating an existing component:

### Step 1: Audit Current Names
- [ ] List all current Figma layer names
- [ ] Identify generic names ("container", "item", etc.)
- [ ] Note inconsistent patterns

### Step 2: Map to BEM
- [ ] Identify main component (block)
- [ ] List elements (block__element)
- [ ] List modifiers (block--modifier)

### Step 3: Update Figma
- [ ] Rename component variants
- [ ] Update all element layers
- [ ] Ensure consistency across instances

### Step 4: Test Translation
- [ ] Pull from Figma API/MCP
- [ ] Check generated class names
- [ ] Verify HTML structure
- [ ] Confirm CSS mapping

### Step 5: Document
- [ ] Update component README
- [ ] Add examples
- [ ] List all variants
- [ ] Show Figma→CSS mapping

---

## Common Patterns Reference

### Container Components
```
Figma: [component]__container
CSS:   .component__container
Use:   Wrappers that control layout/spacing
```

### List Components
```
Figma: [component]__list
       [component]__item
CSS:   .component__list
       .component__item
Use:   Collections of repeated items
```

### Header/Body/Footer
```
Figma: [component]__header
       [component]__body
       [component]__footer
CSS:   .component__header
       .component__body
       .component__footer
Use:   Vertical sections
```

### Icon + Text
```
Figma: [component]__icon
       [component]__text
CSS:   .component__icon
       .component__text
Use:   Label-style components
```

### State Modifiers
```
Figma: [component]--active
       [component]--disabled
       [component]--hover
CSS:   .component.component--active
       .component.component--disabled
       .component:hover
Use:   Interactive states
```

---

## Validation Rules

### Must Have ✅
1. Component name matches atomic design level
2. All elements use BEM syntax
3. Modifiers use double dash `--`
4. Elements use double underscore `__`
5. Names are descriptive, not generic

### Must Not Have ❌
1. Generic names without context ("container", "item")
2. Mixed naming conventions
3. Special characters (+, /, *, etc.) except - and _
4. Duplicate names at same level
5. Ambiguous abbreviations

### Should Have 💡
1. Consistent variant naming across similar components
2. Clear parent-child relationships
3. Direct CSS class mapping
4. Semantic, descriptive names
5. Documentation in component README

---

## Migration Strategy

### Phase 1: Critical Components (Week 1)
- ✅ Comment Thread (Done!)
- ✅ Badge (Done!)
- ✅ Action Bar (Done!)
- [ ] Avatar
- [ ] Button

### Phase 2: Supporting Components (Week 2)
- [ ] Navigation
- [ ] Input/Composer
- [ ] Cards
- [ ] Lists

### Phase 3: Complex Components (Week 3)
- [ ] Posts
- [ ] Profiles
- [ ] Modals
- [ ] Forms

### Phase 4: Polish & Document (Week 4)
- [ ] Update all READMEs
- [ ] Create team standards
- [ ] Train team
- [ ] Celebrate! 🎉

---

## Team Resources

### Documents to Reference:
1. **[FIGMA-NAMING-GUIDE.md](./posts/FIGMA-NAMING-GUIDE.md)** - Original guide
2. **[FIGMA-BEFORE-AFTER-COMPARISON.md](./posts/FIGMA-BEFORE-AFTER-COMPARISON.md)** - Impact analysis
3. **[This Document]** - Application guide

### Tools:
- Figma's rename plugin
- BEM validator
- CSS linter

### Support:
- Team Figma chat
- Weekly naming review
- Pair designing sessions

---

## Quick Tips

1. **Start with the component name** - Get that right first
2. **Think in hierarchies** - Use BEM to show relationships
3. **Be specific** - "reactions-stack" > "reactions"
4. **Match CSS** - Your Figma name should map to classes
5. **Stay consistent** - Use same patterns across similar components
6. **Test early** - Pull from Figma after each section
7. **Document as you go** - Update READMEs immediately

---

**Remember:** Good naming is an investment that pays dividends every time you translate design to code!


