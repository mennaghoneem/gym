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
    error.value = 'Please enter valid height and weight.'
    return
  }

  const heightInMeters = h / 100
  bmi.value = (w / (heightInMeters * heightInMeters)).toFixed(1)
}

const category = computed(() => {
  if (bmi.value === null) return ''
  const val = Number(bmi.value)
  if (val < 18.5) return 'Underweight'
  if (val < 25) return 'Normal range'
  if (val < 30) return 'Overweight'
  return 'Obesity range'
})
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <div class="bmi-modal">
      <button class="close-btn" @click="emit('close')">×</button>
      <h2>BMI Calculator</h2>
      <p>Enter your height and weight below.</p>

      <div class="form-group">
        <label>Height (cm)</label>

        <input v-model="height" type="number" placeholder="170" />
      </div>

      <div class="form-group">
        <label>Weight (kg)</label>

        <input v-model="weight" type="number" placeholder="65" />
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <button class="calculate-btn" @click="calculateBMI">CALCULATE</button>

      <div v-if="bmi !== null" class="bmi-result">
        <span>Your BMI: <strong>{{ bmi }}</strong></span>
        <p class="category-text">{{ category }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.bmi-modal {
  background: var(--color-surface, #111827);
  border: 1px solid var(--color-border, #374151);
  color: var(--color-text, #ffffff);
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  position: relative;
}
.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 24px;
  color: var(--color-text-muted);
  cursor: pointer;
  background: none;
  border: none;
}
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
}
.form-group input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
}
.calculate-btn {
  width: 100%;
  padding: 12px;
  background: var(--color-primary, #0066ff);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}
.bmi-result {
  margin-top: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-align: center;
}
.error { color: #ff4d4d; font-size: 0.9rem; }
</style>