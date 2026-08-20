<template>
  <Teleport to="body">
    <div v-if="exercise" class="modal-overlay" @click.self="close">
      <div class="modal-card">
        <button class="close-btn" @click="close">&times;</button>

        <div class="modal-body">
          <div class="image-wrapper">
            <img 
              :src="currentImageSrc" 
              :alt="exercise.name" 
              @error="handleImageError"
            />
          </div>

          <div class="modal-info">
            <h2>{{ exercise.name }}</h2>

            <div class="badges">
              <span class="badge target" v-if="exercise.target">{{ exercise.target }}</span>
              <span class="badge body-part" v-for="part in exercise.bodyParts" :key="part">
                {{ part }}
              </span>
              <span class="badge equipment" v-if="exercise.equipment">{{ exercise.equipment }}</span>
            </div>

            <div class="instructions" v-if="exercise.instructions && exercise.instructions.length">
              <h3>Instructions</h3>
              <ol>
                <li v-for="(step, index) in exercise.instructions" :key="index">
                  {{ step }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  exercise: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const svgPlaceholder = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%"><rect width="400" height="300" fill="%230f172a"/><g fill="%233b82f6" opacity="0.85"><path d="M120 150 a20 20 0 1 0 0.1 0 Z"/><path d="M280 150 a20 20 0 1 0 0.1 0 Z"/><rect x="140" y="142" width="120" height="16" rx="8"/><rect x="105" y="120" width="18" height="60" rx="4" fill="%23ff3333"/><rect x="277" y="120" width="18" height="60" rx="4" fill="%23ff3333"/><rect x="90" y="130" width="12" height="40" rx="3" fill="%23e2e8f0"/><rect x="298" y="130" width="12" height="40" rx="3" fill="%23e2e8f0"/></g><text x="200" y="230" fill="%2394a3b8" font-family="sans-serif" font-size="16" font-weight="600" text-anchor="middle">WORKOUT EXERCISE</text></svg>`

const imageState = ref(0)

const rawUrl = computed(() => {
  if (!props.exercise) return ''
  return props.exercise.gifUrl || props.exercise.imageUrl || ''
})

watch(() => props.exercise, () => {
  imageState.value = 0
}, { immediate: true })

const currentImageSrc = computed(() => {
  if (!rawUrl.value) return svgPlaceholder

  if (imageState.value === 0) {
    return rawUrl.value
  } else if (imageState.value === 1) {
    return `https://images.weserv.nl/?url=${encodeURIComponent(rawUrl.value)}`
  }
  
  return svgPlaceholder
})

function handleImageError() {
  if (imageState.value < 2) {
    imageState.value++
  }
}

function close() {
  emit('close')
}

function handleKeydown(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(5, 10, 20, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.modal-card {
  background-color: #1e293b;
  color: #ffffff;
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  border: 1px solid #334155;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 32px;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #ff3333;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-wrapper {
  text-align: center;
  background: #0f172a;
  border-radius: 12px;
  padding: 15px;
}

.image-wrapper img {
  max-width: 100%;
  max-height: 280px;
  object-fit: contain;
  border-radius: 8px;
}

.modal-info h2 {
  margin: 0 0 15px 0;
  font-size: 28px;
  text-transform: capitalize;
  color: #ffffff;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
}

.badge.target {
  background: #ff3333;
  color: #ffffff;
}

.badge.body-part {
  background: #3b82f6;
  color: #ffffff;
}

.badge.equipment {
  background: #475569;
  color: #ffffff;
}

.instructions h3 {
  margin-bottom: 10px;
  color: #ffffff;
  font-size: 18px;
}

.instructions ol {
  padding-left: 20px;
  margin: 0;
}

.instructions li {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #e2e8f0;
}
</style>