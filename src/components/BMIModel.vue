<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['close'])

const height = ref('')
const weight = ref('')
const bmi = ref(null)
const error = ref('')

function calculateBMI() {

  error.value = ''
  bmi.value = null

  const h = Number(height.value)
  const w = Number(weight.value)

  if (!h || !w || h <= 0 || w <= 0) {
    error.value = 'Please enter a valid height and weight.'
    return
  }

  const heightInMeters = h / 100

  bmi.value = (
    w / (heightInMeters * heightInMeters)
  ).toFixed(1)
}

const category = computed(() => {

  if (bmi.value === null) {
    return ''
  }

  const value = Number(bmi.value)

  if (value < 18.5) {
    return 'Underweight'
  }

  if (value < 25) {
    return 'Normal range'
  }

  if (value < 30) {
    return 'Overweight'
  }

  return 'Obesity range'
})
</script>


<template>

  <div
    class="modal-backdrop"
    @click.self="emit('close')"
  >

    <div class="bmi-modal">

      <button
        class="close-btn"
        @click="emit('close')"
      >
        ×
      </button>

      <h2>BMI Calculator</h2>

      <p>
        Enter your height and weight.
      </p>


      <!-- Height -->

      <label>
        Height
      </label>

      <div class="input-group">

        <input
          v-model="height"
          type="number"
          placeholder="170"
        />

        <span>cm</span>

      </div>


      <!-- Weight -->

      <label>
        Weight
      </label>

      <div class="input-group">

        <input
          v-model="weight"
          type="number"
          placeholder="65"
        />

        <span>kg</span>

      </div>


      <p
        v-if="error"
        class="error"
      >
        {{ error }}
      </p>


      <button
        class="calculate-btn"
        @click="calculateBMI"
      >
        CALCULATE
      </button>


      <!-- Result -->

      <div
        v-if="bmi !== null"
        class="bmi-result"
      >

        <span>Your BMI</span>

        <strong>
          {{ bmi }}
        </strong>

        <p>
          {{ category }}
        </p>

      </div>

    </div>

  </div>

</template>