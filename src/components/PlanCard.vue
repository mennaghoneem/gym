<script setup>
defineProps({
  plan: Object,
  yearly: Boolean,
  featured: Boolean
})

const emit = defineEmits(['choose'])
</script>

<template>
  <article class="plan-card" :class="{ featured }">

    <span v-if="featured" class="popular">
      MOST POPULAR
    </span>

    <h3>{{ plan.name }}</h3>

    <div class="price">
      {{ yearly ? plan.yearly : plan.monthly }} EGP

      <small>
        / {{ yearly ? 'year' : 'month' }}
      </small>
    </div>

    <ul>
      <li
        v-for="feature in plan.features"
        :key="feature"
      >
        ✓ {{ feature }}
      </li>
    </ul>

    <button
      class="btn btn-primary"
      @click="emit('choose', plan)"
    >
      CHOOSE PLAN
    </button>

  </article>
</template>
<style scoped>
.plan-card {
  border: 1px solid var(--color-border);
  border-top: 4px solid var(--color-primary);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  position: relative;
  background: var(--color-surface);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.plan-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.35);
}

.plan-card.featured {
  border: 2px solid var(--color-primary);
  border-top: 4px solid var(--color-primary);
  transform: translateY(-4px);
  box-shadow: 0 10px 24px var(--color-border);
}

.popular {
  position: absolute;
  top: -11px;
  right: 16px;
  background: var(--color-primary);
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: bold;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.price {
  font-size: 28px;
  font-weight: bold;
  margin: 12px 0;
  color: var(--color-primary);
}

.price small {
  font-size: 13px;
  font-weight: normal;
  color: var(--color-text-muted);
}

.plan-card ul {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
}

.plan-card li {
  padding: 4px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 14px;
}

.plan-card .btn-primary {
  width: 100%;
}
</style>