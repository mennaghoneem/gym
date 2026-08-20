<script setup>
import { ref } from 'vue'
// import BMIModal from './components/BMIModal.vue'

const showBMI = ref(false)

function openBMI() {
  showBMI.value = true
}

function closeBMI() {
  showBMI.value = false
}
</script>

<template>
  <div id="app">
    <RouterView @open-bmi="openBMI" />
    <!-- <BMIModal
      v-if="showBMI"
      @close="closeBMI"
    /> -->
  </div>
</template>