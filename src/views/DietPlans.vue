<script setup>

import { ref, computed } from 'vue'
import { dietPlans } from '../data/dietplans'
import DietPlanCard from '../components/DietPlanCard.vue'


const selectedGoal = ref('All')


const filteredPlans = computed(() => {

  if (selectedGoal.value === 'All') {
    return dietPlans
  }

  return dietPlans.filter(
    plan => plan.goal === selectedGoal.value
  )

})

</script>


<template>

  <section class="diet-plans">

    <div class="container">

      <h1>
        DIET PLANS
      </h1>

      <p>
        Choose a fitness goal to explore the available plans.
      </p>


      <!-- Filters -->

      <div class="diet-filters">

        <button
          @click="selectedGoal = 'All'"
          :class="{ active: selectedGoal === 'All' }"
        >
          All
        </button>


        <button
          @click="selectedGoal = 'Lose weight'"
          :class="{ active: selectedGoal === 'Lose weight' }"
        >
          Lose Weight
        </button>


        <button
          @click="selectedGoal = 'Build Muscle'"
          :class="{ active: selectedGoal === 'Build Muscle' }"
        >
          Build Muscle
        </button>


        <button
          @click="selectedGoal = 'Increase strength'"
          :class="{ active: selectedGoal === 'Increase strength' }"
        >
          Increase Strength
        </button>


        <button
          @click="selectedGoal = 'Improve fitness'"
          :class="{ active: selectedGoal === 'Improve fitness' }"
        >
          Improve Fitness
        </button>

      </div>


      <!-- Plans -->

      <div class="diet-grid">

        <DietPlanCard
          v-for="plan in filteredPlans"
          :key="plan.id"
          :plan="plan"
        />

      </div>

    </div>

  </section>

</template>

<style scoped>
.diet-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0 30px;
}

.diet-filters button {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-muted);
  padding: 8px 18px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.25s ease;
}

.diet-filters button.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
}

.diet-grid {
  display: grid;
  gap: 20px;
}
</style>