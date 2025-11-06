<template>
  <div>
    <Navigation />
    <div class="home-container">
      <div class="header">
        <h1>Design System Component Library</h1>
        <p class="subtitle">Comprehensive UI Components — Built with Exact Figma Design Tokens</p>
      </div>

    <div class="component-grid">
      <!-- Avatar Component -->
      <NuxtLink to="/avatar" class="component-card">
        <div class="component-card__header">
          <div class="component-card__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path fill="currentColor" d="M10 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0 1.667c-3.334 0-10 1.666-10 5v.833c0 .917.75 1.667 1.667 1.667h16.666c.917 0 1.667-.75 1.667-1.667v-.833c0-3.334-6.666-5-10-5Z"/>
            </svg>
          </div>
          <h2 class="component-card__title">Avatar</h2>
        </div>
        <p class="component-card__description">
          User profile images with 6 size variants, initials, icons, online status, and creator badges.
        </p>
        <div class="component-card__meta">
          <span class="component-card__tag">6 Sizes</span>
          <span class="component-card__tag">Image</span>
          <span class="component-card__tag">Initials</span>
          <span class="component-card__tag">Icon</span>
          <span class="component-card__tag">Status</span>
        </div>
      </NuxtLink>

      <!-- Badge Component -->
      <NuxtLink to="/badge" class="component-card">
        <div class="component-card__header">
          <div class="component-card__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path fill="currentColor" d="M10 1.25 12.5 7.5l6.25.625-4.688 4.063L15.313 18.75 10 15 4.687 18.75l1.25-6.562L1.25 8.125 7.5 7.5 10 1.25Z"/>
            </svg>
          </div>
          <h2 class="component-card__title">Badge</h2>
        </div>
        <p class="component-card__description">
          Achievement and role badges with gradient backgrounds, icons in 2 sizes (16px, 24px).
        </p>
        <div class="component-card__meta">
          <span class="component-card__tag">2 Sizes</span>
          <span class="component-card__tag">Streak</span>
          <span class="component-card__tag">Role</span>
          <span class="component-card__tag">Gradients</span>
        </div>
      </NuxtLink>

      <!-- Button Component -->
      <NuxtLink to="/button" class="component-card">
        <div class="component-card__header">
          <div class="component-card__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <rect width="18" height="12" x="1" y="4" fill="currentColor" rx="6"/>
            </svg>
          </div>
          <h2 class="component-card__title">Button</h2>
        </div>
        <p class="component-card__description">
          Brand primary buttons with all interactive states, icons, and 44px height.
        </p>
        <div class="component-card__meta">
          <span class="component-card__tag">States</span>
          <span class="component-card__tag">Icons</span>
          <span class="component-card__tag">Brand</span>
          <span class="component-card__tag">Interactive</span>
        </div>
      </NuxtLink>

      <!-- Post/Comment Component -->
      <NuxtLink to="/post" class="component-card">
        <div class="component-card__header">
          <div class="component-card__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path fill="currentColor" d="M17.5 2.5h-15c-.917 0-1.667.75-1.667 1.667v10c0 .916.75 1.666 1.667 1.666h11.667l3.333 3.334V4.167c0-.917-.75-1.667-1.667-1.667Zm-11.667 10H4.167V11h1.666v1.5Zm0-2.5H4.167V8.5h1.666V10Zm0-2.5H4.167V6h1.666v1.5Zm8.334 5H7.5V11h6.667v1.5Zm0-2.5H7.5V8.5h6.667V10Zm0-2.5H7.5V6h6.667v1.5Z"/>
            </svg>
          </div>
          <h2 class="component-card__title">Post / Comment</h2>
        </div>
        <p class="component-card__description">
          Complex comment component with avatars, badges, reactions, actions, and nested replies.
        </p>
        <div class="component-card__meta">
          <span class="component-card__tag">Reactions</span>
          <span class="component-card__tag">Actions</span>
          <span class="component-card__tag">Complex</span>
          <span class="component-card__tag">Composite</span>
        </div>
      </NuxtLink>
    </div>

    <div class="footer">
      <p>Built with Nuxt 4.2.0 • Design Tokens from Figma</p>
    </div>
    </div>
  </div>
</template>

<script setup>
// Home page - uses default layout without navigation
definePageMeta({
  layout: false
})
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-xxl);
}

.header {
  text-align: center;
  margin-bottom: var(--space-xxl);
}

h1 {
  font-size: var(--fs-display);
  font-weight: var(--fw-bold);
  line-height: var(--lh-xl);
  color: var(--neutral-white);
  margin-bottom: var(--space-sm);
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-family: var(--ff-system);
  font-size: var(--fs-label-lg);
  font-weight: var(--fw-medium);
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: var(--ls-md);
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.component-card {
  background: var(--neutral-white);
  border-radius: var(--border-radius-lg);
  padding: var(--space-lg);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.component-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.component-card__header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.component-card__icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--brand-raptive-primary-blue) 0%, #9333ea 100%);
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.component-card__icon svg {
  width: 20px;
  height: 20px;
  color: var(--neutral-white);
}

.component-card__title {
  font-size: var(--fs-h2);
  font-weight: var(--fw-bold);
  color: var(--text-color-primary);
  line-height: var(--lh-md);
}

.component-card__description {
  font-size: var(--fs-body-default);
  font-weight: var(--fw-regular);
  color: var(--text-color-secondary);
  line-height: var(--lh-md);
}

.component-card__meta {
  display: flex;
  gap: var(--space-xs);
  flex-wrap: wrap;
  margin-top: var(--space-xs);
}

.component-card__tag {
  font-family: var(--ff-system);
  font-size: 11px;
  font-weight: var(--fw-bold);
  color: var(--text-color-tertiary);
  background: var(--neutral-50);
  padding: var(--space-xxs) var(--space-xs);
  border-radius: var(--border-radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer {
  text-align: center;
  padding-top: var(--space-xl);
  border-top: 2px solid rgba(255, 255, 255, 0.2);
}

.footer p {
  font-family: var(--ff-system);
  font-size: var(--fs-label-lg);
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .home-container {
    padding: var(--space-lg);
  }

  .component-grid {
    grid-template-columns: 1fr;
  }
}
</style>
