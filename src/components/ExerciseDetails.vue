<template>
  <section class="exercise-details">
    <button class="back-button" @click="goBack">
      ← Back to Exercises
    </button>

    <p v-if="loading" class="message">
      Loading exercise...
    </p>

    <p v-else-if="error" class="message error">
      {{ error }}
    </p>

    <div v-else-if="exercise" class="details-card">

      <div class="image-container">
        <img
          :src="exercise.gifUrl"
          :alt="exercise.name"
          @error="handleImageError"
        />
      </div>

      <div class="details-content">
        <h1>{{ exercise.name }}</h1>

        <p>
          <strong>Body Part:</strong>
          {{ exercise.bodyParts?.join(', ') }}
        </p>

        <p>
          <strong>Target:</strong>
          {{ exercise.targetMuscles?.join(', ') }}
        </p>

        <p>
          <strong>Equipment:</strong>
          {{ exercise.equipments?.join(', ') }}
        </p>

        <div class="instructions">
          <h2>Instructions</h2>

          <ol>
            <li
              v-for="(instruction, index) in exercise.instructions"
              :key="index"
            >
              {{ instruction }}
            </li>
          </ol>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const exercise = ref(null)
const loading = ref(true)
const error = ref('')

async function getExerciseDetails() {
  try {
    loading.value = true
    error.value = ''

    const exerciseId = route.params.id

    const response = await fetch(
      `https://oss.exercisedb.dev/api/v1/exercises/${exerciseId}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch exercise details')
    }

    const result = await response.json()

    exercise.value = result.data

  } catch (err) {
    console.error(err)
    error.value = 'Failed to load exercise details.'
  } finally {
    loading.value = false
  }
}

function goBack() {
  router.back()
}

function handleImageError(event) {
  event.target.style.display = 'none'
}

onMounted(() => {
  getExerciseDetails()
})
</script>

<style scoped>
.exercise-details {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
}

.back-button {
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 30px;
}

.details-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  width: 100%;
  max-width: 500px;
  border-radius: 15px;
}

.details-content h1 {
  text-transform: capitalize;
  margin-bottom: 25px;
}

.details-content p {
  margin: 12px 0;
}

.instructions {
  margin-top: 30px;
}

.instructions h2 {
  margin-bottom: 15px;
}

.instructions li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.message {
  text-align: center;
  font-size: 20px;
}

.error {
  color: red;
}

@media (max-width: 768px) {
  .details-card {
    grid-template-columns: 1fr;
  }
}
</style>