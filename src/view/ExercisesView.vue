<template>
  <div class="exercises-page">
    <div class="top-nav-bar">
      <button class="menu-btn" title="Open Suggestions" @click="toggleSidebar">
        ☰
      </button>
    </div>

    <div class="sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <div class="sidebar-header">
        <h3>Recommended</h3>
        <button class="close-btn" @click="toggleSidebar">✕</button>
      </div>

      <div class="sidebar-links">
        <button
          class="sidebar-item"
          :class="{ 'selected-item': selectedMuscle === '' }"
          @click="selectMuscle('')"
        >
          All Exercises
        </button>
        <button
          v-for="m in muscleList"
          :key="m"
          class="sidebar-item"
          :class="{ 'selected-item': selectedMuscle === m }"
          @click="selectMuscle(m)"
        >
          {{ m }}
        </button>
      </div>
    </div>

    <div
      v-if="isSidebarOpen"
      class="sidebar-overlay"
      @click="toggleSidebar"
    ></div>

    <div class="main-content">
      <h1 class="page-title">Work Out & Live a Healthy Life</h1>

      <div v-if="loading" class="loading-state">
        Loading exercises...
      </div>

      <div v-else-if="errorMessage" class="error-state">
        {{ errorMessage }}
      </div>

      <div v-else class="results-container">
        <div v-if="filteredExercises.length" class="exercises-grid">
          <ExerciseCard
            v-for="item in filteredExercises"
            :key="item.id || item.name"
            :exercise="item"
            @select="openExerciseModal"
          />
        </div>

        <div v-else class="no-results">
          No exercises found for this category.
        </div>
      </div>
    </div>

    <ExerciseModal
      v-if="selectedExercise"
      :exercise="selectedExercise"
      @close="closeExerciseModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ExerciseCard from '../components/ExerciseCard.vue'
import ExerciseModal from '../components/ExerciseModal.vue'

const allExercises = ref([])
const muscleList = ref([])
const selectedMuscle = ref('')
const loading = ref(true)
const errorMessage = ref('')
const selectedExercise = ref(null)
const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function selectMuscle(muscleName) {
  selectedMuscle.value = muscleName
  isSidebarOpen.value = false
}

async function fetchExercisesData() {
  loading.value = true
  errorMessage.value = ''

  try {
    const res = await fetch("https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json")
    if (!res.ok) throw new Error("Failed to load data")

    const data = await res.json()

    allExercises.value = data.map(item => {
      const muscle = (item.primaryMuscles && item.primaryMuscles.length > 0)
        ? item.primaryMuscles[0]
        : (item.category || 'General')

      const img = (item.images && item.images.length > 0)
        ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${item.images[0]}`
        : ''

      return {
        id: item.id,
        name: item.name,
        target: muscle,
        category: item.category || muscle,
        equipment: item.equipment || 'None',
        instructions: item.instructions || [],
        gifUrl: img
      }
    })

    const categories = allExercises.value.map(item => item.category).filter(Boolean)
    muscleList.value = [...new Set(categories)].sort()

  } catch (err) {
    console.error("API Error:", err)
    errorMessage.value = "Failed to load exercises."
  } finally {
    loading.value = false
  }
}

const filteredExercises = computed(() => {
  if (!selectedMuscle.value) return allExercises.value
  return allExercises.value.filter(item => item.category === selectedMuscle.value)
})

onMounted(() => {
  fetchExercisesData()
})

function openExerciseModal(exercise) {
  selectedExercise.value = exercise
}

function closeExerciseModal() {
  selectedExercise.value = null
}
</script>

<style scoped>
.exercises-page {
  min-height: 100vh;
  width: 100vw;
  background-color: #0d1b2a;
  color: #f8fafc;
  position: relative;
  box-sizing: border-box;
}

.top-nav-bar {
  display: flex;
  align-items: center;
  background-color: #111827;
  border-bottom: 2px solid #374151;
  padding: 0 16px;
  overflow-x: auto;
  width: 100%;
}

.menu-btn {
  background: transparent;
  color: #38bdf8;
  border: none;
  font-size: 1.8rem;
  padding: 12px 18px;
  cursor: pointer;
}

.sidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 280px;
  height: 100vh;
  background-color: #111827;
  border-right: 2px solid #374151;
  box-shadow: 5px 0 25px rgba(0, 0, 0, 0.6);
  z-index: 1000;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar-open {
  left: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #1f2937;
  border-bottom: 1px solid #374151;
}

.sidebar-header h3 {
  margin: 0;
  color: #f3f4f6;
  font-size: 0.95rem;
  font-style: italic;
}

.sidebar-item {
  background: transparent;
  color: #d1d5db;
  border: none;
  text-align: left;
  padding: 8px 14px;
  font-size: 0.75rem;
  font-weight: 400;
  font-style: italic;
  cursor: pointer;
  text-transform: capitalize;
}
.close-btn {
  background: transparent;
  border: none;
  color: #9ca3af;
  font-size: 1.4rem;
  cursor: pointer;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  overflow-y: auto;
}

.sidebar-item {
  background: transparent;
  color: #d1d5db;
  border: none;
  text-align: left;
  padding: 14px 24px;
  font-size: 1.05rem;
  font-weight: 600;
  font-style: italic;
  cursor: pointer;
  text-transform: capitalize;
}

.sidebar-item:hover {
  background-color: #374151;
  color: #38bdf8;
}

.selected-item {
  background-color: #1f2937;
  color: #38bdf8;
  border-left: 4px solid #38bdf8;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #ffffff !important;
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: 0.5px;
}

.loading-state,
.error-state,
.no-results {
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
  color: #9ca3af;
}

.exercises-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 992px) {
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