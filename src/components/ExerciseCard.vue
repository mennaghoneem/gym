<template>
  <div class="custom-card" @click="$emit('select', exercise)">

    <div class="card-img-wrapper">
      <img
        :src="imageSrc"
        :alt="exercise.name"
        loading="lazy"
        @error="handleImageError"
      />
    </div>
    <div class="card-info">
      <h3 class="card-title">{{ exercise.name }}</h3>
      <button class="muscle-btn-tag">
        {{ exercise.target || 'General' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  exercise: {
    type: Object,
    required: true
  }
})

defineEmits(['select'])

const placeholderImage =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='220' viewBox='0 0 320 220'><rect width='320' height='220' fill='%230b1120'/><text x='160' y='110' font-family='Arial' font-size='14' fill='%2394a3b8' text-anchor='middle'>No Image Available</text></svg>"

const imageFailed = ref(false)

const imageSrc = computed(() => {
  if (imageFailed.value || !props.exercise.gifUrl) {
    return placeholderImage
  }
  return props.exercise.gifUrl
})

function handleImageError() {
  imageFailed.value = true
}
</script>

<style scoped>
.custom-card {
  background-color: #ffffff !important;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

.custom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35);
}

.card-img-wrapper {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
  overflow: hidden;
  border-radius: 8px;
}

.card-img-wrapper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.card-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.card-title {
  color: #0b1120 !important;
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0;
  text-align: center;
  text-transform: capitalize;
  line-height: 1.3;
}

.muscle-btn-tag {
  background-color: #0d1b2a !important;
  color: #ffffff !important;
  border: none;
  padding: 8px 22px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: capitalize;
  cursor: pointer;
  letter-spacing: 0.5px;
}
</style>