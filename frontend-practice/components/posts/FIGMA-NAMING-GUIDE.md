# Figma Layer Naming Guide for Comment Thread Component

## Overview
This guide shows the current Figma layer names and recommends improvements for better 1:1 code translation.

## Legend
- ✅ **Good** - Already follows best practices
- ⚠️ **Could Improve** - Works but could be clearer
- ❌ **Needs Change** - Generic or unclear naming

---

## Main Component Structure

### Root Container (Node: 1:969)

**Current Name:** `type=comments`  
**Status:** ⚠️ Could Improve  
**Recommended:** `comment-thread` or `organisms/comment-thread`  
**Reason:** More descriptive, matches component purpose

---

## Main Comment Post (Node: 1:971)

### Post Container
**Current Name:** `organisms/comment/post`  
**Status:** ✅ Good  
**Keep as:** `organisms/comment/post` or `comment-post`

### Content Row (Node: I1:971;6751:52323)
**Current Name:** `Rows`  
**Status:** ❌ Needs Change  
**Recommended:** `comment-post__row`  
**Reason:** "Rows" is too generic, BEM naming shows hierarchy

### Avatar + Connector Section (Node: I1:971;7467:31144)
**Current Name:** `avatar+connector`  
**Status:** ✅ Good  
**Optional improvement:** `comment-post__avatar-connector`

#### Avatar (Node: I1:971;6751:52324)
**Current Name:** `atoms/avatar/small`  
**Status:** ✅ Good  
**Keep as:** `atoms/avatar/small` or `avatar--small`

#### Line Connector (Node: I1:971;7467:31265)
**Current Name:** `line-connector`  
**Status:** ✅ Good  
**Keep as:** `line-connector`

### Author Content Section (Node: I1:971;6751:52325)
**Current Name:** `author`  
**Status:** ⚠️ Could Improve  
**Recommended:** `comment-post__content` or `author-content`  
**Reason:** More specific about what this contains

#### Name + User (Node: I1:971;6751:52326)
**Current Name:** `name + user`  
**Status:** ⚠️ Could Improve  
**Recommended:** `author-header__name-user`  
**Reason:** Shows this is part of the author header

#### Badges Container (Node: I1:971;6751:52334)
**Current Name:** `badges`  
**Status:** ⚠️ Could Improve  
**Recommended:** `author-header__badges`  
**Reason:** Shows relationship to author header

#### Individual Badge - Leader (Node: 1:137)
**Current Name:** `type=leader-small`  
**Status:** ⚠️ Could Improve  
**Recommended:** `badge--small--leader`  
**Reason:** Matches BEM modifier syntax, maps directly to CSS classes  
**CSS Mapping:** `.badge.badge--small.badge--leader`

#### Individual Badge - Superfan (Node: 1:171)
**Current Name:** `streak=superfan-small`  
**Status:** ⚠️ Could Improve  
**Recommended:** `badge--small--superfan`  
**Reason:** Consistent with other badges  
**CSS Mapping:** `.badge.badge--small.badge--superfan`

#### Badge Component Instance (Node: 1:172, 1:176, etc.)
**Current Name:** `atoms/badges/roles-title`  
**Status:** ⚠️ Could Improve  
**Recommended:** Keep component definition as is, but instance names should reflect variant:
- `badge--small--leader`
- `badge--small--superfan`
- `badge--small--contributor`
- `badge--small--creator`
- `badge--small--author`

#### Post Content (Node: I1:971;6751:52339)
**Current Name:** `post-content`  
**Status:** ✅ Good  
**Keep as:** `post-content`

---

## Action Bar Section (Node: I1:971;7243:49001)

### Action Bar Container
**Current Name:** `molecules/actionbar/comment/reactions`  
**Status:** ✅ Good  
**Keep as:** `molecules/actionbar/comment/reactions` or `action-bar`

### Actions Container (Node: I1:971;7243:49001;6770:85484)
**Current Name:** `post-actions`  
**Status:** ⚠️ Could Improve  
**Recommended:** `action-bar__inner`  
**Reason:** More specific about being part of action bar

### Reactions Count (Node: I1:971;7243:49001;6770:85485)
**Current Name:** `molecules/reactions/count`  
**Status:** ✅ Good  
**Optional:** `action-bar__reactions-count`

#### Reactions Stack (Node: I1:971;7243:49001;6770:85485;6770:85265)
**Current Name:** `reactions`  
**Status:** ⚠️ Could Improve  
**Recommended:** `reactions-stack`  
**Reason:** Clarifies that these are stacked/overlapping

#### Individual Reaction Icons (Node: 1:390, 1:404, 1:421)
**Current Name:** `atoms/reactions/helpful`, `atoms/reactions/insightful`, `atoms/reactions/uplifting`  
**Status:** ✅ Good  
**Alternative:** `reaction-icon--helpful`, `reaction-icon--insightful`, `reaction-icon--uplifting`  
**Reason:** Either works, but second option is more specific

### Actions Right (Node: I1:971;7243:49001;7243:48605)
**Current Name:** `actions-right`  
**Status:** ✅ Good  
**Keep as:** `actions-right` or `action-bar__actions`

#### Add Reaction Button (Node: I1:971;7243:49001;7243:48606)
**Current Name:** `atoms/button/medium/icon/naked/default`  
**Status:** ⚠️ Should Update  
**Recommended:** `atoms/button/small/icon/naked/default` (now using small)  
**Alternative:** `button--small--icon-only--naked`  
**Reason:** Matches actual size being used and CSS classes  
**CSS Mapping:** `.button.button--small.button--icon-only.button--naked`

#### Reply Button (Node: I1:971;7243:49001;7336:62759)
**Current Name:** `atoms/button/small/naked/default`  
**Status:** ✅ Good  
**Alternative:** `button--small--naked`  
**CSS Mapping:** `.button.button--small.button--naked`

#### Add Reaction Icon (Node: 1:652)
**Current Name:** `icon/24/reactions/add-reaction`  
**Status:** ✅ Good  
**Keep as:** `icon/24/reactions/add-reaction`

---

## Mini Composer Section (Node: I1:971;7088:58164)

### Composer Container
**Current Name:** `molecules/composer/mini`  
**Status:** ✅ Good  
**Keep as:** `molecules/composer/mini` or `mini-composer`

### Inner Container (Node: I1:971;7088:58164;7088:61113)
**Current Name:** `container`  
**Status:** ⚠️ Could Improve  
**Recommended:** `mini-composer__container`  
**Reason:** Too generic, needs namespace

### Composer Row (Node: I1:971;7088:58164;7088:61125)
**Current Name:** `mini-composer`  
**Status:** ⚠️ Duplicate  
**Recommended:** `mini-composer__row` or `mini-composer__inner`  
**Reason:** Parent already has same name, needs differentiation

### Avatar Container (Node: I1:971;7088:58164;7088:61360)
**Current Name:** (No name visible)  
**Recommended:** `mini-composer__avatar`

### Input Field (Node: I1:971;7088:58164;7125:222137)
**Current Name:** `atoms/input/default`  
**Status:** ✅ Good  
**Keep as:** `atoms/input/default` or `input--default`

#### Text Container (Node: I1:971;7088:58164;7125:222137;7096:149314)
**Current Name:** `text label container`  
**Status:** ⚠️ Could Improve  
**Recommended:** `input__text-container`  
**Reason:** More specific, BEM naming

#### Trailing Icons (Node: I1:971;7088:58164;7125:222137;6844:73381)
**Current Name:** `trailing icons`  
**Status:** ✅ Good  
**Optional:** `input__trailing-icons`

---

## Reply Comments (Nodes: 1:972, 1:973)

### Reply Container
**Current Name:** `organisms/comment/reply`  
**Status:** ✅ Good  
**Keep as:** `organisms/comment/reply` or `comment-reply`

### Reply Row (Same pattern as main comment)
**Current Name:** `Rows`  
**Status:** ❌ Needs Change  
**Recommended:** `comment-reply__row`  
**Reason:** Consistent with main comment naming

### Reply Avatar (Node: I1:972;6751:53289)
**Current Name:** `atoms/avatar/xsmall`  
**Status:** ✅ Good  
**Alternative:** `avatar--xs`  
**CSS Mapping:** `.avatar.avatar--xs`

### Reply Line Connector (Node: I1:972;7467:32985)
**Current Name:** `line-connector`  
**Status:** ✅ Good  
**Keep as:** `line-connector`

#### Rectangle (Node: I1:972;7467:33998)
**Current Name:** `rectangle`  
**Status:** ⚠️ Could Improve  
**Recommended:** `line-connector__rect` or `connector-line`  
**Reason:** More descriptive

### Reply Author Content (Node: I1:972;6751:53290)
**Current Name:** `author`  
**Status:** ⚠️ Could Improve  
**Recommended:** `comment-reply__content` or `reply-author-content`  
**Reason:** More specific about being reply content

---

## Icon Naming Conventions

All icon names follow this pattern and are ✅ Good:
```
icon/[size]/[category]/[name]

Examples:
- icon/24/reactions/add-reaction
- icon/24/UI/arrow-right
- icon/24/media/image
- icon/16/awards/shield-heart
- icon/16/awards/face-grin-hearts
- icon/16/awards/hand-holding-heart
- icon/16/awards/crown
```

---

## Quick Reference: Priority Changes

### High Priority (Changes that will significantly improve code translation):

1. **"Rows" → `comment-post__row` / `comment-reply__row`**
   - Appears multiple times, very generic

2. **"author" → `comment-post__content` / `author-content`**
   - Needs more context about what it contains

3. **"name + user" → `author-header__name-user`**
   - Better shows hierarchy

4. **Badge instances:**
   - `type=leader-small` → `badge--small--leader`
   - `streak=superfan-small` → `badge--small--superfan`
   - Direct CSS class mapping

5. **Button instances:**
   - Update add-reaction to `atoms/button/small/icon/naked/default`
   - Or use `button--small--icon-only--naked`

### Medium Priority (Nice to have):

1. **"badges" → `author-header__badges`**
2. **"post-actions" → `action-bar__inner`**
3. **"reactions" → `reactions-stack`**
4. **"container" → `mini-composer__container`**
5. **"text label container" → `input__text-container`**

### Low Priority (Already pretty good):

1. All icon names
2. Component names (`organisms/comment/post`, `molecules/actionbar/comment/reactions`)
3. `line-connector` names
4. `post-content` names

---

## Recommended Naming Pattern Summary

### For Components:
```
[atomic-level]/[component-type]/[variant]

Examples:
- atoms/avatar/small
- atoms/button/small/naked/default
- molecules/actionbar/comment/reactions
- organisms/comment/post
```

### For Elements (BEM Style):
```
[component-name]__[element-name]

Examples:
- comment-post__row
- comment-post__avatar-connector
- author-header__name-user
- author-header__badges
- action-bar__inner
- action-bar__reactions-count
```

### For Modifiers (BEM Style):
```
[component-name]--[modifier]--[modifier]

Examples:
- badge--small--leader
- badge--small--superfan
- button--small--naked
- button--small--icon-only--naked
- avatar--xs
- avatar--small
```

---

## Benefits of Improved Naming

1. **Direct CSS Class Mapping**
   - `badge--small--leader` → `.badge.badge--small.badge--leader`
   - No guesswork needed

2. **Clear Hierarchy**
   - `comment-post__row` immediately shows it belongs to comment-post
   - `author-header__badges` shows badges are part of author header

3. **Component Reusability**
   - Clear variant names make it obvious which component to use
   - Easier to find existing components

4. **Better Code Generation**
   - AI can directly translate Figma names to code
   - Reduces manual corrections needed

5. **Team Communication**
   - Designers and developers speak same language
   - Faster handoffs and fewer questions

---

## Implementation Tips

1. **Start with high priority changes** - These have the biggest impact
2. **Use Figma's rename plugin** - Batch rename similar layers
3. **Create naming templates** - Save common patterns as guidelines
4. **Document variants** - Keep a list of all variants for each component
5. **Update component libraries** - Apply naming to your master components first

---

## Questions to Ask When Naming:

1. **Is this a component?** → Use atomic design pattern (`atoms/`, `molecules/`, `organisms/`)
2. **Is this an element of a component?** → Use BEM element syntax (`component__element`)
3. **Is this a variant or state?** → Use BEM modifier syntax (`component--modifier`)
4. **Could this be confused with something else?** → Add more context/namespace
5. **Does this match the CSS class?** → Aim for 1:1 mapping when possible

---

## Next Steps

1. Review this guide with your team
2. Update Figma layers starting with high priority items
3. Test by pulling the design again and comparing code quality
4. Iterate and refine based on results
5. Create a team naming standard document


