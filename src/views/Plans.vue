<script setup>
import { ref } from 'vue'
import PlanCard from '../components/PlanCard.vue'
import { plans } from '../data/plans'

const yearly = ref(false)
const selectedPlan = ref(null)

function choosePlan(plan) {
  selectedPlan.value = plan
}
</script>

<template>

  <section class="plans-page">

    <div class="container">

      <h1>CHOOSE YOUR PLAN</h1>

      <p>
        Choose the membership that fits your goals.
      </p>


      <!-- Monthly / Yearly -->

      <div class="billing-toggle">

        <button
          :class="{ active: !yearly }"
          @click="yearly = false"
        >
          Monthly
        </button>

        <button
          :class="{ active: yearly }"
          @click="yearly = true"
        >
          Yearly
        </button>

      </div>


      <!-- Plans -->

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


      <!-- Selected Plan -->

      <div
        v-if="selectedPlan"
        class="selected-plan"
      >
        You selected:

        <strong>
          {{ selectedPlan.name }}
        </strong>
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
  padding:0 20px ;
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
  display: flex;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
  align-items: stretch;
}
.selected-plan {
  margin-top: 40px;
  padding: 12px 24px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
}

@media (max-width: 900px) {
  .plans-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
}
</style>