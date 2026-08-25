<template>
  <div class="inner-page home-page">
    <div class="hero-section">
      <h1 class="title hero-title"> <span style="color:var(--color-primary-light)">DISCOVER YOUR</span> WORKOUT</h1>

      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search exercises by name, body part..."
          class="search-input"
        />
      </div>

      <div v-if="loading" class="subtitle loading-state">Loading exercises...</div>
      <div v-else-if="errorMessage" class="error-state">{{ errorMessage }}</div>

      <div v-else class="cards-container">
        <div v-if="displayedExercises.length" class="exercises-grid">
          <ExerciseCard
            v-for="item in displayedExercises"
            :key="item.id || item.name"
            :exercise="item"
            @select="openModal"
          />
        </div>

        <div v-else class="no-results">
          No exercises found matching "{{ searchQuery }}"
        </div>

        <div class="view-all-wrapper">
          <router-link to="/exercises" class="view-all-btn">
            View All Exercises
          </router-link>
        </div>
      </div>
    </div>

    <ExerciseModal
      v-if="selectedExercise"
      :exercise="selectedExercise"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ExerciseCard from '../components/ExerciseCard.vue'
import ExerciseModal from '../components/ExerciseModal.vue'
import { getExercises } from '../services/exerciseApi.js'

const allExercises = ref([])
const searchQuery = ref('')
const loading = ref(true)
const errorMessage = ref('')
const selectedExercise = ref(null)

async function loadHomeExercises() {
  loading.value = true
  errorMessage.value = ''

  try {
    const data = await getExercises()
    allExercises.value = data
  } catch (err) {
    console.error("Home View Fetch Error:", err)
    errorMessage.value = "Failed to load exercises."
  } finally {
    loading.value = false
  }
}

const displayedExercises = computed(() => {
  if (!searchQuery.value.trim()) {
    return allExercises.value.slice(0, 3)
  }

  const query = searchQuery.value.toLowerCase().trim()
  const filtered = allExercises.value.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(query)
    const targetMatch = item.target.toLowerCase().includes(query)
    const bodyPartMatch = item.bodyPart.toLowerCase().includes(query)
    return nameMatch || targetMatch || bodyPartMatch
  })

  return filtered.slice(0, 3)
})

onMounted(() => {
  loadHomeExercises()
})

function openModal(exercise) {
  selectedExercise.value = exercise
}

function closeModal() {
  selectedExercise.value = null
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  width: 100vw;
  background-color: var(--color-bg);
  color: #ffffff;
  padding: 50px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-section {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #ffffff !important;
  margin-bottom: 24px;
  letter-spacing: 0.5px;
}

.search-container {
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 14px 24px;
  border-radius: 30px;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  color: #ffffff;
  font-size: 1rem;
  outline: none;
}

.search-input:focus {
  border-color: var(--color-primary-light);
}

.exercises-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  justify-content: center;
  margin-bottom: 40px;
}

.view-all-wrapper {
  margin-top: 20px;
}

.view-all-btn {
  display: inline-block;
  background-color: #ffffff;
  color: var(--color-bg);
  padding: 12px 36px;
  border-radius: 25px;
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.view-all-btn:hover {
  transform: scale(1.05);
  background-color: #f1f5f9;
}

.loading-state,
.error-state,
.no-results {
  padding: 40px;
  color: #9ca3af;
  font-size: 1.1rem;
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