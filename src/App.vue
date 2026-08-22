<script setup>
import { ref } from 'vue'
import BMIModal from './components/BMIModel.vue'

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
    <BMIModal
      v-if="showBMI"
      @close="closeBMI"
    />
  </div>
</template>

<style>
html, body, #app {
  background-color: #0d1b2a !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  min-height: 100vh !important;
}
</style>
