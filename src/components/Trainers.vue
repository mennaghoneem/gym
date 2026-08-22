<script setup>
import trainer1 from '../assets/trainer1.jpeg'
import trainer2 from '../assets/trainer2.jpeg'
import trainer3 from '../assets/trainer3.jpeg'
import trainer4 from '../assets/trainer4.jpeg'
import trainer5 from '../assets/trainer5.jpeg'
import trainer6 from '../assets/trainer6.jpeg'

import { computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const { theme } = useTheme()

const trainers = [
  {
    id: 1,
    name: 'Captain Mariam',
    gender: 'female',
    role: 'Yoga & Pilates Specialist',
    image: trainer1,
    experience: '6 Years Experience',
    bio: 'Specialized in posture correction, flexibility, and mind-body balance sessions.'
  },
  {
    id: 2,
    name: 'Captain Sara',
    gender: 'female',
    role: 'Fitness & Cardio Coach',
    image: trainer5,
    experience: '5 Years Experience',
    bio: 'Expert in high-intensity fat burning, aerobics, and full body conditioning.'
  },
  {
    id: 3,
    name: 'Captain Ahmed',
    gender: 'male',
    role: 'CrossFit & Strength Coach',
    image: trainer2,
    experience: '8 Years Experience',
    bio: 'Certified strength trainer focusing on heavy lifting and functional athletics.'
  },
  {
    id: 4,
    name: 'Captain Omar',
    gender: 'male',
    role: 'Bodybuilding Expert',
    image: trainer3,
    experience: '7 Years Experience',
    bio: 'Specialized in muscle hypertrophy, contest prep, and customized weight plans.'
  },
  {
    id: 5,
    name: 'Captain Youssef',
    gender: 'male',
    role: 'Cardio & HIIT Trainer',
    image: trainer4,
    experience: '4 Years Experience',
    bio: 'Focuses on cardiovascular endurance, stamina building, and weight loss.'
  },
  {
    id: 6,
    name: 'Captain Mahmoud',
    gender: 'male',
    role: 'Boxing & Core Conditioning',
    image: trainer6,
    experience: '6 Years Experience',
    bio: 'Pro boxing trainer helping clients master agility, core strength, and self-defense.'
  }
]

const filteredTrainers = computed(() => {
  return trainers.filter(trainer => trainer.gender === theme.value)
})
</script>

<template>
  <div class="trainers-page">
    <div class="container">
      
      <div class="text-center mb-5">
        <h1 class="page-title">Meet Our Trainers</h1>
        <p class="page-subtitle">Hover over any trainer card to view their expertise & details</p>
      </div>

      <div class="trainers-grid">
        <div v-for="trainer in filteredTrainers" :key="trainer.id" class="flip-card">
          <div class="flip-card-inner">
            
            <div class="flip-card-front">
              <img :src="trainer.image" :alt="trainer.name" class="trainer-img" />
              <div class="front-info">
                <h3>{{ trainer.name }}</h3>
              </div>
            </div>

            <div class="flip-card-back">
              <h3>{{ trainer.name }}</h3>
              <span class="role-badge">{{ trainer.role }}</span>
              <p class="experience">{{ trainer.experience }}</p>
              <p class="bio">{{ trainer.bio }}</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.trainers-page {
  padding: 50px 0;
  min-height: calc(100vh - 60px);
  background-color: var(--color-bg);
  color: var(--color-text);
}

.page-title {
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-primary-light, #0066ff);
  margin-bottom: 8px;
}

.page-subtitle {
  color: var(--color-text-muted, #9ca3af);
  font-size: 0.95rem;
}

.trainers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 280px));
  gap: 30px;
  justify-content: center;
}

.flip-card {
  background-color: transparent;
  width: 100%;
  height: 340px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
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
  border-radius: 16px;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.flip-card-front {
  background-color: var(--color-surface, #111827);
}

.trainer-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.front-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent);
}

.front-info h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.flip-card-back {
  background: var(--color-surface, #111827);
  color: var(--color-text);
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px 20px;
}

.flip-card-back h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-primary-light);
  margin-bottom: 8px;
}

.role-badge {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.08);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
}

.experience {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-primary-light);
  margin-bottom: 10px;
}

.bio {
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--color-text-muted, #9ca3af);
  margin: 0;
}
</style>