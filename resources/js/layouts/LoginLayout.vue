<template>
  <div class="auth">
    <div class="auth__brand-panel">
      <div class="auth__brand">
        <div class="auth__logo">J</div>
        <span class="auth__brand-name">GrillVibes Admin</span>
      </div>
      <div class="auth__pitch">
        <h2>Welcome back</h2>
        <p>Manage your restaurant, inventory, customers and reports — all from one place.</p>
      </div>
      <div class="auth__glow auth__glow--1" />
      <div class="auth__glow auth__glow--2" />
    </div>

    <div class="auth__form-panel">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
}

.auth__brand-panel {
  position: relative;
  background: linear-gradient(150deg, var(--brand-700), var(--brand) 60%, #6d5cf0);
  color: #fff;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.auth__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 2;
}

.auth__logo {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
}

.auth__brand-name {
  font-weight: 700;
  font-size: 1.15rem;
}

.auth__pitch {
  position: relative;
  z-index: 2;
  max-width: 420px;
}
.auth__pitch h2 {
  color: #fff;
  font-size: 2rem;
  margin: 0 0 12px;
}
.auth__pitch p {
  color: rgba(255, 255, 255, 0.82);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.auth__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
}
.auth__glow--1 {
  width: 320px;
  height: 320px;
  background: #a78bfa;
  top: -80px;
  right: -80px;
}
.auth__glow--2 {
  width: 260px;
  height: 260px;
  background: #38bdf8;
  bottom: -60px;
  left: -60px;
}

.auth__form-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: var(--bg);
}

@media (max-width: 860px) {
  .auth {
    grid-template-columns: 1fr;
  }
  .auth__brand-panel {
    display: none;
  }
}
</style>
