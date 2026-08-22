<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme.js'

const { theme } = useTheme()

const femaleTimeSlots = [
  { id: 'morning_1', label: '09:00 AM - 11:00 AM' },
  { id: 'morning_2', label: '11:00 AM - 01:00 PM' }
]

const maleTimeSlots = [
  { id: 'evening_1', label: '05:00 PM - 07:00 PM' },
  { id: 'evening_2', label: '07:00 PM - 09:00 PM' }
]

const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']

const femaleSchedule = {
  Saturday: {
    morning_1: { class: 'Yoga & Pilates', trainer: 'Captain Mariam' },
    morning_2: { class: 'Zumba & Aerobics', trainer: 'Captain Sara' }
  },
  Sunday: {
    morning_1: { class: 'Cardio & Fitness', trainer: 'Captain Sara' },
    morning_2: { class: 'Full Body Workout', trainer: 'Captain Mariam' }
  },
  Monday: {
    morning_1: { class: 'Fat Burn & Core', trainer: 'Captain Mariam' },
    morning_2: { class: 'Yoga Flow', trainer: 'Captain Sara' }
  },
  Tuesday: {
    morning_1: { class: 'Pilates', trainer: 'Captain Mariam' },
    morning_2: { class: 'Zumba Dance', trainer: 'Captain Sara' }
  },
  Wednesday: {
    morning_1: { class: 'Full Body Toning', trainer: 'Captain Sara' },
    morning_2: { class: 'Stretching & Core', trainer: 'Captain Mariam' }
  },
  Thursday: {
    morning_1: { class: 'Aerobics Special', trainer: 'Captain Sara' },
    morning_2: { class: 'Yoga & Meditation', trainer: 'Captain Mariam' }
  }
}

const maleSchedule = {
  Saturday: {
    evening_1: { class: 'CrossFit', trainer: 'Captain Ahmed' },
    evening_2: { class: 'Body Building', trainer: 'Captain Omar' }
  },
  Sunday: {
    evening_1: { class: 'Heavy Strength', trainer: 'Captain Youssef' },
    evening_2: { class: 'Boxing & Cardio', trainer: 'Captain Mahmoud' }
  },
  Monday: {
    evening_1: { class: 'CrossFit', trainer: 'Captain Ahmed' },
    evening_2: { class: 'Powerlifting', trainer: 'Captain Omar' }
  },
  Tuesday: {
    evening_1: { class: 'Hit & Cardio', trainer: 'Captain Youssef' },
    evening_2: { class: 'Muscle Building', trainer: 'Captain Mahmoud' }
  },
  Wednesday: {
    evening_1: { class: 'CrossFit & Conditioning', trainer: 'Captain Ahmed' },
    evening_2: { class: 'Body Building', trainer: 'Captain Omar' }
  },
  Thursday: {
    evening_1: { class: 'Boxing Training', trainer: 'Captain Mahmoud' },
    evening_2: { class: 'Heavy Strength', trainer: 'Captain Youssef' }
  }
}

const activeTimeSlots = computed(() => {
  return theme.value === 'female' ? femaleTimeSlots : maleTimeSlots
})

const activeSchedule = computed(() => {
  return theme.value === 'female' ? femaleSchedule : maleSchedule
})
</script>

<template>
  <div class="schedule-page">
    <div class="container">
      
      <div class="text-center mb-4">
        <h1 class="page-title">Weekly Schedule</h1>
        
        <p v-if="theme === 'female'" class="theme-subtitle ">
          Morning Shift (Ladies Only)
        </p>
        <p v-else class="theme-subtitle ">
          Evening Shift (Men Only)
        </p>
      </div>

      <div class="table-responsive schedule-card">
        <table class="table table-dark custom-table text-center align-middle mb-0">
          <thead>
            <tr>
              <th class="day-col">Day / Time</th>
              <th v-for="slot in activeTimeSlots" :key="slot.id" class="time-header">
                <div class="slot-time">{{ slot.label }}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="day in days" :key="day">
              <td class="day-name">{{ day }}</td>
              <td v-for="slot in activeTimeSlots" :key="slot.id" class="session-cell">
                <div class="class-name">{{ activeSchedule[day][slot.id].class }}</div>
                <div class="trainer-name">{{ activeSchedule[day][slot.id].trainer }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<style scoped>
.schedule-page {
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

.theme-subtitle {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.female-text {
  color: #ff2d75;
}

.male-text {
  color: #0066ff;
}

.schedule-card {
  background: var(--color-surface, #111827);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 850px;
  margin: 0 auto;
}

.custom-table {
  background-color: transparent !important;
  margin: 0;
}

.custom-table th {
  padding: 18px 12px;
  border-bottom: 2px solid var(--color-border);
  background: rgba(255, 255, 255, 0.03);
}

.day-col {
  width: 25%;
  font-size: 15px;
  color: var(--color-text-muted);
}

.time-header {
  width: 37.5%;
}

.slot-time {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary-light);
}

.custom-table td {
  padding: 18px 12px;
  border-color: var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.day-name {
  font-weight: 700;
  font-size: 15px;
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.01);
}

.class-name {
  font-weight: 600;
  font-size: 15px;
  color: var(--color-text);
  margin-bottom: 4px;
}

.trainer-name {
  font-size: 13px;
  color: var(--color-text-muted, #9ca3af);
}

.session-cell:hover {
  background: rgba(255, 255, 255, 0.04);
  transition: background 0.2s ease;
}
</style>