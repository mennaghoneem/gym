<template>
  <div class="exercise-card" @click="$emit('select', exercise)">
    <div class="image-wrapper">
      <img 
        :src="exercise.gifUrl || exercise.image || 'https://via.placeholder.com/300x200?text=No+Image'" 
        :alt="exercise.name" 
        class="card-image"
      />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ exercise.name }}</h3>
      <span class="target-badge">{{ exercise.target || exercise.category }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  exercise: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])
</script>

<style scoped>
.exercise-card {
  background-color: var(--color-surface, #111827);
  border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.exercise-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-primary-light);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
}

.image-wrapper {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.exercise-card:hover .card-image {
  transform: scale(1.04);
}

.card-content {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text, #ffffff);
  margin: 0;
  text-transform: capitalize;
}

.target-badge {
  display: inline-block;
  background-color: var(--color-primary-light, #0066ff);
  color: #ffffff;
  padding: 6px 18px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  transition: background-color 0.3s ease;
}
</style>