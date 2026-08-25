<script setup>
import { computed } from 'vue'
import { dietPlans } from '../data/dietplans.js'

const props = defineProps({
  userGoal: {
    type: String,
    default: 'Build Muscle'
  }
})

const currentPlan = computed(() => {
  if (!props.userGoal) return dietPlans[1]

  const found = dietPlans.find(
    plan => plan.goal.toLowerCase() === props.userGoal.trim().toLowerCase()
  )
  
  return found || dietPlans[1]
})

const mealSections = computed(() => [
  { 
    title: 'Breakfast', 
    items: currentPlan.value?.meals?.breakfast || [],
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=80' 
  },
  { 
    title: 'Lunch', 
    items: currentPlan.value?.meals?.lunch || [],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80' 
  },
  { 
    title: 'Dinner', 
    items: currentPlan.value?.meals?.dinner || [],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80' 
  },
  { 
    title: 'Snacks', 
    items: currentPlan.value?.meals?.snacks || [],
    image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format&fit=crop&q=80' 
  }
])
</script>

<template>
  <div class="diet-plan-container" v-if="currentPlan">
    <div class="plan-header mb-3">
      <span class="card-tag">NUTRITION PLAN</span>
      <h3 class="display-font text-white">{{ currentPlan.title }}</h3>
      <p class="sub-text">{{ currentPlan.description }}</p>
    </div>

    <div class="meals-grid">
      <div 
        v-for="meal in mealSections" 
        :key="meal.title" 
        class="flip-card"
      >
        <div class="flip-card-inner">
          
          <!-- Front Side: Image & Meal Title -->
          <div class="flip-card-front" :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${meal.image})` }">
            <h4 class="meal-front-title">{{ meal.title }}</h4>
            <span class="hover-hint">Hover to see details 🔄</span>
          </div>

          <!-- Back Side: Ingredients / Meal Items -->
          <div class="flip-card-back">
            <h5 class="meal-title">{{ meal.title }}</h5>
            <ul>
              <li v-for="(item, index) in meal.items" :key="index">{{ item }}</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-tag {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--color-accent-1);
  display: block;
  margin-bottom: 4px;
}

.sub-text {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin: 0;
}

.meals-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* 3D Flip Card Effects */
.flip-card {
  background-color: transparent;
  height: 160px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  border-radius: 12px;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

/* Front Side Styling */
.flip-card-front {
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12px;
}

.meal-front-title {
  color: #ffffff;
  font-weight: 800;
  font-size: 1.1rem;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

.hover-hint {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
}

/* Back Side Styling */
.flip-card-back {
  background: var(--color-surface-2);
  color: var(--color-text);
  transform: rotateY(180deg);
  padding: 12px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
}

.meal-title {
  font-size: 0.85rem;
  color: var(--color-accent-2);
  margin-bottom: 6px;
  font-weight: 700;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 4px;
}

ul {
  padding-left: 15px;
  margin: 0;
  font-size: 0.72rem;
  line-height: 1.4;
}

.flip-card-back::-webkit-scrollbar {
  width: 4px;
}
.flip-card-back::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 4px;
}
</style>