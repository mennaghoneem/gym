<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme.js'
import heroMale from '../assets/hero-male1.jpg'
import heroFemale from '../assets/hero-female1.jpg'

const { isFemale } = useTheme()

const heroImage = computed(() => (isFemale() ? heroFemale : heroMale))

const isScrolled = ref(false)

const handleScroll = () => {
  if (window.scrollY > 80) {
    isScrolled.value = true
  } else {
    isScrolled.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section id="home" class="hero">
    <div class="hero__media">
      <img :key="heroImage" :src="heroImage" alt="GYM Hero" class="hero__img" />
      <div class="hero__overlay"></div>
    </div>

    <div class="container hero__container">
      <div class="hero__content">
        <h1 class="hero__title display-font">
          PUSH YOUR
          <span class="highlight glow-text">LIMITS</span>
        </h1>
        <p class="hero__sub display-font">BECOME YOUR BEST SELF</p>
        <p class="hero__body">
          Join our gym and get everything you need to achieve your fitness goals.
        </p>

        <div class="d-flex gap-3 align-items-center hero__actions">
          <RouterLink to="/plans" class="btn btn-primary hero-btn glow-btn">JOIN NOW</RouterLink>
          <RouterLink to="/exercises-main" class="btn btn-outline-primary hero-btn outline-glow">EXPLORE EXERCISES</RouterLink>
        </div>
      </div>
    </div>

    <a 
      href="#about" 
      class="scroll-down-btn" 
      :class="{ 'is-hidden': isScrolled }"
      aria-label="Scroll Down"
    >
      <span class="arrow-icon">↓</span>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100vh - 75px);
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: var(--color-bg);
}

.hero__media {
  position: absolute;
  inset: 0;
}

.hero__img {
  width: 100%;
  height: 95%;
  object-fit: cover;
  object-position: left 20%; 
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    270deg, 
    rgba(10, 14, 23, 0.98) 0%, 
    rgba(15, 25, 45, 0.85) 45%, 
    rgba(20, 40, 70, 0.4) 75%, 
    rgba(10, 14, 23, 0.1) 100%
  );
}

[data-theme='female'] .hero__overlay {
  background: linear-gradient(
    270deg, 
    rgba(20, 10, 18, 0.98) 0%, 
    rgba(50, 15, 38, 0.85) 45%, 
    rgba(80, 20, 60, 0.4) 75%, 
    rgba(20, 10, 18, 0.1) 100%
  );
}

.hero__container {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: flex-end; 
}

.hero__content {
  max-width: 520px;
  width: 100%;
  text-align: left; 
  padding: 40px 0;
  animation: heroSlideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes heroSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero__title {
  font-size: clamp(48px, 5vw, 76px);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.01em;
  color: #ffffff;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.hero__title .highlight {
  display: block;
  font-size: clamp(68px, 7vw, 108px);
  color: var(--color-primary-light);
  line-height: 0.85;
  margin-top: 4px;
}

.glow-text {
  text-shadow: 0 0 25px rgba(var(--bs-primary-rgb), 0.65),
               0 0 50px rgba(var(--bs-primary-rgb), 0.3);
}

.hero__sub {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #ffffff;
  margin-bottom: 14px;
  text-transform: uppercase;
}

.hero__body {
  font-size: 15px;
  color: var(--color-text-muted);
  max-width: 420px;
  line-height: 1.5;
  margin-bottom: 32px;
}

.hero-btn {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 14px 28px;
  border-radius: 6px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.glow-btn {
  box-shadow: 0 0 20px rgba(var(--bs-primary-rgb), 0.45);
}

.glow-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 30px rgba(var(--bs-primary-rgb), 0.8);
}

.outline-glow:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 20px rgba(var(--bs-primary-rgb), 0.4);
}

@media (max-width: 991px) {
  .hero__container {
    justify-content: center;
  }
  .hero__content {
    text-align: center;
  }
  .hero__body {
    margin-left: auto;
    margin-right: auto;
  }
  .hero__actions {
    justify-content: center;
  }
}

.scroll-down-btn {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease;
  animation: bounce 2s infinite;
}

.scroll-down-btn.is-hidden {
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%) translateY(20px);
}

.scroll-down-btn:hover {
  border-color: var(--color-primary-light);
  color: var(--color-primary-light);
  box-shadow: 0 0 15px rgba(var(--bs-primary-rgb), 0.5);
}

.arrow-icon {
  font-size: 20px;
  line-height: 1;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}
</style>