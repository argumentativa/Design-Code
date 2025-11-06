<template>
  <div class="page-container">
    <h1>Post Comment Component</h1>
    <p class="subtitle">Design System Component — Using Figma Design Tokens</p>

    <!-- Comment Example -->
    <div class="section">
      <h2 class="section-title">Comment with All Features</h2>

      <div class="comment">
        <div class="comment__avatar">
          <div class="avatar avatar--medium">
            <div class="avatar__initials">
              <p>JD</p>
            </div>
          </div>
        </div>

        <div class="comment__content">
          <div class="comment__header">
            <div class="comment__meta">
              <span class="comment__author">John Doe</span>
              <span class="comment__badge badge badge--small badge--superfan">
                <span class="badge__text">Superfan</span>
              </span>
              <span class="comment__timestamp">2 hours ago</span>
            </div>
          </div>

          <div class="comment__body">
            <p>This is an example comment showing how the post component works with avatars, badges, and actions.</p>
          </div>

          <div class="comment__actions">
            <button class="action-button">Reply</button>
            <button class="action-button">Share</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
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

.comment {
  display: flex;
  gap: var(--space-s);
  padding: var(--space-lg);
  background: var(--neutral-20);
  border-radius: var(--border-radius-md);
}

.comment__avatar {
  flex-shrink: 0;
}

.avatar {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  flex-shrink: 0;
}

.avatar--medium {
  width: 40px;
  height: 40px;
}

.avatar__initials {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ddd6fe;
  border-radius: 50%;
  z-index: 0;
  clip-path: circle(50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

.avatar__initials p {
  margin: 0;
  font-family: var(--ff-primary);
  font-weight: var(--fw-bold);
  color: var(--neutral-white);
  font-size: 14px;
  line-height: 20px;
}

.comment__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.comment__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment__meta {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.comment__author {
  font-size: var(--fs-body-default);
  font-weight: var(--fw-bold);
  color: var(--text-color-primary);
}

.comment__badge {
  display: inline-flex;
}

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
  gap: 2px;
  border-radius: 6px;
}

.badge--superfan {
  background: linear-gradient(103.08deg, rgba(249, 168, 212, 0.5) 5.22%, rgba(196, 181, 253, 0.5) 97.23%);
}

.badge__text {
  font-family: var(--ff-primary);
  font-size: 10px;
  font-weight: var(--fw-bold);
  line-height: 20px;
  letter-spacing: -0.1px;
  color: var(--text-color-primary);
}

.comment__timestamp {
  font-size: var(--fs-label-md);
  color: var(--text-color-secondary);
}

.comment__body {
  font-size: var(--fs-body-default);
  line-height: var(--lh-md);
  color: var(--text-color-primary);
}

.comment__actions {
  display: flex;
  gap: var(--space-xs);
  margin-top: var(--space-xs);
}

.action-button {
  background: transparent;
  border: none;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-family: var(--ff-primary);
  font-weight: var(--fw-bold);
  font-size: var(--fs-label-lg);
  color: var(--text-color-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: var(--neutral-50);
}
</style>
