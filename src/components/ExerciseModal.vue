<template>
  <Transition name="modal-fade" appear>
    <div class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-card">
        <button class="close-btn" @click="$emit('close')" title="Close">✕</button>

        <div class="modal-body">
          <div class="image-container">
            <img 
              :src="exercise.gifUrl || exercise.image || 'https://via.placeholder.com/400x300?text=No+Preview'" 
              :alt="exercise.name" 
            />
          </div>

          <div class="exercise-info">
            <h2 class="title">{{ exercise.name }}</h2>
            
            <div class="tags-container">
              <span class="tag primary-tag" v-if="exercise.target || exercise.category">
                {{ exercise.target || exercise.category }}
              </span>
              <span class="tag secondary-tag" v-if="exercise.equipment">
                {{ exercise.equipment }}
              </span>
            </div>
          </div>

          <!-- Instructions Section with Staggered Steps -->
          <div class="instructions-section" v-if="formattedInstructions.length">
            <h3 class="section-title">How to Perform</h3>
            <ol class="steps-list">
              <li 
                v-for="(step, index) in formattedInstructions" 
                :key="index" 
                class="step-item"
                :style="{ animationDelay: `${0.1 + index * 0.08}s` }"
              >
                <span class="step-number">{{ index + 1 }}</span>
                <p class="step-text">{{ step }}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  exercise: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const formattedInstructions = computed(() => {
  if (Array.isArray(props.exercise.instructions)) {
    return props.exercise.instructions
  }
  if (typeof props.exercise.instructions === 'string') {
    return props.exercise.instructions.split('.').filter(s => s.trim().length > 0)
  }
  return []
})
</script>

<style scoped>
/* Modal Backdrop Fade Animation */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Modal Card Scale/Slide Animation */
.modal-fade-enter-active .modal-card {
  animation: modalPopIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-fade-leave-active .modal-card {
  animation: modalPopOut 0.25s cubic-bezier(0.4, 0, 1, 1);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-card {
  background-color: var(--color-surface, #111827);
  border: 1px solid var(--color-border, rgba(255, 255, 255, 0.12));
  border-radius: 24px;
  max-width: 540px;
  width: 100%;
  max-height: 85vh;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--color-primary-light, #ff2d75);
  transform: rotate(90deg);
}

.modal-body {
  overflow-y: auto;
  padding: 24px;
}

/* Custom Smooth Scrollbar */
.modal-body::-webkit-scrollbar {
  width: 5px;
}
.modal-body::-webkit-scrollbar-thumb {
  background: var(--color-border, rgba(255, 255, 255, 0.2));
  border-radius: 10px;
}

.image-container {
  width: 100%;
  height: 230px;
  border-radius: 16px;
  overflow: hidden;
  background-color: #000;
  margin-bottom: 20px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.modal-card:hover .image-container img {
  transform: scale(1.03);
}

.title {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-text, #ffffff);
  margin: 0 0 12px 0;
  text-transform: capitalize;
}

.tags-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.tag {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
}

.primary-tag {
  background-color: var(--color-primary-light, #0066ff);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.secondary-tag {
  background-color: rgba(255, 255, 255, 0.06);
  color: var(--color-text-muted, #9ca3af);
  border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
}

.section-title {
  font-size: 1.1rem;
  color: var(--color-text, #ffffff);
  margin-bottom: 14px;
  font-weight: 700;
}

.steps-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background-color: rgba(255, 255, 255, 0.03);
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
  opacity: 0;
  animation: slideInStep 0.4s ease forwards;
}

@keyframes slideInStep {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.step-number {
  background-color: var(--color-primary-light, #0066ff);
  color: #ffffff;
  min-width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  flex-shrink: 0;
}

.step-text {
  margin: 0;
  font-size: 0.92rem;
  color: var(--color-text-muted, #d1d5db);
  line-height: 1.5;
}
</style>