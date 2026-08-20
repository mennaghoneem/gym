<template>
  <section class="featured-exercises">
    <div class="section-header">
      <p class="section-label">WORKOUT</p>
      <h2>Featured Exercises</h2>
      <p>Start your workout with one of these exercises.</p>
    </div>

    <p v-if="loading" class="message">Loading exercises...</p>
    <p v-else-if="error" class="message error">{{ error }}</p>

    <div v-else class="exercises-grid">
      <ExerciseCard
        v-for="exercise in featuredExercises"
        :key="exercise.exerciseId"
        :exercise="exercise"
        @select="openExercise"
      />
    </div>

    <div class="view-all-container">
      <router-link to="/exercises" class="view-all-button">
        View All Exercises
      </router-link>
    </div>

    <ExerciseModal
      :exercise="selectedExercise"
      @close="closeExercise"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ExerciseCard from './ExerciseCard.vue'
import ExerciseModal from './ExerciseModal.vue'
import { getExercises } from '../services/exerciseApi.js'

const exercises = ref([])
const loading = ref(true)
const error = ref('')
const selectedExercise = ref(null)

const featuredExercises = computed(() => {
  return exercises.value.slice(0, 3)
})

async function loadExercises() {
  try {
    loading.value = true
    error.value = ''
    exercises.value = await getExercises()
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load exercises.'
  } finally {
    loading.value = false
  }
}

function openExercise(exercise) {
  selectedExercise.value = exercise
}

function closeExercise() {
  selectedExercise.value = null
}

onMounted(() => {
  loadExercises()
})
</script>

<style scoped>
.featured-exercises {
  padding: 60px 6%;
  background: var(--bg-color);
  color: var(--text-main);
}

.section-header {
  text-align: center;
  margin-bottom: 35px;
}

.section-label {
  color: var(--accent-color);
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 3px;
}

.section-header h2 {
  margin: 8px 0;
  font-size: 36px;
}

.section-header p {
  color: var(--text-muted);
}

.exercises-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
}

.view-all-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.view-all-button {
  display: inline-block;
  padding: 14px 30px;
  border-radius: 10px;
  background: var(--primary-color);
  color: var(--text-main);
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.3s ease, background 0.3s ease;
}

.view-all-button:hover {
  background: var(--accent-color);
  transform: translateY(-2px);
}

.message {
  text-align: center;
  font-size: 18px;
}

.error {
  color: var(--primary-color);
}

@media (max-width: 900px) {
  .exercises-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .exercises-grid {
    grid-template-columns: 1fr;
  }
}
</style>