<template>
  <div class="inner-page exercises-page">
    <div class="main-content">
      <h1 class="title page-title" style=" color:var(--color-primary-light) ">EXPLORE EXERCISES</h1>

      <!-- Filter & Search Bar -->
      <div class="filter-bar">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search exercise..." 
          />
        </div>

        <div class="select-box">
          <label>Exercise Category</label>
          <select v-model="selectedCategory">
            <option value="">All Categories</option>
            <option v-for="cat in categoryList" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>
      </div>

      <!-- State Displays -->
      <div v-if="loading" class="loading-state">
        Loading exercises...
      </div>

      <div v-else-if="errorMessage" class="error-state">
        {{ errorMessage }}
      </div>

      <!-- Results Grid -->
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
          No exercises found matching your search.
        </div>
      </div>
    </div>

    <!-- Modal -->
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
const categoryList = ref([])
const selectedCategory = ref('')
const searchQuery = ref('')
const loading = ref(true)
const errorMessage = ref('')
const selectedExercise = ref(null)

async function fetchExercisesData() {
  loading.value = true
  errorMessage.value = ''

  try {
    const res = await fetch("https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json")
    if (!res.ok) throw new Error("Failed to load data")

    const data = await res.json()

    allExercises.value = data.map(item => {
      const img = (item.images && item.images.length > 0)
        ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${item.images[0]}`
        : ''

      return {
        id: item.id,
        name: item.name,
        target: (item.primaryMuscles && item.primaryMuscles.length > 0) ? item.primaryMuscles[0] : 'General',
        category: item.category || 'Other',
        equipment: item.equipment || 'None',
        instructions: item.instructions || [],
        gifUrl: img
      }
    })

    const categories = allExercises.value.map(item => item.category).filter(Boolean)
    categoryList.value = [...new Set(categories)].sort()

  } catch (err) {
    console.error("API Error:", err)
    errorMessage.value = "Failed to load exercises."
  } finally {
    loading.value = false
  }
}

const filteredExercises = computed(() => {
  return allExercises.value.filter(item => {
    const matchesCategory = selectedCategory.value === '' || 
      item.category.toLowerCase() === selectedCategory.value.toLowerCase()

    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    return matchesCategory && matchesSearch
  })
})

onMounted(() => {
  const savedUserJSON = localStorage.getItem('gym_registered_user')
  if (savedUserJSON) {
    const savedUser = JSON.parse(savedUserJSON)
    if (savedUser.exerciseCategory) {
      selectedCategory.value = savedUser.exerciseCategory.toLowerCase()
    }
  }

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
  width: 100%;
  background-color: var(--color-bg);
  color: var(--color-text);
  box-sizing: border-box;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--color-primary-light) !important;
  text-align: center;
  margin-bottom: 30px;
  letter-spacing: 0.5px;
}

/* Clean Filter Bar (No Container Box) */
.filter-bar {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  align-items: flex-end;
  justify-content: space-between;
  background: transparent;
  padding: 0;
  border: none;
}

.search-box {
  flex: 1;
}

.search-box input {
  width: 100%;
  padding: 12px 16px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.search-box input:focus,
.select-box select:focus {
  border-color: var(--color-primary-light, var(--color-primary));
}

.select-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 220px;
}

.select-box label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.select-box select {
  padding: 12px 16px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
  font-size: 0.95rem;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.select-box select option {
  background-color: var(--color-surface);
  color: var(--color-text);
}

.loading-state,
.error-state,
.no-results {
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
  color: var(--color-text-muted);
}

.exercises-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 850px) {
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

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