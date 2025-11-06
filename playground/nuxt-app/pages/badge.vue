<template>
  <div class="container">
    <h1>Badge Component</h1>
    <p class="subtitle">Design System Component — Using Exact Figma Design Tokens</p>

    <!-- Superfan Badges (Streak) -->
    <div class="section">
      <h2 class="section-title">Superfan Badges (Streak - with Gradient)</h2>
      <div class="badge-grid">
        <div class="badge-demo">
          <div class="badge badge--small badge--superfan">
            <svg xmlns="http://www.w3.org/2000/svg" class="badge__icon" width="16" height="16" fill="none" viewBox="0 0 16 16">
              <g clip-path="url(#a)">
                <path fill="currentColor" d="M8 13.333a5.333 5.333 0 0 0 5.148-6.735 2.46 2.46 0 0 0 .185-.931 2 2 0 0 0-2-2h-.06c-.052 0-.104.002-.154.006a5.308 5.308 0 0 0-3.12-1.006 5.308 5.308 0 0 0-3.118 1.006 1.906 1.906 0 0 0-.154-.006h-.06a2 2 0 0 0-2 2c0 .34.072.65.185.931-.12.446-.185.917-.185 1.402A5.333 5.333 0 0 0 8 13.333Zm2.723-3.898c.248-.077.498.132.408.378A3.336 3.336 0 0 1 8 12.003 3.338 3.338 0 0 1 4.869 9.81c-.09-.245.16-.454.408-.377A9.22 9.22 0 0 0 8 9.831a9.22 9.22 0 0 0 2.723-.398v.002Zm-1.33-4.768c.282 0 .553.112.75.31l.19.19.19-.19c.198-.198.469-.31.75-.31h.06a1 1 0 0 1 1 1c0 1.112-1.394 1.994-1.854 2.254a.292.292 0 0 1-.292 0c-.46-.26-1.854-1.142-1.854-2.254a1 1 0 0 1 1-1h.06Zm-3.916.31.19.19.19-.19a1.06 1.06 0 0 1 .75-.31h.06a1 1 0 0 1 1 1c0 1.112-1.394 1.994-1.855 2.254a.292.292 0 0 1-.291 0c-.46-.26-1.854-1.142-1.854-2.254a1 1 0 0 1 1-1h.06c.281 0 .552.112.75.31Z"/>
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M2.667 2.667h10.667v10.667H2.667z"/>
                </clipPath>
              </defs>
            </svg>
            <span class="badge__text">Superfan</span>
          </div>
          <span class="badge-label">Small (16px)</span>
        </div>

        <div class="badge-demo">
          <div class="badge badge--large badge--superfan">
            <svg xmlns="http://www.w3.org/2000/svg" class="badge__icon" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <g clip-path="url(#b)">
                <path fill="currentColor" d="M12 20a8 8 0 0 0 7.722-10.103A3.69 3.69 0 0 0 20 8.5a3 3 0 0 0-3-3h-.09a2.858 2.858 0 0 0-.231.01A7.962 7.962 0 0 0 12 4a7.962 7.962 0 0 0-4.679 1.51A2.858 2.858 0 0 0 7.09 5.5H7a3 3 0 0 0-3 3c0 .51.108.975.278 1.397A7.926 7.926 0 0 0 4 12a8 8 0 0 0 8 8Zm4.084-5.847c.373-.116.747.197.613.566A5.004 5.004 0 0 1 12 18.004a5.007 5.007 0 0 1-4.697-3.281c-.134-.368.241-.681.613-.566A13.83 13.83 0 0 0 12 14.746a13.83 13.83 0 0 0 4.084-.596v.003ZM12 7.25c.422 0 .828.168 1.125.466l.284.284.284-.284A1.59 1.59 0 0 1 14.818 7.25h.091a1.5 1.5 0 0 1 1.5 1.5c0 1.669-2.091 2.992-2.781 3.382a.438.438 0 0 1-.438 0C12.5 11.742 10.409 10.419 10.409 8.75a1.5 1.5 0 0 1 1.5-1.5h.091c.422 0 .828.168 1.125.466l.284.284.59-.59ZM6.465 7.716l.284.284.284-.284A1.59 1.59 0 0 1 8.158 7.25h.091a1.5 1.5 0 0 1 1.5 1.5c0 1.669-2.091 2.992-2.781 3.382a.438.438 0 0 1-.438 0c-.69-.39-2.781-1.713-2.781-3.382a1.5 1.5 0 0 1 1.5-1.5h.091c.422 0 .829.168 1.125.466Z"/>
              </g>
              <defs>
                <clipPath id="b">
                  <path fill="#fff" d="M4 4h16v16H4z"/>
                </clipPath>
              </defs>
            </svg>
            <span class="badge__text">Superfan</span>
          </div>
          <span class="badge-label">Large (24px)</span>
        </div>
      </div>
    </div>

    <!-- More badge sections would go here ... -->
    
  </div>
</template>

<style scoped>
.container {
  background: var(--neutral-white);
  border-radius: var(--border-radius-lg);
  padding: var(--space-xxl);
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
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
  margin-bottom: var(--space-xl);
}

.section {
  margin-bottom: var(--space-xl);
}

.section-title {
  font-size: var(--fs-h2);
  font-weight: var(--fw-bold);
  color: var(--text-color-primary);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 2px solid var(--neutral-100);
}

.badge-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
  align-items: center;
}

.badge-demo {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  align-items: center;
}

.badge-label {
  font-family: var(--ff-system);
  font-size: 11px;
  font-weight: var(--fw-bold);
  color: var(--text-color-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Badge Component Styles */
.badge {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

.badge--small {
  height: 16px;
  padding: 0 8px;
  padding-left: var(--space-xxs);
  gap: 2px;
  border-radius: 6px;
}

.badge--large {
  height: 24px;
  padding: 0 8px;
  padding-left: var(--space-xxs);
  gap: 4px;
  border-radius: 8px;
}

.badge__icon {
  flex-shrink: 0;
  display: block;
  color: var(--color-icon-black);
}

.badge--small .badge__icon {
  width: 16px;
  height: 16px;
}

.badge--large .badge__icon {
  width: 24px;
  height: 24px;
}

.badge__text {
  white-space: pre;
  margin: 0;
  color: var(--text-color-primary);
}

.badge--small .badge__text {
  font-family: var(--ff-primary);
  font-size: 10px;
  font-weight: var(--fw-bold);
  line-height: 20px;
  letter-spacing: var(--ls-md);
}

.badge--large .badge__text {
  font-family: var(--ff-primary);
  font-size: 12px;
  font-weight: var(--fw-bold);
  line-height: 20px;
  letter-spacing: var(--ls-md);
}

.badge--superfan {
  background: linear-gradient(103.08deg, rgba(249, 168, 212, 0.5) 5.22%, rgba(196, 181, 253, 0.5) 97.23%);
}
</style>
