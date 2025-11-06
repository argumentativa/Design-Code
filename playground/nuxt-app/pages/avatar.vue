<template>
  <div class="container">
    <h1>Avatar Component</h1>
    <p class="subtitle">Design System Component — Using Exact Figma Design Tokens</p>

    <!-- XXsmall Avatars -->
    <div class="section">
      <h2 class="section-title">XXsmall Avatars (16px)</h2>
      <div class="avatar-grid">
        <div class="avatar-demo">
          <div class="avatar avatar--xxsmall">
            <div class="avatar__image"></div>
            <div class="avatar__online"></div>
          </div>
          <span class="avatar-label">Image + Online</span>
        </div>

        <div class="avatar-demo">
          <div class="avatar avatar--xxsmall">
            <div class="avatar__initials">
              <p>A</p>
            </div>
          </div>
          <span class="avatar-label">Initials</span>
        </div>
      </div>
    </div>

    <!-- XSmall Avatars -->
    <div class="section">
      <h2 class="section-title">XSmall Avatars (24px)</h2>
      <div class="avatar-grid">
        <div class="avatar-demo">
          <div class="avatar avatar--xs">
            <div class="avatar__image"></div>
            <div class="avatar__online"></div>
          </div>
          <span class="avatar-label">Image + Online</span>
        </div>

        <div class="avatar-demo">
          <div class="avatar avatar--xs">
            <div class="avatar__initials">
              <p>B</p>
            </div>
          </div>
          <span class="avatar-label">Initials</span>
        </div>
      </div>
    </div>

    <!-- Small Avatars -->
    <div class="section">
      <h2 class="section-title">Small Avatars (32px)</h2>
      <div class="avatar-grid">
        <div class="avatar-demo">
          <div class="avatar avatar--small">
            <div class="avatar__image-wrapper">
              <div class="avatar__image"></div>
            </div>
            <div class="avatar__online"></div>
          </div>
          <span class="avatar-label">Image + Online</span>
        </div>

        <div class="avatar-demo">
          <div class="avatar avatar--small">
            <div class="avatar__initials">
              <p>C</p>
            </div>
            <div class="avatar__creator-badge"></div>
          </div>
          <span class="avatar-label">Initials + Creator</span>
        </div>

        <div class="avatar-demo">
          <div class="avatar avatar--small">
            <div class="avatar__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path fill="currentColor" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 1.333c-2.667 0-8 1.334-8 4v.667c0 .733.6 1.333 1.333 1.333h13.334c.733 0 1.333-.6 1.333-1.333v-.667c0-2.666-5.333-4-8-4Z"/>
              </svg>
            </div>
          </div>
          <span class="avatar-label">Icon</span>
        </div>
      </div>
    </div>

    <!-- Medium Avatars -->
    <div class="section">
      <h2 class="section-title">Medium Avatars (40px)</h2>
      <div class="avatar-grid">
        <div class="avatar-demo">
          <div class="avatar avatar--medium">
            <div class="avatar__image"></div>
          </div>
          <span class="avatar-label">Image</span>
        </div>

        <div class="avatar-demo">
          <div class="avatar avatar--medium">
            <div class="avatar__image"></div>
            <div class="avatar__online"></div>
          </div>
          <span class="avatar-label">Image + Online</span>
        </div>

        <div class="avatar-demo">
          <div class="avatar avatar--medium">
            <div class="avatar__image"></div>
            <div class="avatar__creator-badge"></div>
          </div>
          <span class="avatar-label">Image + Creator</span>
        </div>

        <div class="avatar-demo">
          <div class="avatar avatar--medium">
            <div class="avatar__initials">
              <p>D</p>
            </div>
          </div>
          <span class="avatar-label">Initials</span>
        </div>

        <div class="avatar-demo">
          <div class="avatar avatar--medium">
            <div class="avatar__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path fill="currentColor" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 1.333c-2.667 0-8 1.334-8 4v.667c0 .733.6 1.333 1.333 1.333h13.334c.733 0 1.333-.6 1.333-1.333v-.667c0-2.666-5.333-4-8-4Z"/>
              </svg>
            </div>
            <div class="avatar__creator-badge"></div>
          </div>
          <span class="avatar-label">Icon + Creator</span>
        </div>

        <div class="avatar-demo">
          <div class="avatar avatar--medium">
            <div class="avatar__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path fill="currentColor" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 1.333c-2.667 0-8 1.334-8 4v.667c0 .733.6 1.333 1.333 1.333h13.334c.733 0 1.333-.6 1.333-1.333v-.667c0-2.666-5.333-4-8-4Z"/>
              </svg>
            </div>
            <div class="avatar__online"></div>
          </div>
          <span class="avatar-label">Icon + Online</span>
        </div>
      </div>
    </div>

    <!-- Large Avatars -->
    <div class="section">
      <h2 class="section-title">Large Avatars (48px)</h2>
      <div class="avatar-grid">
        <div class="avatar-demo">
          <div class="avatar avatar--large">
            <div class="avatar__image"></div>
            <div class="avatar__online"></div>
          </div>
          <span class="avatar-label">Image + Online</span>
        </div>

        <div class="avatar-demo">
          <div class="avatar avatar--large">
            <div class="avatar__initials">
              <p>E</p>
            </div>
            <div class="avatar__online"></div>
          </div>
          <span class="avatar-label">Initials + Online</span>
        </div>

        <div class="avatar-demo">
          <div class="avatar avatar--large">
            <div class="avatar__initials">
              <p>F</p>
            </div>
            <div class="avatar__online"></div>
            <div class="avatar__creator-badge"></div>
          </div>
          <span class="avatar-label">All Features</span>
        </div>
      </div>
    </div>

    <!-- XLarge Avatars -->
    <div class="section">
      <h2 class="section-title">XLarge Avatars (96px)</h2>
      <div class="avatar-grid">
        <div class="avatar-demo">
          <div class="avatar avatar--xlarge">
            <div class="avatar__initials">
              <p>G</p>
            </div>
            <div class="avatar__online"></div>
            <div class="avatar__creator-badge"></div>
          </div>
          <span class="avatar-label">All Features</span>
        </div>
      </div>
    </div>

    <!-- Design Tokens -->
    <div class="tokens-section">
      <h2 class="section-title">Design Tokens Used</h2>
      <div class="token-grid">
        <div class="token-item">
          <span class="token-name">XXsmall Size</span>
          <span>--avatar-size-xxsmall (16px)</span>
        </div>
        <div class="token-item">
          <span class="token-name">XSmall Size</span>
          <span>--avatar-size-xs (24px)</span>
        </div>
        <div class="token-item">
          <span class="token-name">Small Size</span>
          <span>--avatar-size-small (32px)</span>
        </div>
        <div class="token-item">
          <span class="token-name">Medium Size</span>
          <span>--avatar-size-medium (40px)</span>
        </div>
        <div class="token-item">
          <span class="token-name">Large Size</span>
          <span>--avatar-size-large (48px)</span>
        </div>
        <div class="token-item">
          <span class="token-name">XLarge Size</span>
          <span>--avatar-size-xlarge (96px)</span>
        </div>
        <div class="token-item">
          <span class="token-name">Border Radius</span>
          <span>--avatar-border-radius (50%)</span>
        </div>
        <div class="token-item">
          <span class="token-name">Online Indicator</span>
          <span>Size-specific tokens</span>
        </div>
        <div class="token-item">
          <span class="token-name">Creator Badge</span>
          <span>24px (small) / 48px (large)</span>
        </div>
        <div class="token-item">
          <span class="token-name">Initials Font</span>
          <span>Size-specific tokens</span>
        </div>
      </div>
    </div>
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

.avatar-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
  align-items: center;
}

.avatar-demo {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  align-items: center;
}

.avatar-label {
  font-family: var(--ff-system);
  font-size: 11px;
  font-weight: var(--fw-bold);
  color: var(--text-color-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Avatar Component Styles */
.avatar {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  flex-shrink: 0;
}

/* Avatar Sizes */
.avatar--xxsmall {
  width: var(--avatar-size-xxsmall);
  height: var(--avatar-size-xxsmall);
}

.avatar--xs {
  width: var(--avatar-size-xs);
  height: var(--avatar-size-xs);
}

.avatar--small {
  width: var(--avatar-size-small);
  height: var(--avatar-size-small);
}

.avatar--medium {
  width: var(--avatar-size-medium);
  height: var(--avatar-size-medium);
}

.avatar--large {
  width: var(--avatar-size-large);
  height: var(--avatar-size-large);
}

.avatar--xlarge {
  width: var(--avatar-size-xlarge);
  height: var(--avatar-size-xlarge);
}

/* Avatar Image */
.avatar__image {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: var(--avatar-border-radius);
  z-index: 0;
  clip-path: circle(50%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.avatar__image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--avatar-border-radius);
  overflow: hidden;
  background-color: var(--neutral-50);
  z-index: 0;
}

.avatar__image-wrapper .avatar__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}

/* Image positioning offsets from Figma */
.avatar--large .avatar__image,
.avatar--xlarge .avatar__image {
  left: -1.04%;
  right: 1.04%;
}

.avatar--medium .avatar__image {
  left: -1.25%;
  right: 1.25%;
}

.avatar--xs .avatar__image,
.avatar--xxsmall .avatar__image {
  left: -2.08%;
  right: 2.08%;
}

/* Avatar Initials */
.avatar__initials {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--purple-100);
  border-radius: var(--avatar-border-radius);
  z-index: 0;
  clip-path: circle(50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

.avatar--large .avatar__initials {
  width: var(--avatar-size-large);
  height: var(--avatar-size-large);
}

.avatar--xlarge .avatar__initials {
  width: var(--avatar-size-xlarge);
  height: var(--avatar-size-xlarge);
}

.avatar__initials p {
  margin: 0;
  font-family: var(--ff-primary);
  font-weight: var(--fw-bold);
  color: var(--text-color-inverse);
  text-align: center;
  white-space: nowrap;
}

.avatar--xxsmall .avatar__initials p {
  font-size: var(--avatar-initials-size-xxsmall);
  line-height: var(--avatar-initials-size-xxsmall);
}

.avatar--xs .avatar__initials p {
  font-size: var(--avatar-initials-size-xs);
  line-height: var(--avatar-initials-size-xs);
}

.avatar--small .avatar__initials p {
  font-size: var(--avatar-initials-size-small);
  line-height: 16px;
}

.avatar--medium .avatar__initials p {
  font-size: var(--avatar-initials-size-medium);
  line-height: 20px;
}

.avatar--large .avatar__initials p {
  font-size: var(--avatar-initials-size-large);
  line-height: 24px;
}

.avatar--xlarge .avatar__initials p {
  font-size: var(--avatar-initials-size-xlarge);
  line-height: 48px;
}

/* Avatar Icon */
.avatar__icon {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--purple-100);
  padding: var(--space-xxs);
  box-sizing: border-box;
  border-radius: var(--avatar-border-radius);
  z-index: 0;
  clip-path: circle(50%);
}

.avatar__icon svg {
  width: 16px;
  height: 16px;
  color: var(--neutral-900);
}

/* Online Status Indicator */
.avatar__online {
  position: absolute;
  z-index: 2;
  box-sizing: border-box;
  background: #22c55e;
  border: 2px solid var(--neutral-white);
  border-radius: 50%;
}

.avatar--xxsmall .avatar__online {
  width: var(--avatar-online-size-xxsmall);
  height: var(--avatar-online-size-xxsmall);
  bottom: var(--avatar-online-offset-xxsmall-bottom);
  right: var(--avatar-online-offset-xxsmall-right);
}

.avatar--xs .avatar__online {
  width: var(--avatar-online-size-xs);
  height: var(--avatar-online-size-xs);
  bottom: var(--avatar-online-offset-xs-bottom);
  right: var(--avatar-online-offset-xs-right);
}

.avatar--small .avatar__online {
  width: var(--avatar-online-size-small);
  height: var(--avatar-online-size-small);
  bottom: var(--avatar-online-offset-small-bottom);
  right: var(--avatar-online-offset-small-right);
}

.avatar--medium .avatar__online {
  width: var(--avatar-online-size-medium);
  height: var(--avatar-online-size-medium);
  bottom: var(--avatar-online-offset-medium-bottom);
  right: var(--avatar-online-offset-medium-right);
}

.avatar--large .avatar__online {
  width: var(--avatar-online-size-large);
  height: var(--avatar-online-size-large);
  bottom: var(--avatar-online-offset-large-bottom);
  right: var(--avatar-online-offset-large-right);
}

.avatar--xlarge .avatar__online {
  width: var(--avatar-online-size-xlarge);
  height: var(--avatar-online-size-xlarge);
  bottom: var(--avatar-online-offset-xlarge-bottom);
  right: var(--avatar-online-offset-xlarge-right);
}

/* Creator Badge */
.avatar__creator-badge {
  position: absolute;
  bottom: 0;
  right: var(--avatar-creator-badge-offset-small);
  width: var(--avatar-creator-badge-size-small);
  height: var(--avatar-creator-badge-size-small);
  border-radius: 50%;
  overflow: hidden;
  z-index: 3;
  box-sizing: border-box;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.avatar--large .avatar__creator-badge {
  width: var(--avatar-size-small);
  height: var(--avatar-size-small);
  right: var(--avatar-creator-badge-offset-small);
}

.avatar--xlarge .avatar__creator-badge {
  width: var(--avatar-creator-badge-size-large);
  height: var(--avatar-creator-badge-size-large);
  right: var(--avatar-creator-badge-offset-large);
}

.tokens-section {
  margin-top: var(--space-xl);
  padding-top: var(--space-xl);
  border-top: 2px solid var(--neutral-100);
}

.token-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-sm);
}

.token-item {
  font-family: var(--ff-system);
  font-size: 11px;
  color: var(--text-color-secondary);
  padding: var(--space-xs) var(--space-sm);
  background: var(--neutral-20);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
}

.token-name {
  font-weight: var(--fw-bold);
  color: #6b65ff;
}
</style>
