<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme.js'


const { theme, setTheme } = useTheme()
const isMobileMenuOpen = ref(false)
const isUserRegistered = ref(false)

defineEmits(['open-bmi'])

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  const savedUser = localStorage.getItem('gym_user')
  if (savedUser) {
    isUserRegistered.value = true
  }
})
</script>

<template>
  <header class="navbar-wrap">
    <div class="container navbar-inner d-flex align-items-center justify-content-between">
      
      <!-- Left side Links (تغيير Plans لـ Trainers) -->
      <nav class="nav-side nav-left d-none d-lg-flex">
        <a href="#home" class="site-link site-link--active">Home</a>
        <RouterLink to="/trainers" class="site-link">Trainers</RouterLink>
        <RouterLink to="/schedule" class="site-link">Schedule</RouterLink>
      </nav>

      <!-- Center Logo -->
      <a href="#home" class="navbar-brand d-flex align-items-center justify-content-center gap-2 text-decoration-none">
        <span class="logo-bars" aria-hidden="true">|||</span>
        <span class="d-flex flex-column align-items-center lh-1">
          <strong class="display-font fs-4 text-white">GYM</strong>
          <small class="text-uppercase logo-sub">Fitness &amp; Health</small>
        </span>
        <span class="logo-bars" aria-hidden="true">|||</span>
      </a>

      <!-- Right side Links + Tools (Desktop) -->
      <div class="nav-side nav-right d-none d-lg-flex align-items-center justify-content-end gap-3">
        <RouterLink to="/about" class="site-link">About</RouterLink>
        <RouterLink to="/contact" class="site-link">Contact</RouterLink>

        <!-- BMI Calc -->
        <button
          type="button"
          class="btn-calc"
          aria-label="Open BMI calculator"
          @click="$emit('open-bmi')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2"></rect>
            <line x1="8" y1="6" x2="16" y2="6"></line>
            <line x1="16" y1="14" x2="16" y2="18"></line>
            <path d="M16 10h.01"></path>
            <path d="M12 10h.01"></path>
            <path d="M8 10h.01"></path>
            <path d="M12 14h.01"></path>
            <path d="M8 14h.01"></path>
            <path d="M12 18h.01"></path>
            <path d="M8 18h.01"></path>
          </svg>
        </button>

        <div v-if="isUserRegistered">
          <router-link to="/dashboard" class="btn-dashboard">
            Dashboard
          </router-link>
        </div>

        <div v-else class="gender-toggle">
          <button
            type="button"
            class="toggle-btn male-btn"
            :class="{ 'active': theme === 'male' }"
            @click="setTheme('male')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="10" cy="14" r="5"></circle>
              <line x1="19" y1="5" x2="13.6" y2="10.4"></line>
              <polyline points="19 10 19 5 14 5"></polyline>
            </svg>
          </button>
          <button
            type="button"
            class="toggle-btn female-btn"
            :class="{ 'active': theme === 'female' }"
            @click="setTheme('female')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="9" r="5"></circle>
              <line x1="12" y1="14" x2="12" y2="21"></line>
              <line x1="9" y1="18" x2="15" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="d-flex align-items-center gap-2 d-lg-none">
        <button
          type="button"
          class="btn-calc"
          aria-label="Open BMI calculator"
          @click="$emit('open-bmi')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2"></rect>
            <line x1="8" y1="6" x2="16" y2="6"></line>
            <line x1="16" y1="14" x2="16" y2="18"></line>
            <path d="M16 10h.01"></path>
            <path d="M12 10h.01"></path>
            <path d="M8 10h.01"></path>
            <path d="M12 14h.01"></path>
            <path d="M8 14h.01"></path>
            <path d="M12 18h.01"></path>
            <path d="M8 18h.01"></path>
          </svg>
        </button>

        <div v-if="isUserRegistered">
          <router-link to="/dashboard" class="btn-dashboard">
            Dashboard
          </router-link>
        </div>

        <div v-else class="gender-toggle">
          <button
            type="button"
            class="toggle-btn male-btn"
            :class="{ 'active': theme === 'male' }"
            @click="setTheme('male')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="10" cy="14" r="5"></circle>
              <line x1="19" y1="5" x2="13.6" y2="10.4"></line>
              <polyline points="19 10 19 5 14 5"></polyline>
            </svg>
          </button>
          <button
            type="button"
            class="toggle-btn female-btn"
            :class="{ 'active': theme === 'female' }"
            @click="setTheme('female')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="9" r="5"></circle>
              <line x1="12" y1="14" x2="12" y2="21"></line>
              <line x1="9" y1="18" x2="15" y2="18"></line>
            </svg>
          </button>
        </div>

        <button class="hamburger-btn" @click="toggleMobileMenu">
          <span></span><span></span><span></span>
        </button>
      </div>

    </div>

    <!-- Mobile Dropdown -->
    <div v-if="isMobileMenuOpen" class="mobile-menu d-lg-none py-3">
      <div class="container d-flex flex-column gap-2">
        <a href="#home" class="site-link" @click="isMobileMenuOpen = false">Home</a>
        <RouterLink to="/trainers" class="site-link" @click="isMobileMenuOpen = false">Trainers</RouterLink>

        <RouterLink to="/schedule" class="site-link" @click="isMobileMenuOpen = false">Schedule</RouterLink>
        <RouterLink to="/about" class="site-link" @click="isMobileMenuOpen = false">About</RouterLink>
        <RouterLink to="/contact" class="site-link" @click="isMobileMenuOpen = false">Contact</RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar-wrap {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-navbar-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
}

.navbar-inner {
  height: 60px;
}

.nav-side {
  flex: 1;
}

.nav-left {
  display: flex;
  gap: 1.8rem;
}

.site-link {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text);
  opacity: 0.8;
  transition: all 0.2s ease;
  text-decoration: none;
}

.site-link:hover, .site-link--active {
  opacity: 1;
  color: var(--color-primary-light);
}

.logo-bars {
  font-size: 16px;
  letter-spacing: 2px;
  color: var(--color-primary-light);
}

.logo-sub {
  font-size: 8px;
  letter-spacing: 0.2em;
  color: var(--color-text-muted);
}

.btn-calc {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.btn-calc:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: var(--color-primary-light);
  color: var(--color-primary-light);
}

.btn-dashboard {
  background: var(--color-primary-light, #0066ff);
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-dashboard:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Gender Toggle Modern Pill Style */
.gender-toggle {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 3px;
}

.toggle-btn {
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  padding: 5px 9px;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.male-btn.active {
  background-color: #0066ff;
  color: #ffffff;
}

.female-btn.active {
  background-color: #ff2d75;
  color: #ffffff;
}

.hamburger-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 26px;
  height: 20px;
  background: transparent;
  border: none;
  padding: 0;
}

.hamburger-btn span {
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  border-radius: 2px;
}

.mobile-menu {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

@media (max-width: 576px) {
  .btn-calc {
    width: 32px;
    height: 32px;
  }
  .toggle-btn {
    padding: 4px 7px;
  }
}
</style>