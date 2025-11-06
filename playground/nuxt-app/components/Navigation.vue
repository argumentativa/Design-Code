<template>
  <nav class="nav">
    <div class="nav__container">
      <NuxtLink to="/" class="nav__home">← Home</NuxtLink>
      <div class="nav__links">
        <NuxtLink to="/avatar" class="nav__link">Avatar</NuxtLink>
        <NuxtLink to="/badge" class="nav__link">Badge</NuxtLink>
        <NuxtLink to="/button" class="nav__link">Button</NuxtLink>
        <NuxtLink to="/post" class="nav__link">Post</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: var(--space-s) var(--space-lg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.nav__home {
  font-family: var(--ff-system);
  font-size: 14px;
  font-weight: var(--fw-bold);
  color: var(--neutral-900);
  text-decoration: none;
  padding: var(--space-xs) var(--space-s);
  border-radius: var(--border-radius-sm);
  transition: all 0.2s ease;
}

.nav__home:hover {
  background: var(--neutral-50);
}

.nav__links {
  display: flex;
  gap: var(--space-xs);
  flex-wrap: wrap;
  flex: 1;
}

.nav__link {
  font-family: var(--ff-primary);
  font-size: 14px;
  font-weight: var(--fw-medium);
  color: var(--neutral-700);
  text-decoration: none;
  padding: var(--space-xs) var(--space-s);
  border-radius: var(--border-radius-sm);
  transition: all 0.2s ease;
}

.nav__link:hover {
  background: var(--neutral-50);
  color: var(--neutral-900);
}

.nav__link.router-link-active {
  background: var(--brand-raptive-primary-blue);
  color: var(--neutral-white);
}

.nav__link.router-link-active:hover {
  background: var(--brand-raptive-primary-blue);
  color: var(--neutral-white);
}
</style>
