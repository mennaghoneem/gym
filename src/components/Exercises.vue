<template>
  <div class="exercises-page">
    <h1>All Exercises</h1>

    <div v-if="loading" class="loading-state">Loading all exercises...</div>
    <div v-else-if="errorMessage" class="error-state">{{ errorMessage }}</div>

    <div v-else class="exercises-grid">
      <ExerciseCard
        v-for="item in exercisesList"
        :key="item.id"
        :exercise="item"
        @select="openExerciseModal"
      />
    </div>

    <ExerciseModal
      :exercise="selectedExercise"
      @close="closeExerciseModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ExerciseCard from '@/components/ExerciseCard.vue'
import ExerciseModal from '@/components/ExerciseModal.vue'

const exercisesList = ref([])
const loading = ref(true)
const errorMessage = ref('')
const selectedExercise = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/yuhas/free-exercise-db/main/dist/exercises.json')
    if (!response.ok) throw new Error('Failed to fetch data')
    
    const data = await response.json()
    exercisesList.value = data.slice(0, 30)
  } catch (err) {
    errorMessage.value = 'Unable to load exercises at the moment.'
    console.error(err)
  } finally {
    loading.value = false
  }
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
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.loading-state, .error-state {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
}

.exercises-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>