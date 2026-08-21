<script setup>

import { computed } from 'vue'
import { dietPlans } from '../data/dietPlans'
import DietPlanCard from './DietPlanCard.vue'


const props = defineProps({
  userGoal: {
    type: String,
    default: ''
  }
})


const userDietPlan = computed(() => {

  return dietPlans.find(
    plan => plan.goal === props.userGoal
  )

})

</script>


<template>

  <section class="dashboard-diet">

    <h2>
      YOUR DIET PLAN
    </h2>


    <div v-if="userDietPlan">

      <DietPlanCard
        :plan="userDietPlan"
      />

    </div>


    <div v-else>

      <p>
        Complete your fitness goal to get your diet plan.
      </p>

    </div>

  </section>

</template>