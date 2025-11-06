<template>
  <div class="app-layout">
    <Navigation />

    <div class="page-wrapper">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.page-wrapper {
  padding: var(--space-lg);
}
</style>
