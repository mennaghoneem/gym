<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import BMIModal from './components/BMIModel.vue'

const showBMI = ref(false)

function openBMI() {
  showBMI.value = true
}

function closeBMI() {
  showBMI.value = false
}

onMounted(() => {
  if (!document.documentElement.getAttribute('data-theme')) {
    document.documentElement.setAttribute('data-theme', 'female') 
  }
})
</script>

<template>
  <div id="app">
    <Navbar @open-bmi="openBMI" />
    <RouterView @open-bmi="openBMI" />
    <BMIModal
      v-if="showBMI"
      @close="closeBMI"
    />
  </div>
</template>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}
</style>