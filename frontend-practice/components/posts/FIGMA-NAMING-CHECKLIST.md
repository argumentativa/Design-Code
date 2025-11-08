# Figma Layer Naming Checklist

Quick reference for updating Comment Thread component naming in Figma.

---

## 🚀 Quick Start Priority List

Update these layers in this order for best results:

### Priority 1: High Impact (Do These First!)

- [ ] **Node I1:971;6751:52323** - "Rows" → `comment-post__row`
- [ ] **Node I1:972;6751:53288** - "Rows" → `comment-reply__row` 
- [ ] **Node I1:973;6751:53288** - "Rows" → `comment-reply__row`
- [ ] **Node I1:971;6751:52325** - "author" → `comment-post__content`
- [ ] **Node I1:972;6751:53290** - "author" → `comment-reply__content`
- [ ] **Node I1:973;6751:53290** - "author" → `comment-reply__content`

### Priority 2: Badge Instances

- [ ] **Node 1:137** - "type=leader-small" → `badge--small--leader`
- [ ] **Node 1:130** - "type=author-small" → `badge--small--author`
- [ ] **Node 1:171** - "streak=superfan-small" → `badge--small--superfan`
- [ ] **Node 1:175** - "streak=contributor-small" → `badge--small--contributor`
- [ ] **Node 1:179** - "streak=creator-small" → `badge--small--creator`

### Priority 3: Element Names

- [ ] **Node I1:971;6751:52326** - "name + user" → `author-header__name-user`
- [ ] **Node I1:971;6751:52334** - "badges" → `author-header__badges`
- [ ] **Node I1:971;7243:49001;6770:85484** - "post-actions" → `action-bar__inner`
- [ ] **Node I1:971;7243:49001;6770:85485;6770:85265** - "reactions" → `reactions-stack`

### Priority 4: Button Updates

- [ ] **Node I1:971;7243:49001;7243:48606** - Update to `atoms/button/small/icon/naked/default`
- [ ] **Node I1:972;7243:58040;7243:48606** - Update to `atoms/button/small/icon/naked/default`
- [ ] **Node I1:973;7243:58040;7243:48606** - Update to `atoms/button/small/icon/naked/default`

---

## 📋 Layer-by-Layer Checklist

### Main Comment Post

#### Row & Content
- [ ] "Rows" → `comment-post__row`
- [ ] "author" → `comment-post__content`
- [ ] "name + user" → `author-header__name-user`
- [ ] "badges" → `author-header__badges`

#### Action Bar
- [ ] "post-actions" → `action-bar__inner`
- [ ] "reactions" → `reactions-stack`
- [ ] "actions-right" → `action-bar__actions`

#### Mini Composer
- [ ] "container" → `mini-composer__container`
- [ ] "text label container" → `input__text-container`
- [ ] "trailing icons" → `input__trailing-icons`

### Reply Comments (2 instances)

#### For Each Reply:
- [ ] "Rows" → `comment-reply__row`
- [ ] "author" → `comment-reply__content`
- [ ] "name + user" → `author-header__name-user`
- [ ] "badges" → `author-header__badges`
- [ ] "post-actions" → `action-bar__inner`
- [ ] "reactions" → `reactions-stack`

---

## 🎯 Naming Templates

Copy/paste these when renaming:

### Components (Keep atomic design prefix)
```
atoms/avatar/small
atoms/avatar/xsmall
atoms/button/small/naked/default
atoms/button/small/icon/naked/default
molecules/actionbar/comment/reactions
molecules/composer/mini
organisms/comment/post
organisms/comment/reply
```

### Elements (Use BEM element syntax)
```
comment-post__row
comment-post__avatar-connector
comment-post__content
author-header__name-user
author-header__badges
action-bar__inner
action-bar__reactions-count
action-bar__actions
reactions-stack
mini-composer__container
mini-composer__avatar
mini-composer__input
input__text-container
input__trailing-icons
```

### Modifiers (Use BEM modifier syntax)
```
badge--small--leader
badge--small--superfan
badge--small--contributor
badge--small--creator
badge--small--author
button--small--naked
button--small--icon-only--naked
avatar--small
avatar--xs
```

---

## 🔍 Find & Replace Guide

If using Figma plugins or bulk rename:

| Find | Replace | Notes |
|------|---------|-------|
| `Rows` | `comment-post__row` or `comment-reply__row` | Check context |
| `author` | `comment-post__content` or `comment-reply__content` | Check if main/reply |
| `name + user` | `author-header__name-user` | All instances |
| `badges` | `author-header__badges` | All instances |
| `post-actions` | `action-bar__inner` | All instances |
| `type=leader-small` | `badge--small--leader` | Badge variant |
| `type=author-small` | `badge--small--author` | Badge variant |
| `streak=superfan-small` | `badge--small--superfan` | Badge variant |
| `streak=contributor-small` | `badge--small--contributor` | Badge variant |
| `streak=creator-small` | `badge--small--creator` | Badge variant |
| `reactions` (in action bar) | `reactions-stack` | Only in action bar |
| `container` (in composer) | `mini-composer__container` | Only in composer |
| `text label container` | `input__text-container` | In input |
| `trailing icons` | `input__trailing-icons` | In input |

---

## ✅ Validation Checklist

After updating names, verify:

### Consistency Check
- [ ] All "Rows" renamed to show parent context
- [ ] All "author" renamed to show location
- [ ] All badge instances use `--` modifiers
- [ ] All button sizes are correct (small, not medium)
- [ ] All action bars use same naming

### BEM Check
- [ ] Element names use `__` (double underscore)
- [ ] Modifier names use `--` (double dash)
- [ ] No spaces in names (use dash or underscore)

### Component Check
- [ ] Avatar sizes: `avatar--small`, `avatar--xs`
- [ ] Badge variants: `badge--small--[type]`
- [ ] Button variants: `button--small--[options]`
- [ ] All component instances match your component library

### Icon Check
- [ ] All icons follow: `icon/[size]/[category]/[name]`
- [ ] Icon sizes are correct (16, 24)
- [ ] Icon names are descriptive

---

## 🎨 Figma Plugin Recommendations

These plugins can help with bulk renaming:

1. **Find and Replace** - Bulk find/replace layer names
2. **Rename It** - Advanced renaming with patterns
3. **Content Reel** - Populate with consistent naming
4. **Instance Locator** - Find all component instances

---

## 🧪 Testing Your Changes

After updating names in Figma:

1. **Test 1: Pull Design Again**
   ```
   - Call Figma MCP tool with node 1:2894
   - Compare generated code quality
   - Check if class names match naming conventions
   ```

2. **Test 2: Check CSS Mapping**
   ```
   - Do badge names map directly to CSS classes?
   - Are button variants clear?
   - Do element names show hierarchy?
   ```

3. **Test 3: Team Review**
   ```
   - Can other designers understand the names?
   - Are names consistent across similar components?
   - Do names match your design system docs?
   ```

---

## 📊 Progress Tracker

Track your progress:

```
High Priority Changes:    [ ] / 6 complete
Badge Instances:          [ ] / 5 complete
Element Names:            [ ] / 4 complete
Button Updates:           [ ] / 3 complete

Total Progress:           [ ] / 18 changes
```

---

## 💡 Tips While Working

1. **Work in sections** - Complete all high priority first
2. **Use Figma's layer search** - Cmd/Ctrl + Click to find layers
3. **Rename components first** - Then instances will update
4. **Keep this checklist visible** - Reference as you go
5. **Test frequently** - Pull design every 5-10 changes
6. **Document as you go** - Note any naming patterns you create

---

## 🆘 Common Issues

### "I can't find a layer"
- Use Figma search (Cmd/Ctrl + /)
- Look for the data-node-id in the structure
- Check if layer is nested inside component

### "Name is already taken"
- Add more context: `comment-post__row` vs `comment-reply__row`
- Use full BEM: `component__element--modifier`

### "Should I rename the component or instance?"
- Component: Changes all instances
- Instance: Changes just that one
- **Recommendation:** Rename component definitions, instances will follow

### "Not sure which naming convention to use"
- **Components:** Atomic design (`atoms/`, `molecules/`)
- **Elements:** BEM elements (`component__element`)
- **Variants:** BEM modifiers (`component--modifier`)

---

## 📝 Notes Section

Use this space to track custom patterns you create:

```
Custom naming decisions:
- 
- 
- 

Questions to discuss with team:
- 
- 
- 

Additional improvements needed:
- 
- 
- 
```

---

## ✨ After Completion

When you've finished updating names:

1. [ ] Pull design again and verify code quality
2. [ ] Document any new patterns you created
3. [ ] Share learnings with design team
4. [ ] Apply same patterns to other components
5. [ ] Update design system documentation
6. [ ] Create naming guide for future components

---

**Happy renaming! 🎉**

Remember: Good naming is an investment that pays off every time you translate design to code!


