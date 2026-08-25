<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme.js'

const { theme, setTheme } = useTheme()
const router = useRouter()
const route = useRoute()

const isMobileMenuOpen = ref(false)
const isLoggedIn = ref(false)
const stars = ref([])

defineEmits(['open-bmi'])

const isDashboardPage = computed(() => route.path === '/dashboard')

function checkUser() {
  const registeredUser = localStorage.getItem('gym_registered_user')
  const activeSession = localStorage.getItem('gym_active_session') === 'true'

  isLoggedIn.value = !!(registeredUser && activeSession)
}

function handleLogout() {
  localStorage.removeItem('gym_active_session')
  isLoggedIn.value = false
  router.push('/register')
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function generateStars() {
  const count = 40

  stars.value = Array.from({ length: count }, (_, index) => ({
    id: index,

    left: Math.random() * 100,
    top: Math.random() * 100,

    size: Math.random() * 2.5 + 1,

    opacity: Math.random() * 0.6 + 0.3,

    duration: Math.random() * 2 + 1.5,

    delay: Math.random() * 3
  }))
}

watch(() => route.path, () => {
  checkUser()
})

onMounted(() => {
  checkUser()
  generateStars()
})
</script>

<template>
  <header class="navbar-wrap">

    <!-- ✨ Random Glowing Stars -->
    <div class="navbar-stars" aria-hidden="true">
      <span
        v-for="star in stars"
        :key="star.id"
        class="random-star"
        :style="{
          left: `${star.left}%`,
          top: `${star.top}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          opacity: star.opacity,
          animationDuration: `${star.duration}s`,
          animationDelay: `${star.delay}s`
        }"
      ></span>
    </div>

    <!-- Navbar Content -->
    <div class="container navbar-inner d-flex align-items-center justify-content-between">

      <!-- Left Navigation -->
      <nav class="nav-side nav-left d-none d-lg-flex">
        <RouterLink to="/" class="site-link">
          Home
        </RouterLink>

        <RouterLink to="/trainers" class="site-link">
          Trainers
        </RouterLink>

        <RouterLink to="/schedule" class="site-link">
          Schedule
        </RouterLink>
      </nav>


      <!-- Logo -->
      <a
        href="/"
        class="navbar-brand d-flex align-items-center justify-content-center gap-2 text-decoration-none"
      >
        <span class="logo-bars" aria-hidden="true">|||</span>

        <span class="d-flex flex-column align-items-center lh-1">
          <strong class="display-font fs-4 text-white">
            GYM
          </strong>

          <small class="text-uppercase logo-sub">
            Fitness &amp; Health
          </small>
        </span>

        <span class="logo-bars" aria-hidden="true">|||</span>
      </a>


      <!-- Right Navigation -->
      <div
        class="nav-side nav-right d-none d-lg-flex align-items-center justify-content-end gap-3"
      >

        <!-- Dashboard / Login -->
        <RouterLink
          v-if="isLoggedIn"
          to="/dashboard"
          class="site-link"
        >
          Dashboard
        </RouterLink>

        <RouterLink
          v-else
          to="/register?mode=login"
          class="site-link"
        >
          Login
        </RouterLink>


        <!-- Contact -->
        <RouterLink
          to="/contact"
          class="site-link"
        >
          Contact
        </RouterLink>


        <!-- Gender Toggle -->
        <div
          v-if="!isDashboardPage"
          class="gender-toggle"
        >

          <!-- Male -->
          <button
            type="button"
            class="toggle-btn male-btn"
            :class="{ active: theme === 'male' }"
            @click="setTheme('male')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="10" cy="14" r="5"></circle>
              <line x1="19" y1="5" x2="13.6" y2="10.4"></line>
              <polyline points="19 10 19 5 14 5"></polyline>
            </svg>
          </button>


          <!-- Female -->
          <button
            type="button"
            class="toggle-btn female-btn"
            :class="{ active: theme === 'female' }"
            @click="setTheme('female')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="9" r="5"></circle>
              <line x1="12" y1="14" x2="12" y2="21"></line>
              <line x1="9" y1="18" x2="15" y2="18"></line>
            </svg>
          </button>

        </div>


        <!-- BMI Calculator -->
        <button
          type="button"
          class="btn-calc"
          aria-label="Open BMI calculator"
          @click="$emit('open-bmi')"
          title="BMI Calculator"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="4" y="2" width="16" height="20" rx="2"></rect>
            <line x1="8" y1="6" x2="16" y2="6"></line>
            <line x1="16" y1="14" x2="16" y2="18"></line>
          </svg>
        </button>


        <!-- Logout -->
        <button
          v-if="isLoggedIn"
          @click="handleLogout"
          class="btn-icon-logout"
          title="Logout"
          aria-label="Logout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>

      </div>


      <!-- Mobile -->
      <div class="d-flex align-items-center gap-2 d-lg-none">

        <RouterLink
          v-if="isLoggedIn"
          to="/dashboard"
          class="site-link fs-6"
        >
          Dashboard
        </RouterLink>

        <RouterLink
          v-else
          to="/register?mode=login"
          class="site-link fs-6"
        >
          Login
        </RouterLink>

        <button
          class="hamburger-btn"
          @click="toggleMobileMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

    </div>


    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="mobile-menu d-lg-none py-3"
    >
      <div class="container d-flex flex-column gap-2">

        <RouterLink
          to="/"
          class="site-link"
          @click="isMobileMenuOpen = false"
        >
          Home
        </RouterLink>

        <RouterLink
          to="/trainers"
          class="site-link"
          @click="isMobileMenuOpen = false"
        >
          Trainers
        </RouterLink>

        <RouterLink
          to="/schedule"
          class="site-link"
          @click="isMobileMenuOpen = false"
        >
          Schedule
        </RouterLink>

        <RouterLink
          to="/contact"
          class="site-link"
          @click="isMobileMenuOpen = false"
        >
          Contact
        </RouterLink>

        <RouterLink
          v-if="isLoggedIn"
          to="/dashboard"
          class="site-link"
          @click="isMobileMenuOpen = false"
        >
          Dashboard
        </RouterLink>

        <button
          v-if="isLoggedIn"
          @click="handleLogout"
          class="site-link text-start bg-transparent border-0 text-danger p-0"
        >
          Logout
        </button>

      </div>
    </div>

  </header>
</template>


<style scoped>

.navbar-wrap {
  position: sticky;
  top: 0;
  z-index: 100;
  overflow: hidden;

  background-color: var(--color-navbar-bg);
  backdrop-filter: blur(10px);

  border-bottom: 1px solid var(--color-border);
}

.navbar-stars {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;

  z-index: 0;

  overflow: hidden;
}


.random-star {
  position: absolute;

  border-radius: 50%;

  background: var(--color-primary-light);

  box-shadow:
    0 0 4px var(--color-primary-light),
    0 0 8px var(--color-primary-light),
    0 0 14px var(--color-primary-light),
    0 0 20px var(--color-primary-light);

  animation: twinkle ease-in-out infinite;
}


@keyframes twinkle {

  0% {
    transform: scale(0.5);
    opacity: 0.2;
  }

  25% {
    transform: scale(0.9);
    opacity: 0.5;
  }

  50% {
    transform: scale(1.5);
    opacity: 1;
  }

  75% {
    transform: scale(0.9);
    opacity: 0.5;
  }

  100% {
    transform: scale(0.5);
    opacity: 0.2;
  }

}


.navbar-inner {
  height: 60px;

  position: relative;

  z-index: 2;
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

.site-link:hover,
.router-link-active {
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

.btn-calc,
.btn-icon-logout {
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

  color: var(--color-primary-light);

  box-shadow:
    0 0 10px var(--color-primary-light);
}

.btn-icon-logout {
  color: #ff5252;

  border-color: rgba(255, 82, 82, 0.25);
}

.btn-icon-logout:hover {
  background: rgba(255, 82, 82, 0.15);

  border-color: rgba(255, 82, 82, 0.5);
}

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
}


.male-btn.active {
  background-color: #2563eb;

  color: #ffffff;

  box-shadow: 0 0 12px rgba(37, 99, 235, 0.6);
}


.female-btn.active {
  background-color: #ff2d75;

  color: #ffffff;

  box-shadow: 0 0 12px rgba(255, 45, 117, 0.6);
}

.hamburger-btn {
  display: flex;

  flex-direction: column;

  justify-content: space-around;

  width: 26px;

  height: 20px;

  background: transparent;

  border: none;
}


.hamburger-btn span {
  width: 100%;

  height: 2px;

  background-color: var(--color-text);

  border-radius: 2px;
}


.mobile-menu {
  position: relative;

  z-index: 3;

  background-color: var(--color-navbar-bg);

  border-top: 1px solid var(--color-border);
}


.random-star:nth-child(7n) {
  box-shadow:
    0 0 5px var(--color-primary-light),
    0 0 12px var(--color-primary-light),
    0 0 22px var(--color-primary-light);
}

.random-star:nth-child(3n) {
  filter: blur(0.3px);
}

</style>