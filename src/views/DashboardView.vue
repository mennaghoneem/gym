<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardDietPlan from '../components/DashboardDietPlan.vue'
import ExerciseCard from '../components/ExerciseCard.vue'

const router = useRouter()
const user = ref(null)
const userExercises = ref([])
const loadingExercises = ref(true)

onMounted(async () => {
  const savedUser = localStorage.getItem('gym_registered_user')
  const activeSession = localStorage.getItem('gym_active_session') === 'true'

  if (!savedUser || !activeSession) {
    router.push('/register')
    return
  }

  user.value = JSON.parse(savedUser)
  await fetchUserExercises()
})

async function fetchUserExercises() {
  loadingExercises.value = true
  try {
    const res = await fetch("https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json")
    if (!res.ok) throw new Error("Failed to load exercises")

    const data = await res.json()
    const category = (user.value.exerciseCategory || 'cardio').toLowerCase()
    
    const filtered = data.filter(item => (item.category || '').toLowerCase() === category)

    userExercises.value = filtered.slice(0, 4).map(item => ({
      id: item.id,
      name: item.name,
      target: (item.primaryMuscles && item.primaryMuscles.length > 0) ? item.primaryMuscles[0] : 'General',
      category: item.category || 'Other',
      equipment: item.equipment || 'None',
      instructions: item.instructions || [],
      gifUrl: (item.images && item.images.length > 0)
        ? `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${item.images[0]}`
        : ''
    }))
  } catch (err) {
    console.error(err)
  } finally {
    loadingExercises.value = false
  }
}
</script>

<template>
  <div class="inner-page theme-dashboard" v-if="user">
    <div class="container">
      
      <!-- Top Dynamic Theme User Header Banner -->
      <header class="user-header-card">
        <div class="user-profile">
          <div class="avatar-ring">
            <span>{{ (user.name || user.fullName || 'M').charAt(0).toUpperCase() }}</span>
          </div>
          <div class="profile-info">
            <span class="status-badge">● ONLINE • LEVEL 01</span>
            <h2 class="display-font">{{ user.name || user.fullName }}</h2>
            <p class="goal-text">PRIMARY MISSION: <span class="highlight-goal">{{ user.goal || 'Fitness & Health' }}</span></p>
          </div>
        </div>

        <!-- Dynamic Colorful Stats Rings -->
        <div class="stats-rings-group">
          <div class="ring-item stat-age">
            <div class="stat-circle">
              <span class="val">{{ user.age || '22' }}</span>
            </div>
            <span class="lbl">AGE</span>
          </div>

          <div class="ring-item stat-weight">
            <div class="stat-circle">
              <span class="val">{{ user.weight || '65' }}</span>
            </div>
            <span class="lbl">KG</span>
          </div>

          <div class="ring-item stat-height">
            <div class="stat-circle">
              <span class="val">{{ user.height || '165' }}</span>
            </div>
            <span class="lbl">CM</span>
          </div>
        </div>
      </header>

      <!-- Main Panels Section -->
      <div class="dash-split-grid">
        
        <!-- Diet Plan Interactive Card -->
        <section class="dash-card diet-card">
          <DashboardDietPlan :userGoal="user.goal" />
        </section>

        <!-- Exercises Workout Module Card -->
        <section class="dash-card exercises-card">
          <div class="card-header">
            <div>
              <span class="card-tag">WORKOUT MODULE</span>
              <h3 class="display-font">RECOMMENDED EXERCISES</h3>
              <p class="sub-text">CATEGORY: <span class="accent-cat">{{ user.exerciseCategory || 'CARDIO' }}</span></p>
            </div>
            <router-link to="/exercises" class="theme-btn">
              EXPLORE ALL
            </router-link>
          </div>

          <div v-if="loadingExercises" class="loading-box">
            <div class="theme-spinner"></div>
            <span>Loading workout plan...</span>
          </div>

          <!-- 4 Exercises Grid (2 Columns x 2 Rows) -->
          <div v-else-if="userExercises.length" class="exercises-4grid">
            <ExerciseCard
              v-for="item in userExercises"
              :key="item.id || item.name"
              :exercise="item"
              class="themed-exercise-card"
            />
          </div>

          <div v-else class="empty-box">
            No exercises loaded yet.
          </div>
        </section>

      </div>

    </div>
  </div>
</template>

<style scoped>
.theme-dashboard {
  padding: 35px 0;
  min-height: 100vh;
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color 0.4s ease, color 0.4s ease;
}

.dash-split-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: stretch;
  margin-top: 24px;
}

/* Header Styling */
.user-header-card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  flex-wrap: wrap;
  gap: 20px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 18px;
}

.avatar-ring {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: var(--color-surface-2);
  border: 2px solid var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 800;
  color: #ffffff;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.08);
}

.status-badge {
  font-size: 0.65rem;
  color: #38ef7d;
  letter-spacing: 1.5px;
  font-weight: 800;
  display: block;
  margin-bottom: 2px;
}

.profile-info h2 {
  font-size: 1.5rem;
  margin: 0 0 4px 0;
  font-weight: 800;
  color: var(--color-text);
}

.goal-text {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin: 0;
  font-weight: 600;
}

.highlight-goal {
  color: var(--color-accent-2);
  font-weight: 700;
}

/* Dynamic Multi-Color Stats Rings */
.stats-rings-group {
  display: flex;
  gap: 20px;
}

.ring-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.stat-circle {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-2);
  font-weight: 800;
  font-size: 0.95rem;
  transition: transform 0.25s ease;
}

.stat-circle:hover {
  transform: translateY(-3px);
}

.stat-age .stat-circle {
  border: 2px solid var(--color-accent-1);
  color: var(--color-accent-1);
  box-shadow: 0 0 12px rgba(0, 229, 255, 0.2);
}

.stat-weight .stat-circle {
  border: 2px solid var(--color-accent-2);
  color: var(--color-accent-2);
  box-shadow: 0 0 12px rgba(255, 190, 11, 0.2);
}

.stat-height .stat-circle {
  border: 2px solid var(--color-accent-3);
  color: var(--color-accent-3);
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.2);
}

.lbl {
  font-size: 0.62rem;
  color: var(--color-text-muted);
  font-weight: 700;
  letter-spacing: 1px;
}

/* Dynamic Panels Setup */
.dash-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.card-tag {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: var(--color-accent-1);
  display: block;
  margin-bottom: 4px;
}

.card-header h3 {
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0 0 2px 0;
  color: var(--color-text);
}

.sub-text {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin: 0;
}

.accent-cat {
  color: var(--color-accent-2);
  font-weight: 700;
}

.theme-btn {
  padding: 7px 16px;
  background: transparent;
  border: 1px solid var(--color-accent-1);
  color: var(--color-accent-1);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.25s ease;
}

.theme-btn:hover {
  background: var(--color-accent-1);
  color: #000000;
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.4);
}

.exercises-4grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

:deep(.themed-exercise-card) {
  position: relative !important;
  border-radius: 12px !important;
  overflow: hidden !important;
  height: 160px !important; 
  border: 1px solid var(--color-border) !important;
  background: var(--color-surface-2) !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-end !important; 
  padding: 10px !important;
  transition: transform 0.25s ease, border-color 0.25s ease !important;
}

:deep(.themed-exercise-card:hover) {
  transform: translateY(-3px) !important;
  border-color: var(--color-accent-1) !important;
}

:deep(.themed-exercise-card img) {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  z-index: 1 !important;
  filter: brightness(0.65); 
  transition: filter 0.3s ease !important;
}

:deep(.themed-exercise-card:hover img) {
  filter: brightness(0.8); 
}

:deep(.themed-exercise-card > *:not(img)) {
  position: relative !important;
  z-index: 2 !important;
}

:deep(.themed-exercise-card h3),
:deep(.themed-exercise-card h4),
:deep(.themed-exercise-card .exercise-title) {
  font-size: 0.85rem !important;
  font-weight: 800 !important;
  color: #ffffff !important;
  margin: 2px 0 !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9) !important;
}

:deep(.themed-exercise-card span),
:deep(.themed-exercise-card .badge) {
  font-size: 0.65rem !important;
  font-weight: 700 !important;
  display: inline-block !important;
  width: fit-content !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8) !important;
}

.loading-box, .empty-box {
  text-align: center;
  padding: 30px;
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.theme-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 10px auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 1100px) {
  .dash-split-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .exercises-4grid {
    grid-template-columns: 1fr;
  }
}
</style>