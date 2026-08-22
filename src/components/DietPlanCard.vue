<script setup>

defineProps({
  plan: Object
})

</script>


<template>

  <article class="diet-card">

    <span class="diet-goal">
      {{ plan.goal }}
    </span>

    <h2>
      {{ plan.title }}
    </h2>

    <p>
      {{ plan.description }}
    </p>


    <div class="meal">

      <h3>Breakfast</h3>

      <ul>
        <li
          v-for="meal in plan.meals.breakfast"
          :key="meal"
        >
          {{ meal }}
        </li>
      </ul>

    </div>


    <div class="meal">

      <h3>Lunch</h3>

      <ul>
        <li
          v-for="meal in plan.meals.lunch"
          :key="meal"
        >
          {{ meal }}
        </li>
      </ul>

    </div>


    <div class="meal">

      <h3>Dinner</h3>

      <ul>
        <li
          v-for="meal in plan.meals.dinner"
          :key="meal"
        >
          {{ meal }}
        </li>
      </ul>

    </div>


    <div class="meal">

      <h3>Snacks</h3>

      <ul>
        <li
          v-for="meal in plan.meals.snacks"
          :key="meal"
        >
          {{ meal }}
        </li>
      </ul>

    </div>

  </article>

</template>

<style scoped>
.diet-card {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  background: var(--color-surface);
  color: var(--color-text);
}

.diet-goal {
  display: inline-block;
  background: var(--color-primary);
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 12px;
}

.diet-card p {
  color: var(--color-text-muted);
  margin-bottom: 20px;
}

.meal h3 {
  font-size: 16px;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.meal li {
  padding: 4px 0;
  border-bottom: 1px solid var(--color-border);
}

.diet-card {
  border-top: 4px solid var(--color-primary);
}
</style>