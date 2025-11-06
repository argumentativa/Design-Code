<template>
  <div class="button-container">
    <div class="container">
      <div class="header">
        <h1>Brand Primary Button States</h1>
        <p class="subtitle">Design System Component — Using Figma Design Tokens</p>
      </div>

      <!-- Button States -->
      <div class="button-grid">
        <div class="button-demo">
          <button class="button button--brand-primary state-default">
            Click Me
          </button>
          <span class="demo-label">Default</span>
        </div>

        <div class="button-demo">
          <button class="button button--brand-primary state-hover">
            Hover Me
          </button>
          <span class="demo-label">Hover</span>
        </div>

        <div class="button-demo">
          <button class="button button--brand-primary state-active">
            Press Me
          </button>
          <span class="demo-label">Active</span>
        </div>

        <div class="button-demo">
          <button class="button button--brand-primary state-disabled" disabled>
            Disabled
          </button>
          <span class="demo-label">Disabled</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
}

.container {
  background: var(--neutral-white);
  border-radius: var(--border-radius-lg);
  padding: var(--space-xxl);
  max-width: 900px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

h1 {
  font-size: var(--fs-display);
  font-weight: var(--fw-bold);
  line-height: var(--lh-xl);
  color: var(--text-color-primary);
  margin-bottom: var(--space-xs);
}

.subtitle {
  font-family: var(--ff-system);
  font-size: 14px;
  font-weight: var(--fw-medium);
  color: var(--text-color-secondary);
  letter-spacing: var(--ls-md);
}

.button-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
  justify-content: center;
}

.button-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.demo-label {
  font-family: var(--ff-system);
  font-size: 11px;
  font-weight: var(--fw-bold);
  color: var(--text-color-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Button Styles */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: var(--space-xs) var(--space-s);
  border-radius: 24px;
  font-family: var(--ff-primary);
  font-size: var(--fs-body-default);
  font-weight: var(--fw-bold);
  line-height: var(--lh-md);
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  gap: var(--space-xxs);
}

.button--brand-primary {
  background-color: var(--brand-tertiary-yellow-brand-500);
  color: var(--green-800);
}

.button--brand-primary:hover,
.button--brand-primary.state-hover {
  background-color: #c4e653;
}

.button--brand-primary:active,
.button--brand-primary.state-active {
  background-color: #b5d945;
}

.button--brand-primary:disabled,
.button--brand-primary.state-disabled {
  background-color: var(--neutral-50);
  color: var(--neutral-200);
  cursor: not-allowed;
}
</style>
