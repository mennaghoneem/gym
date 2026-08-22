<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import AboutFeatures from '../components/AboutFeatures.vue'
import BMIModal from '../components/BMIModel.vue'

const isBmiOpen = ref(false)
</script>

<template>
  <div class="page">
    <Navbar @open-bmi="isBmiOpen = true" />
    <Hero />
    <!-- Marquee Section -->
    <div class="marquee-wrapper">
      <div class="marquee-track">
        <span>NO PAIN NO GAIN</span> <span class="dot">•</span>
        <span>PUSH YOUR LIMITS</span> <span class="dot">•</span>
        <span>BUILD YOUR DREAM BODY</span> <span class="dot">•</span>
        <span>24/7 OPEN GYM</span> <span class="dot">•</span>
        <span>NO PAIN NO GAIN</span> <span class="dot">•</span>
        <span>PUSH YOUR LIMITS</span> <span class="dot">•</span>
        <span>BUILD YOUR DREAM BODY</span> <span class="dot">•</span>
        <span>24/7 OPEN GYM</span> <span class="dot">•</span>
      </div>
    </div>
    <AboutFeatures id="about" />

    <div v-if="isBmiOpen" class="bmi-placeholder-note">
      <BMIModal />
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
}

.bmi-placeholder-note {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--color-surface);
  color: var(--color-text);
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 12px;
  border: 1px solid var(--color-border);
}
.marquee-wrapper {
  background: var(--color-surface);
  overflow: hidden;
  white-space: nowrap;
  padding: 12px 0;
  display: flex;
  margin-top: -5vh; 
  position:relative;
}

.marquee-track {
  display: flex;
  gap: 30px;
  font-family: 'Archivo Black', sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  color: #ffffff;
  animation: marqueeScroll 20s linear infinite;
  text-shadow: 0 0 10px rgba(var(--bs-primary-rgb), 0.5);
}

.marquee-track .dot {
  color: #fff;
  opacity: 0.5;
}

@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>