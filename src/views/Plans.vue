<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PlanCard from '../components/PlanCard.vue'
import { plans } from '../data/plans'

const router = useRouter()
const yearly = ref(false)

function choosePlan(plan) {
  localStorage.setItem('selected_plan', JSON.stringify(plan))
  router.push('/register')
}
</script>

<template>
  <section class="inner-page plans-page">
    <div class="container">
      <h1 class="title"><b><span style="color: var(--color-primary-light);">CHOOSE</span> YOUR PLAN</b></h1>
      <p class="subtitle">Choose the membership that fits your goals.</p>

      <!-- Monthly / Yearly Toggle -->
      <div class="billing-toggle">
        <button :class="{ active: !yearly }" @click="yearly = false">Monthly</button>
        <button :class="{ active: yearly }" @click="yearly = true">Yearly</button>
      </div>

      <!-- Plans Grid -->
      <div class="plans-grid">
        <PlanCard
          v-for="(plan, index) in plans"
          :key="plan.id"
          :plan="plan"
          :yearly="yearly"
          :featured="index === 1"
          @choose="choosePlan"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.plans-page {
  min-height: 100vh;
  background-color: var(--color-bg);
  color: var(--color-text);
  padding: 60px 20px;
  box-sizing: border-box;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}

.page-title {
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 8px;
  color: var(--color-text);
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.billing-toggle {
  display: inline-flex;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 30px;
  padding: 4px;
  margin: 10px 0 30px 0;
}

.billing-toggle button {
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  padding: 8px 24px;
  border-radius: 24px;
  font-weight: bold;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.billing-toggle button.active {
  background: var(--color-primary);
  color: #ffffff;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 40px;
  width: 100%;
}

@media (max-width: 900px) {
  .plans-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
}
</style>